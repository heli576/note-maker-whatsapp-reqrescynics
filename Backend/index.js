//external-packages
require('dotenv').config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const mongoose = require("mongoose");
const morgan=require("morgan");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const expressValidator=require("express-validator");
const cors=require("cors");

////twilio_credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const user = require(".models/users");
const note = require("./models/notes");
const psid = require("./models/psids");
//import ROUTES
const authRoutes=require("./routes/auth");


//---------- CONNECT TO MONGO DB ---------
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology: true 
}).then(()=>console.log("DB connected"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware --all routes will begin with /api
app.use("/api",authRoutes);


//---------- ROUTES FOR TWILIO ----------
//Switch to req res

app.post("/wa-api", (request, response) => {
  respond(request.body, request.body.From);
});

app.post("/wa-api/status", (request, response) => {
  console.log("Message sent");
});

async function respond(msg, sender) //Takes in the message and decides what to do with it.
{
  console.log(msg)
  let tempUser = await user.findOne({ username: sender });
  if (tempUser) {
    if (tempUser.password == "unset") {
      await user.deleteOne({ username: sender });
      let newUser = new user({
        username: sender,
        isPasswordSet: true,
        password: msg.Body, //TO-DO: hash of this password before its saved.
      });
      try {
        await newUser.save();
        await sendMessage(`Password saved.\nUsername: ${removePrefix(sender)}\nPassword: ${msg.Body}\n\nYou can start sending notes now.`, sender)
      } catch (err) {
        console.log(err);
      }
    }
    else {
      if(msg.Body.slice(0,5) === 'link:')//link psid to the username
        {
          let newPsid = new psid({
            username: removePrefix(sender),
            psid: msg.Body.slice(5)
          })
          
          try {
        await sendMessage(`Your messenger account was linked successfully.`, sender);
        await newPsid.save();
      } catch (err) {
        console.log(err)
      }
        }
      else//Save the note
        {
          try {
        await sendMessage(`Note saved:\n${msg.Body}`, sender);
        await saveNote(msg.Body, sender);
      } catch (err) {
        console.log(err)
      }
        }
    
    }
  } else //user's account does not exist, and its his first message
  {
    let newUser = new user({
      username: sender,
      isPasswordSet: false,
      password: "unset", //No need to hash this
    });
    try {
      await newUser.save();
      await sendMessage(`Hey there! Just send a password to complete the signup.`, sender)
    } catch (err) {
      console.log(err);
    }
  }
}

//---------- ROUTES FOR MESSENGER ----------

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
app.post("/mg-api/webhook", (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === "page") {
        body.entry.forEach(function (entry) {
            let webhook_event = entry.messaging[0];
            let sender_psid = webhook_event.sender.id;
            // console.log("Sender ID: " + sender_psid);

            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });
        res.status(200).send("EVENT_RECEIVED");
    } else {
        res.sendStatus(404);
    }
});

// Accepts GET requests at the /webhook endpoint
app.get("/mg-api/webhook", (req, res) => {
    /** UPDATE YOUR VERIFY TOKEN **/
    const VERIFY_TOKEN = process.env.PAGE_ACCESS_TOKEN;
    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

async function handleMessage(sender_psid, received_message) {
    let response;

    // Checks if the message contains text
    if (received_message.text) {
        console.log(`Recieved text: "${received_message.text}" from ${sender_psid}`);
   
        let replyText = '';
        if (received_message.text.toLowerCase()) replyText = await frameMessengerReply(sender_psid, received_message.text);
        response = {
            text: replyText
        };
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        console.log(attachment_url + ' received from ' + sender_psid);
        response = {
            text: 'you sent some attachments ... '
        };
    }

    // Send the response message
    callSendAPI(sender_psid, response);
}

function handlePostback(sender_psid, received_postback) {
    let response;
    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === "yes") {
        response = { text: "Thanks!" };
    } else if (payload === "no") {
        response = { text: "Oops, try sending another image." };
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        recipient: {
            id: sender_psid
        },
        message: response
    };

    // Send the HTTP request to the Messenger Platform
    request(
        {
            uri: "https://graph.facebook.com/v2.6/me/messages",
            qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
            method: "POST",
            json: request_body
        },
        (err, res, body) => {
            if (!err) {
                console.log("message sent!");
            } else {
                console.error("Unable to send message:" + err);
            }
        }
    );
}

//---------- UTILITY FUNCTIONS ----------

async function sendMessage(messageText, reciever)//Sends messageText as WhatsApp message to reciever
{
  try {
    client.messages
      .create({
        from: 'whatsapp:+14155238886',
        body: messageText,
        statusCallback: "https://held-fuzzy-save.glitch.me/wa-api/status",
        to: reciever
      });
  } catch (err) {
    console.log(err);
  }
}

function removePrefix(str)//Removes "whatsapp:+" prefix from the given string
{
  let newstr = ''
  for (let i = 10; str[i] != null; i++) {
    newstr += str[i]
  }
  return newstr;
}

async function saveNote(noteText, username) //Saves the note the MongoDB
{
  let newNote = new note({
    noteText: noteText,
    username: removePrefix(username),
    createdAt: getdatestring()
  })
  
  try{
    await newNote.save();
  } catch(err){ console.log(err)}
}

function getdatestring() 
{
  var dt = new Date();

  return (`${
    (dt.getMonth()+1).toString().padStart(2, '0')}/${
    dt.getDate().toString().padStart(2, '0')}/${
    dt.getFullYear().toString().padStart(4, '0')} ${
    dt.getHours().toString().padStart(2, '0') }:${
    dt.getMinutes().toString().padStart(2, '0')}:${
    dt.getSeconds().toString().padStart(2, '0')}`
);
}

async function frameMessengerReply(user_psid, msgText)//Handles messages recieved on Messenger
{
  let tempUser = await psid.findOne({psid: user_psid});
  if(tempUser)
    {
      await saveNote(msgText, 'whatsapp:+' + tempUser.username);
      return 'Note saved.'
    }
  else
    {
      return `Go to https://wa.me/%2B14155238886?text=link:${user_psid}`;
    }
}


//---------- MISC ----------
app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is listening on port " + (process.env.PORT || 5000));
});
