const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

require("./models");

const url = 'mongodb://localhost/todoApp';

const app = express();

app.use(morgan("tiny"));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(url);

app.use(require("./routes"));

// Listen to port 8080
app.listen("8080");
