import express from "express";
import { getRequestAuth } from "../../helper/global";
import mongoose from "mongoose";

const userRouter = express.Router();
const Ad = require("../../db/models/Ad");
const Events = require("../../db/models/Events");

// Middleware to extract device information from request headers
const extractDeviceInfo = (req: any, res: any, next: any) => {
  const userAgent = req.headers["user-agent"];
  // Parse userAgent to extract device information (e.g., OS, browser)
  req.deviceInfo = parseDeviceInfo(userAgent);
  next();
};
const parseDeviceInfo = (userAgent: any) => {
  const deviceInfo = {
    os: "",
    browser: "",
    browserVersion: "",
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isBot: false,
    // Add other device information as needed
  };

  // Detect if the user agent belongs to a bot
  const bots = [
    "Googlebot",
    "Bingbot",
    "Yandexbot",
    // Add other bot user agents as needed
  ];
  deviceInfo.isBot = bots.some((bot) => userAgent.includes(bot));

  // Detect if the user agent belongs to a mobile device
  const mobileKeywords = [
    "Mobile",
    "Android",
    "iPhone",
    "iPad",
    "Windows Phone",
  ];
  deviceInfo.isMobile = mobileKeywords.some((keyword) =>
    userAgent.includes(keyword)
  );

  // Detect if the user agent belongs to a tablet
  const tabletKeywords = ["iPad", "Tablet", "Android"];
  deviceInfo.isTablet = tabletKeywords.some((keyword) =>
    userAgent.includes(keyword)
  );

  // Detect if the user agent belongs to a desktop device
  deviceInfo.isDesktop =
    !deviceInfo.isMobile && !deviceInfo.isTablet && !deviceInfo.isBot;

  // Detect operating system
  if (userAgent.match(/Windows/i)) {
    deviceInfo.os = "Windows";
  } else if (userAgent.match(/Android/i)) {
    deviceInfo.os = "Android";
  } else if (userAgent.match(/iPad|iPhone|iPod/i)) {
    deviceInfo.os = "iOS";
  } else if (userAgent.match(/Mac/i)) {
    deviceInfo.os = "Mac OS";
  } else if (userAgent.match(/Linux/i)) {
    deviceInfo.os = "Linux";
  } else if (userAgent.match(/Bot/i)) {
    deviceInfo.os = "Bot";
  } else {
    deviceInfo.os = "Unknown";
  }

  // Detect browser and version
  if (userAgent.match(/Chrome/i)) {
    deviceInfo.browser = "Chrome";
    deviceInfo.browserVersion = userAgent.match(/Chrome\/(\S+)/)[1];
  } else if (userAgent.match(/Firefox/i)) {
    deviceInfo.browser = "Firefox";
    deviceInfo.browserVersion = userAgent.match(/Firefox\/(\S+)/)[1];
  } else if (userAgent.match(/Safari/i)) {
    deviceInfo.browser = "Safari";
    deviceInfo.browserVersion = userAgent.match(/Version\/(\S+)/)[1];
  } else if (userAgent.match(/MSIE/i) || userAgent.match(/Trident/i)) {
    deviceInfo.browser = "Internet Explorer";
    deviceInfo.browserVersion = userAgent.match(/(?:MSIE |rv:)(\S+)/)[1];
  } else {
    deviceInfo.browser = "Unknown";
    deviceInfo.browserVersion = "Unknown";
  }

  return deviceInfo;
};

userRouter.post("/events", extractDeviceInfo, async (req: any, res: any) => {
  try {
    const auth = getRequestAuth(req);
    const { videoId, eventName, playedDuration, videoDuration, userLocation } =
      req.body;

    // Get ad details to check ad_count_per_day
    const ad = await Ad.findById(videoId);
    if (!ad) {
      return res.status(404).json({ success: false, error: "Ad not found" });
    }
    const adCountPerDay = ad.ad_count_per_day;
    // Get the current date and start of the day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    // Count the number of events for the given ad on the current day
    const eventCount = await Events.countDocuments({
      adId: videoId,
      eventType: "ended",
      userId: auth.userId,
      createdAt: { $gte: startOfDay },
    });

    if (adCountPerDay > 0 && eventCount >= adCountPerDay) {
      return res
        .status(403)
        .json({ success: false, error: "Ad count per day limit exceeded" });
    }

    const videoEvent = new Events({
      adId: videoId,
      userId: auth.userId,
      eventType: eventName,
      videoInfo: {
        duration: videoDuration,
        playedDuration,
      },
      userLocation,
      deviceInfo: extractDeviceInfo,
    });

    await videoEvent.save();
    res.status(200).json({ success: true, count: eventCount });
  } catch (error) {
    console.error("Error logging video event:", error);
    res
      .status(500)
      .json({ success: false, error: "Error logging video event" });
  }
});

userRouter.get("/event/info", extractDeviceInfo, async (req, res) => {
  try {
    const auth = getRequestAuth(req);
    // Get the start and end of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const userEvents = await Events.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(auth.userId),
          eventType: "ended",
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: {
          _id: {
            adId: "$adId",
            userId: "$userId",
          },
          count: { $sum: 1 },
          event: { $first: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: "$event._id",
          adId: "$_id.adId",
          eventType: "$event.eventType",
          createdAt: "$event.createdAt",
          duration: "$event.videoInfo.duration",
          count: 1,
        },
      },
    ]);

    if (!userEvents.length) {
      return res.status(404).json({ success: false, error: "No events found" });
    }

    const totalScreenTime = userEvents.reduce((acc: any, event: any) => acc + event.duration * event.count,0);
    res.status(200).json({
        success: true,
        events: userEvents,
        screen: { screenTime: totalScreenTime, unit: 'seconds' },
      });
  } catch (error) {
    console.error("Error retrieving user events:", error);
    res
      .status(500)
      .json({ success: false, error: "Error retrieving user events" });
  }
});

userRouter.get("/ads", async (req: any, res: any) => {
  const {
    pageSize = "10",
    page = "1",
    search,
    country,
    state,
    city,
    pincode,
    tags = "",
  } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(pageSize);

  try {
    let matchQuery: any = [];

    if (country) {
      matchQuery.push({ "country.value": country });
    }
    if (state) {
      matchQuery.push({ "state.value": state });
    }
    if (city) {
      matchQuery.push({ "city.value": city });
    }
    if (pincode) {
      matchQuery.push({ pincode: pincode });
    }
    matchQuery.push({ tags: { $regex: tags, $options: "i" } });

    const ads = await Ad.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: parseInt(pageSize) },
      { $match: { $or: matchQuery } },
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
          video: {
            $concat: [req.protocol + "://" + req.get("host"), "/", "$video"],
          },
        },
      },
    ]);

    if (ads.length === 0) {
      return res.status(200).json({
        status: true,
        message: "No ads found",
        data: [],
        hasNextPage: false,
      });
    }

    const hasNextPage = ads.length === parseInt(pageSize);

    return res.json({
      status: true,
      message: "Ads fetched successfully",
      data: ads,
      hasNextPage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Failed to fetch ads",
    });
  }
});

module.exports = userRouter;
