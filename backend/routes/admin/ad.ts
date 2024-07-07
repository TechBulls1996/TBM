const express = require('express');
const Ad = require('../../db/models/Ad');
const router = express.Router();
const multer = require('multer');
const path = require('path');

import { ApiFailedResponse } from "../../helper/global";
import { FailedMsg, SuccessMsg } from "../../helper/messages";
import { adValidate } from "../../helper/validations/adValidation";


// Middleware for handling file uploads using multer
const storage = multer.diskStorage({
    destination: function (req: any, file:any, cb:any) {
      cb(null, 'uploads/'); // Specify the destination directory for uploaded files
    },
    filename: function (req:any, file:any, cb:any) {
      // Generate a unique filename for the uploaded file, including the original file extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
  });
const upload = multer({ storage: storage });

// Create an ad
router.post("/create", upload.single('video'), adValidate, async (req: any, res: any) => {
  const {
    title,
    client,
    count,
    country,
    state,
    city,
    pincode,
    tags,
  } = req.body;

  // Check if video file was uploaded
  if (!req.file) {
    return res.status(400).json(ApiFailedResponse("Video file is required"));
  }
  const video = req.file.path;
  console.log(country);
  try {
    const ad = await Ad.create({
      title,
      client_id:client,
      ad_count_per_day:count,
      country,
      state,
      city,
      pincode,
      tags,
      video,
      video_data: req.file
    });

    if(ad){
      return res.status(200).json({
            status: true,
            message: SuccessMsg,
        });
    }
  } 
  catch (err) {
    console.log("Ad Creation Error:", err);
    return res.status(500).json({
         status: false,
         message: FailedMsg,
    });
  }
});

// Update an ad
router.post("/update/:id",  upload.single('video'), adValidate, async (req : any, res: any) => {
  const adId = req.params.id;
  const {
    title,
    client,
    count,
    pincode,
    tags,
  } = req.body;

  const video = req.file ? req.file.path : undefined;
  const country = JSON.parse(req.body.country);
  const state = JSON.parse(req.body.state);
  const city = JSON.parse(req.body.city);

  try {
    const ad = await Ad.findByIdAndUpdate(
      adId,
      {
        title,
        client_id: client,
        ad_count_per_day: count,
        country,
        state,
        city,
        pincode,
        tags,
        video,
        video_data: req.file || undefined
      },
      { new: true }
    );

    if (ad) {
        return res.status(200).json({
            status: true,
            message: SuccessMsg,
        });
    } else {
        return res.status(500).json({
            status: true,
            message: FailedMsg,
        });
    }
  } catch (err) {
    console.log("Ad Update Error:", err);
    return res.status(500).json({
        status: false,
        message: FailedMsg,
   });
  }
});

// Delete an ad
router.post("/delete/:id", async (req : any, res :any) => {
  const adId = req.params.id;

  try {
    const deletedAd = await Ad.findByIdAndDelete(adId);
    if (deletedAd) {
      return res.json({ status: true });
    } else {
      return res.json({ status: false, error: "Ad not found" });
    }
  } catch (err) {
    console.log("Ad Deletion Error:", err);
    return res.json({ status: false, error: err });
  }
});


router.get("/", async (req : any, res : any) => {
  const { pageSize = '10', page = '1', search } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(pageSize);

  try {
    let matchQuery = {};
    if (search) {
      matchQuery = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { tags: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const ads = await Ad.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(pageSize) },
      { $match: matchQuery },
      {
        $lookup: {
          from: 'clients',
          localField: 'client_id',
          foreignField: '_id',
          as: 'client'
        }
      },
      { $unwind: "$client" },
      {
        $project: {
          _id: 1,
          title: 1,
          ad_count_per_day: 1,
          country: 1,
          state: 1,
          city: 1,
          pincode: 1,
          tags: 1,
          video: 1,
          client: {
            _id: 1,
            name: 1,
            email: 1,
            mobile: 1,
            address: 1,
            city: 1,
            state: 1,
            pinCode: 1
          }
        }
      }
    ]);

    if (ads.length === 0) {
      return res.status(200).json({
        status: true,
        message: "No ads found",
        data: [],
        hasNextPage: false
      });
    }

    const hasNextPage = ads.length === parseInt(pageSize);

    return res.json({
      status: true,
      message: "Ads fetched successfully",
      data: ads,
      hasNextPage
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch ads",
    });
  }
});

module.exports = router;
