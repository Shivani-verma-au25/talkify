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


// getting user reccomended user frinds or send request to user
export const getFriends = async () => {
      const response = await axiosInstance.get('/user/friends')
      return response.data;
}
export const getRecommendedUser = async () => {
      const response = await axiosInstance.get('/user')
      return response.data;
}
export const getOutgoinFriendReq = async () => {
      const response = await axiosInstance.get('/user/outgoing-friend-request')
      return response.data;
}
export const sendFriendReq = async (userId) => {
      const response = await axiosInstance.post(`/user/friend-request/${userId}`)
      return response.data;
}



// accepting request ,notifications 

export const getFriendRequest = async () => {
      const response = await axiosInstance.get('/user/frined-request')
      return response.data;
}
export const acceptFriendRequest = async (requestId) => {
      const response = await axiosInstance.put(`/user/friend-request/${requestId}/accept`)
      return response.data;
}



// stream token

export const getStreamToken = async() => {
      const response = await axiosInstance.get('/chat/token')
      console.log(response.data,"from api");
      return response.data;
      
}

// export const getStreamToken = async () => {
//   const res = await axiosInstance.get('/chat/token');
//   console.log("Axios Response:", res);        // Full Axios response
//   console.log("Token Data:", res.data.token); // Should log actual token
//   return res.data; // ✅ This is critical
// };

