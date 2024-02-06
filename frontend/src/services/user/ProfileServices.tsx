import axios from "axios";
import { API_URL } from '../../helpers/constant';

export const getUser = async (params: object) => {
  try {
    const res = await axios.get(`${API_URL}/user`, params);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};