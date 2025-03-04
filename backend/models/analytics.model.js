import mongoose from "mongoose";

const analyticsSchema = mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  // Device click tracking
  devices: {
    linux: { type: Number, default: 0 },
    mac: { type: Number, default: 0 },
    ios: { type: Number, default: 0 },
    windows: { type: Number, default: 0 },
    android: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  },

  // Click tracking
  profileClicks: [
    {
      date: {type:String},
      clicks: {type: Number, default:0}
    }  
  ],
  shopClicks: [
    {
      date: {type:String},
      clicks: {type: Number, default:0}
    }  
  ],
  cta: [
    {
      date: {type:String},
      clicks: {type: Number, default:0}
    }  
  ],

  totalClicks: [
    {
      date: {type:String},
      clicks: {type: Number, default:0}
    }  
  ],

  // Sites click tracking
  sites: {
    youtube: { type: Number, default: 0 },
    facebook: { type: Number, default: 0 },
    instagram: { type: Number, default: 0 },
    other: { type: Number, default: 0 }
  }
});

export const Analytics = mongoose.model("Analytics", analyticsSchema);
