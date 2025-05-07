import jwt from 'jsonwebtoken'
import { User} from '../models/user.models.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const protectRoute = asyncHandler( async( req,res ,next) =>{
    try {
        const token = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "")
        // console.log(token , "token from  mid");
        
        if (!token){
            return res.status(400).json({message :"Unauthorized -: No token provide !"})
        } 
        
        const decodedToken = jwt.verify(token , process.env.JWT_ACCESS_TOKEN_SECRET)
        if (!decodedToken) {
            return res.status(400).json({message : "Unauthorized -: Invalid token  !"})
        }

        const user = await User.findById(decodedToken?._id).select('-password')
        // console.log(user ,"from middler");
        

        if (!user) {
            return res.status(400).json({message : "Invalid token"})
        }

        req.user = user
        next()

    } catch (error) {
        console.log( "error from middelwares" , error)
    }
})
