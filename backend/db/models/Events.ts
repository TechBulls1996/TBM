import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    adId: {  
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad",
      required: true, 
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventType: { type: String, required: true },
    videoInfo: { type: Object, required: true },
    deviceInfo: { type: Object },
    userLocation: { type: Object},
  },
  { 
    timestamps: true 
  }
);

module.exports = mongoose.model("Events", eventSchema);
