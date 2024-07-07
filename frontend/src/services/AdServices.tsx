import axios from "axios";
import { setServiceHeaders } from "../helpers";
import { API_URL } from "../helpers/constant";

export const GetAds = async (params: object) => {
    try {
      const config = {
        ...setServiceHeaders(),
        params,
      };
      const res = await axios.get(`${API_URL}/admin/ad`, config);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  
  export const CreateAd = async (params:any, onUploadProgress: any) => {
    try {
      const headers:any = setServiceHeaders();
      headers['headers']['Content-Type'] = 'multipart/form-data';  
      const config = {
        ...headers,
        onUploadProgress,
      };

      let url;
      const getId = params.get('id');
      if(getId){
        url = `${API_URL}/admin/ad/update/${getId}`;
      }else{
        url = `${API_URL}/admin/ad/create`;
      }
      const res = await axios.post(url, params, config);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  
  export const DeleteAd = async (id:string) => {
    try {
      const config = {
        ...setServiceHeaders(),
      };
      const res = await axios.post(`${API_URL}/admin/ad/delete`,{id},config);
      return res.data;
    } catch (error: any) {
      return error.response.data;
    }
  };