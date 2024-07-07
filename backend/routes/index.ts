import express from "express";
const path = require('path');
const router = express.Router();
const { getDate } = require("../helper/global");

const authRoutes = require("./auth");
const userRouter = require("./user");
const requestRoutes = require("./request");

//admin -> user -> routes
const adminRouter = require('./admin/index');
const adminUserRouter = require('./admin/users');
const adminClientRouter = require('./admin/clients');
const adminAdRouter = require('./admin/ad');

const { authMiddelware, adminAuthMiddelware } = require("../middleware/auth");
// middleware that is specific to this router
router.use((req: any, res: any, next: () => void) => {
  const date = new Date();
  console.log("[server]:", req.originalUrl, " ", getDate());
  next();
});

// define the home page route
router.get("/", (req: any, res: any) => {
  res.json("True Digital Broadcast Api index page.");
});

// Serve static files from the "uploads" directory
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Route to serve video files
router.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../../uploads', filename);
  res.sendFile(filePath);
});

//auth routes
router.use("/auth", authRoutes);
router.use("/request", authMiddelware, requestRoutes);
router.use("/user", authMiddelware, userRouter);

//admin routes
router.use("/admin", adminAuthMiddelware, adminRouter);
router.use("/admin/user", adminAuthMiddelware, adminUserRouter);
router.use("/admin/client", adminAuthMiddelware, adminClientRouter); 
router.use("/admin/ad", adminAuthMiddelware, adminAdRouter); 

module.exports = router;
