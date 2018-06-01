const env = require("dotenv").config();
const nodemailer = require('nodemailer');
const CronJob = require('cron').CronJob;

// TODO Initialize Mongoose.
const url = process.env.DB_URL;
const assert = require('assert');
const mongoose = require('mongoose');
require("./models");
mongoose.connect(url)

const User = require("mongoose").model("User");
const Todo = require("mongoose").model("Todo");


var transporter = nodemailer.createTransport({
  debug: true,
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASS
  }
});

var job = new CronJob({
  cronTime: '00 00 10 * * 1-7',
  onTick : sendMail,
  start: false,
  timeZone: "America/New_York"
});

job.start();

function sendMail(){
  User.find({}, (err, res) =>
    {

      res.forEach((user)=> {

        Todo.find({userId: user.guid},(err, todos) =>
        {

          //console.log(todos);
          var week = Date.now()- 604800000;
          var unCompleted =[];
          var numCompleted = 0;
          for(i = 0; i < todos.length; i++ ){
            if(todos[i].completedOn != null && todos[i].completedOn > week){
              numCompleted++;
            }
            else if(todos[i].completedOn == null){
              unCompleted.push(todos[i]);
            }
          }

        //console.log(res);
        var email = "Hello, "+ user.firstName +", \n\
        This week you have completed "+ numCompleted +" task(s). \
        Great job! You still have "+ unCompleted.length +" task(s) to go. They are: \n";

        for(j = 0; j < unCompleted.length; j++){
          str = j+1+". "+ unCompleted[j].description +" \n";
          email += str;
        }

        email += "Get to work!"
        var mailOptions = {
          from: process.env.MY_EMAIL,
          to: user.email,
          subject: 'Your todos for the week',
          text: email
        }

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });



      });

    });


      //todo find uncompeles

    //user len
    });

}
