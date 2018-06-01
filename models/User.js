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
    },
    firstName: {
      type: String,
      unique: false,
      maxLength: 100,
    },
    lastName: {
      type: String,
      unique: false,
      maxLength: 100,
    },
	userName:{
		type: String,
		unique:true,
		maxLength: 100,
		required: [true, "can't be blank"]
	},
	password:{
		type: String,
		unique:false,
		maxLength: 100,
		required: [true, "can't be blank"]
	},

  guid:{
		type: String,
		unique:true,
		required: [true, "can't be blank"]
	}

  }
);

mongoose.model("User", UserSchema);
