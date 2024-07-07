import axios from "axios";
import { setServiceHeaders } from "../helpers";
import { API_URL } from "../helpers/constant";

export const GetClients = async (params: object) => {
    try {
      const config = {
        ...setServiceHeaders(),
        params,
      };
      const res = await axios.get(`${API_URL}/admin/client`, config);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  
  export const CreateClient = async (params: object) => {
    try {
      const config = {
        ...setServiceHeaders(),
      };
      const res = await axios.post(`${API_URL}/admin/client/create`, params, config);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  
  export const DeleteClient = async (id:string) => {
    try {
      const config = {
        ...setServiceHeaders(),
      };
      const res = await axios.post(`${API_URL}/admin/client/delete`,{id},config);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };