var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: false,
      maxLength: 100,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, "email is invalid"],
      index: true
    },
    firstName: {
      type: String,
      unique: false,
      maxLength: 100,
      required: [true, "can't be blank"]
    },
    lastName: {
      type: String,
      unique: false,
      maxLength: 100,
      required: [true, "can't be blank"]
    },
  }
);

mongoose.model("User", UserSchema);
