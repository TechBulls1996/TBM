import mongoose from "mongoose";

var clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientSchema);
