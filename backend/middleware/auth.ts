import { ApiFailedResponse, getRequestAuth } from "../helper/global";
import moment from "moment";

const msg = "Authentication Failed, Please Login again.";

const authMiddelware = (req: any, res: any, next: () => void) => {
  try {
    const decodedToken = getRequestAuth(req);
    const { userId, userName, time } = decodedToken;
    const timeDiff = moment().diff(moment(time), "days");
    if (!decodedToken || (!userId && !userName) || timeDiff > 7) {
      return res.status(401).json(ApiFailedResponse(msg));
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json(ApiFailedResponse(msg));
  }
};


const adminAuthMiddelware = (req: any, res: any, next: () => void) => {
  try {
    const decodedToken = getRequestAuth(req);
    const { userId, userName, time } = decodedToken;
    const timeDiff = moment().diff(moment(time), "days");
    if (!decodedToken || (!userId && !userName) || timeDiff > 7) {
      return res.status(401).json(ApiFailedResponse(msg));
    } else {
      next();
    }
  } catch (error) {
    return res.status(401).json(ApiFailedResponse(msg));
  }
};


module.exports = { authMiddelware, adminAuthMiddelware } ;
