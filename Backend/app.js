require('dotenv').config();
const express = require("express");
const app = express();
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require("twilio")(accountSid, authToken);
const mongoose = require("mongoose");
// const user = require("./users");

//---------- CONNECTING TO MONGO DB ---------
// var mongourl = process.env.MONGO_URL;
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
// connectToDB();
console.log('hi')
