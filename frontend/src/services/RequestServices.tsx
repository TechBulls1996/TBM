import axios from "axios";
import { setServiceHeaders } from "../helpers";
import { API_URL } from '../helpers/constant';

export const SendRequest = async (params: object) => {
  try {
    const res = await axios.post(`${API_URL}/request`, params, setServiceHeaders());
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const GetRequest = async (params: object) => {
  try {
    const config = {
      ...setServiceHeaders(),
      params,
    };
    const res = await axios.get(`${API_URL}/request`, config);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const GetRecentDonars = async (params: object) => {
  try {
    const config = {
      ...setServiceHeaders(),
      params,
    };
    const res = await axios.get(`${API_URL}/request/recent/donars`, config);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const GetRecentRecievers = async (params: object) => {
  try {
    const config = {
      ...setServiceHeaders(),
      params,
    };
    const res = await axios.get(`${API_URL}/request/recent/receivers`, config);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createLike = async (params?: object) => {
  try {
    const res = await axios.post(
      `${API_URL}/request/like/create`,
      params,
      setServiceHeaders()
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createResponse = async (params?: object) => {
  try {
    const res = await axios.post(
      `${API_URL}/request/response/create`,
      params,
      setServiceHeaders()
    );
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
