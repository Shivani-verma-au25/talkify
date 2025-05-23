import { asyncHandler } from "../utils/asyncHandler.js";
import { genrateStreamToken } from "../utils/stream.js";

export const getStreamToken = asyncHandler ( async ( req,res) =>{
    try {
        const token = await genrateStreamToken(req.user?._id)

        if(!token) {
            console.log('token not given');   
        }
        
        return res.status(200).json({token})
    } catch (error) {
        console.log( "Error fron generating stream token  in chat controller :" ,error);
        return res.status(500).json({message : "internal server error"})  
    }
})