var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: false,
      maxLength: 100,
      match: [/\S+@\S+\.\S+/, "email is invalid"]
    },
    firstName: {
      type: String,
      unique: false,
      maxLength: 100
    },
    lastName: {
      type: String,
      unique: false,
      maxLength: 100
    },
	userName:{
		type: String,
		unique:true,
		maxLength: 100
	},
	password:{
		type: String,
		unique:false,
		maxLength: 100
	},

  guid:{
		type: String,
		unique:true
	}

  }
);

mongoose.model("User", UserSchema);
