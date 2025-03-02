import mongoose from "mongoose";

const linkSchema = mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },

  profileLinks: [
    {
      linkId: {type: Number},
      linkTitle: { type: String, required: true },
      linkUrl: { type: String, required: true },
      icon: { type: String, required: true },
      clicks: {type: Number, default:0}
    }
  ],

  shopLinks: [
    {
      shopId: {type: Number},
      shopTitle: { type: String, required: true },
      shopUrl: { type: String, required: true },
      clicks: {type: Number, default: 0}
      
    }
  ]
});

export const Link = mongoose.model("Link", linkSchema);
