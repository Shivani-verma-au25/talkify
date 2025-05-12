import { axiosInstance } from "./Axios";

export const signup = async (signupData) => {
      const resp = await axiosInstance.post('/auth/signup', signupData);
      console.log(resp.data , "datas sgnin");
      return resp.data;
      
}
// login
export const login = async (loginData) => {
      const resp = await axiosInstance.post('/auth/signin', loginData);
      console.log(resp.data , "datas sgnin");
      return resp.data;
      
}



export const getAuthUser = async() => {
      const res = await  axiosInstance.get(`/auth/me`)
      return res.data;
      }


export const completeOnboarding =async (userData) => {
      const response = await axiosInstance.post('/auth/onboarding',userData);
      return response.data;
}      