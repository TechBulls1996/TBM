import axios from "axios";
import { setServiceHeaders } from "../helpers";
import { API_URL } from "../helpers/constant";

export const GetDashboardCount = async (params: object) => {
    try {
      const config = {
        ...setServiceHeaders(),
        params,
      };
      const res = await axios.get(`${API_URL}/admin/counts`, config);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  export const GetUserAds = async (params: object) => {
    try {
      const config = {
        ...setServiceHeaders(),
        params,
      };
      const res = await axios.get(`${API_URL}/user/ads`, config);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  export const GetUserEventInfo = async () => {
    try {
      const config = {
        ...setServiceHeaders(),
      };
      const res = await axios.get(`${API_URL}/user/event/info`, config);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  export const CreateAdEvent = async (params: object) => {
    try {
      const config = {
        ...setServiceHeaders()
      }
      const res = await axios.post(`${API_URL}/user/events`, params, config);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };


