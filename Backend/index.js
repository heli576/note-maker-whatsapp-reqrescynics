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
// const user = require("./users");

//import ROUTES
const authRoutes=require("./routes/auth");


//---------- CONNECT TO MONGO DB ---------
var mongourl = process.env.MONGO_URL;
async function connectToDB() {
  try {
    await mongoose.connect(mongourl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
}
connectToDB();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware --all routes will begin with /api
app.use("/api",authRoutes);

//---------- ROUTES FOR FRONTEND ----------




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
  let tempUser = await user.findOne({ username: sender });
  if (tempUser) {
    if (tempUser.password == "unset") {
      await user.deleteOne({ username: sender });
      let newUser = new user({
        username: sender,
        password: msg.Body //TO-DO: hash of this password before its saved.
      });
      try {
        await newUser.save();
        await sendMessage(`Password saved.\nUsername: ${removePrefix(sender)}\nPassword: ${msg.Body}\n\nYou can start sending notes now.`, sender)
      } catch (err) {
        console.log(err);
      }
    }
    else {
      try {
        await sendMessage(`Note saved:\n${msg.Body}`, sender);
        await saveNote(msg.Body, sender);
      } catch (err) {
        console.log(err);
      }
    }
  } else //user's account does not exist, and its his first message
  {
    let newUser = new user({
      username: sender,
      password: "unset" //No need to hash this
    });
    try {
      await newUser.save();
      await sendMessage(`Hey there! Just send a password to complete the signup.`, sender)
    } catch (err) {
      console.log(err);
    }
  }
}


//---------- UTILITY FUNCTIONS ----------

async function sendMessage(messageText, reciever)//Sends messageText as WhatsApp message to reciever
{
  try {
    client.messages
      .create({
        from: 'whatsapp:+14155238886',
        body: messageText,
        statusCallback: "https://held-fuzzy-save.glitch.me/waapi2",
        to: reciever
      })
      .then(message => console.log(message.sid));
  } catch (err) {
    console.log(err);
  }
}

function removePrefix(str)//Removes "whatsapp:+" prefix from the given string
{
  let newstr = ''
  for (let i = 10; str[i] != null; i++) {
    newstr += str[i];
  }
  return newstr
}

async function saveNote(note, username)
{
  //Save note to mongoDB..
}


//---------- MISC ----------

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend Server is listening on port " + (process.env.PORT || 5000));
});

//USE MONGOURL FROM .ENV
//ADD PAGE_ACCESS_TOKEN
//DECIDE ABT NGROK
