import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,

  },
  lastName: {
    type: String,
   
   
  },

  username: {
    type: String,
    
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  bio : {
    type: String,
    default: ""
  },

  image: {
    type: String,
    default: "/uploads/pfp.svg"
   
  }



})

export const User = mongoose.model("User", userSchema);