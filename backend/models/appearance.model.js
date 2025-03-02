import mongoose from "mongoose";

const appearanceSchema = mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  background: {
    type:String,
    default: "#342B26"
  },

  layout: {
    type:String,
    default: "stack"
  },

  button: {
    type: { type:String, default: "Fill3"},
    shadowType: {type:String, default: "none"},
    buttonColor: {type:String, default: "#C9C9C9"},
    fontColor: {type:String, default: "#000000"}
  },

  font: {
    name: {type:String, default: "Inter"},
    textColor: {type:String, default: "#FFFFFF"}
  },

  theme: {type:String, default: "#FFFFFF"}


  
});

export const Appearance = mongoose.model("Appearance", appearanceSchema);
