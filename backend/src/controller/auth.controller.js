import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.models.js'
import { upStreamUser } from '../utils/stream.js';

// user signup
export const authSignUp = asyncHandler( async  (req ,res) => {
    
    const {fullname ,email ,password} = req.body;
    console.log(fullname ,email ,password);
    console.log(req.body);
    
    
    if([
        fullname, email , password].some((field) => typeof (field) !== 'string' || field?.trim() === '')
        ){ 
        return res.status(400).json({message :  "All Fields are required !"})
    }

    if (password.length  < 6) {
        return res.status(400).json({message : "Password must be al least 6 characters"})
    }

    const existUser = await User.findOne({email})
    if (existUser) {
        return res.status(400).json({message : "Email is already exists! Please use a diffrent one "})
    }

    const idx = Math.floor(Math.random() * 100) + 1
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

    const user = await User.create({
        fullname,
        email ,
        password,
        profilePic : randomAvatar
    })
    // console.log(user ,"user");
    

    const createdUser = await User.findById(user._id).select('-password')

    if (!createdUser) {
        return res.status(400).json({message : "User id not created !"})
    }

    // console.log(createdUser , "createdUser");
    
    // todo : create the user as stream as well

    try {
        if (createdUser && createdUser._id)
        await upStreamUser({
        id : createdUser?._id.toString(), 
        name : createdUser.fullname,
        image : createdUser.profilePic || '' 
    })
    console.log(`Stream user Created ${createdUser.fullname}`);
    
    } catch (error) {
        console.log("Error creating Stream User !",error);
        
    }

    const accessToken = await createdUser.generateAccessToken()

    res.cookie('accessToken' , accessToken ,{
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true , // prevent xss attacks
        sameSite: "strict" ,// prevnt CSRF attacks
        secure : process.env.NODE_ENV === 'production'
    })

    return res.status(201).json({
        seccess : true ,
        user : createdUser,
        accessToken
    })

})



// user signin

export const authLogin = asyncHandler( async (req, res) => {
    const  {email , password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message : "All fiels are required!"})
    }
    
    const user = await User.findOne({email})
    if (!user) {
        return res.status(401).json({message : "Ivalid email nad password !"})
    }

    const correctPass = await user.isPasswordCorrect(password)

    if (!correctPass) {
        return res.status(400).json({message : "Password is not correct!"})
    }

    const accessToken = await user.generateAccessToken()


    return res.status(200)
    .cookie('accessToken' ,accessToken ,{
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true , // prevent xss attacks
        sameSite: "strict" ,// prevnt CSRF attacks
        secure : process.env.NODE_ENV === 'production'
    })
    .json({
        success :true,
        user
    })

})



// user logout

export const authLogOut = asyncHandler( async (req ,res) => {
    res.clearCookie('accessToken')
    res.status(200).json({
        success  : true,
        message : "Logout successfull"
    })

})



// on boarding 
export const onBoard = asyncHandler(async (req, res) => {
    try {
        const userId = req.user?._id;

        const { fullname, bio, profilePic, nativeLanguage, learningLanguage, location } = req.body;
        // console.log(req.body);
        // console.log(userId);

        if ([fullname, bio, nativeLanguage, learningLanguage, location].some((field) => typeof field !== 'string' || field.trim() === "")) {
            return res.status(401).json({
                message: "All fields are required!",
                missingFields: [
                    !fullname && 'fullname',
                    !bio && 'bio',
                    !nativeLanguage && 'nativeLanguage',
                    !learningLanguage && 'learningLanguage',
                    !location && 'location'
                ].filter(Boolean)
            });
        }

        console.log("Before update user");

        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnBoarded: true,
        }, { new: true });

        if (!updatedUser) return res.status(401).json({ message: 'User not found!' });

        console.log("After update user");

        // Update the user info in the stream
        try {
            await upStreamUser({
                id: updatedUser._id.toString(), // Use updatedUser._id here
                name: updatedUser.fullname, // Use updatedUser.fullname here
                image: updatedUser.profilePic || '' // Use updatedUser.profilePic here
            });
            console.log(`Stream user updated after onboarding for ${updatedUser.fullname}`);
        } catch (streamError) {
            console.log(`Error updating stream user during onboarding: ${streamError.message}`);
        }

        return res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {
        console.log("Error from onboarding:", error);
    }
});
