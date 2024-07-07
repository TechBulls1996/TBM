import { FailedMsg, SuccessMsg } from "../../helper/messages";
import { calculatePercentageIncrease, formatNumber } from "../../helper/global";

const express = require('express');
const router = express.Router();
const User = require('../../db/models/User'); 
const Client = require('../../db/models/Client'); 
const Ad = require('../../db/models/Ad');


// Route to get counts of users, clients, and ads
router.get('/counts', async (req: any, res: any) => {
  try {
    const userCount = await User.countDocuments();
    const clientCount = await Client.countDocuments();
    const adCount = await Ad.countDocuments();

     // Date 30 days ago
     const thirtyDaysAgo = new Date();
     thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
 
     // Counts from the last 30 days
     const userCountLast30Days = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
     const clientCountLast30Days = await Client.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
     const adCountLast30Days = await Ad.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
 
    // Total counts 30 days ago
    const userCount30DaysAgo = userCount - userCountLast30Days;
    const clientCount30DaysAgo = clientCount - clientCountLast30Days;
    const adCount30DaysAgo = adCount - adCountLast30Days;

    // Calculate percentage increases
    const userPercentageIncrease = calculatePercentageIncrease(userCount, userCount30DaysAgo);
    const clientPercentageIncrease = calculatePercentageIncrease(clientCount, clientCount30DaysAgo);
    const adPercentageIncrease = calculatePercentageIncrease(adCount, adCount30DaysAgo);

    
    return res.status(200).json({
        status: true,
        message: SuccessMsg,
        data: {
          users: formatNumber(userCount),
          clients: formatNumber(clientCount),
          ads: formatNumber(adCount),
          last30Days: {
            users: userPercentageIncrease,
            clients: clientPercentageIncrease,
            ads: adPercentageIncrease,
          },
        }
    });
   
  } catch (err) {
    console.error('Error fetching counts:', err);
    return res.status(500).json({
        status: false,
        message: FailedMsg,
   });
  }
});

module.exports = router;
