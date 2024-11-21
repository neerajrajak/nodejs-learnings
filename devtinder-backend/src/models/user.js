const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 20,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Invalid Email Address');
        }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error('Password is not strong.');
        }
    }
  },
  age: {
    type: Number,
    min: 18,
    max: 60,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Please enter valid gender.");
      }
    },
  },
  photoUrl: {
    type: String,
    default:
      "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg",
      validate(value){
        if(!validator.isURL(value)){
            throw new Error('Invalid Photo URL');
        }
    }
  },
  about: {
    type: String,
    default: "Description yet to be entered",
  },
  skills: {
    type: [String],
  },
},{timestamps: true});

userSchema.methods.getJWT = async function(){
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "mysecretkey", {
    expiresIn: "1d",
  });

  return token;
}

userSchema.methods.validatePassword = async function(password){
  const user = this;
  return await bcrypt.compare(password, user.password);
}

module.exports = mongoose.model("User", userSchema);
