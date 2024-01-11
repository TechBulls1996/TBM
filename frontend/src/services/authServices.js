import axios from "axios";
import { API_URL } from '../helpers/constant';

export const UserLogin = async (params) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, params);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const UserRegister = async (params) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, params);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
