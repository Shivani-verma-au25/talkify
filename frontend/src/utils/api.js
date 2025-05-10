import { axiosInstance } from "./Axios";

export const signup = async (signupData) => {
      const resp = await axiosInstance.post('/auth/signup', signupData);
      console.log(resp.data , "datas sgnin");
      return resp.data;
      
}