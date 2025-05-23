// import { asyncHandler } from "../utils/asyncHandler.js";
// import { genrateStreamToken } from "../utils/stream.js";

// export const getVideoStreamToken = asyncHandler (async (req, res) => {
//     try {
//         const token = await genrateStreamToken(req.user?._id)

//         if(!token) {
//             console.log('token not given');   
//         }
        
//         return res.status(200).json({token})
//     } catch (error) {
//         console.log( "Error fron generating stream token  in call controller :" ,error);
//         return res.status(500).json({message : "internal server error"})  
//     }
// })


// import { StreamVideoServerClient  } from '@stream-io/node-sdk';

// export const getVideoStreamToken = asyncHandler ( async (req ,res ) => {
//     const videoClient = new StreamVideoServerClient({
//     apiKey: process.env.STREAM_CHAT_API_KEY,
//     apiSecret: process.env.STREAM_CHAT_API_SECERET,
//     });

//     const userId = req.user.id; // Ensure user is authenticated (e.g., via session or JWT)

//   try {
//     const token = videoClient.createToken(userId);
//     return res.json({ token });
//   } catch (error) {
//     console.error('Failed to create video token:', error);
//     return res.status(500).json({ error: 'Could not generate token' });
//   }
// })