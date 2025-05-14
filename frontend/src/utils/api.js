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
// logout
export const logout = async () => {
      const resp = await axiosInstance.post('/auth/logout');
      console.log(resp.data , "log out user");
      return resp.data;
      
}



export const getAuthUser = async() => {
      try {
         const res = await  axiosInstance.get(`/auth/me`)
            return res.data;   
      } catch (error) {
            console.log("error from getauth api", error);
            
          return null  
      }
}


export const completeOnboarding =async (userData) => {
      const response = await axiosInstance.post('/auth/onboarding',userData);
      return response.data;
}      