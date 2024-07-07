import mongoose from "mongoose";

const adSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    ad_count_per_day: { type: Number, required: true },
    country: { type: Object, required: true },
    state: { type: Object, required: true },
    city: { type: Object, required: true },
    pincode: { type: String, required: true },
    tags: { type: String, required: true },
    video: { type: String, required: true },
    video_data: { type: Object, required: true },
  },
  { 
    timestamps: true 
  }
);

const Ad = mongoose.model("Ad", adSchema);

module.exports = Ad;
