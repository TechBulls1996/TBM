import axios from "axios";
import { API_URL } from '../../helpers/constant';
import { setServiceHeaders } from "../../helpers";


export const GetUsers = async (params: object) => {
  try {
    const config = {
      ...setServiceHeaders(),
      params,
    };
    const res = await axios.get(`${API_URL}/admin/user`, config);
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};