const express = require("express");
const morgan = require("morgan");
const env = require("dotenv").config();
require("./models");


// Initialize express
const app = express();
// Setup console logging
app.use(morgan("tiny"));

// TODO Initialize Mongoose.
const url = process.env.DB_URL;
const assert = require('assert');
const mongoose = require('mongoose');
mongoose.connect(url)

app.use(require("./routes"));
// TODO Define a schema for Todo.



// Listen to port 8080
app.listen(process.env.DB_PORT);
