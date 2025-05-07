import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    fullname : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        unique : true,
        required : true
    },
    password : {
        type : String ,
        required :true,
        minLenght : 6 
    },
    bio :{
        type :String,
        default : ''
    },
    profilePic : {
        type : String,
        default : ''
    },
    nativeLanguage : {
        type :String,
        default : ''
    },
    learningLanguage : {
        type :String,
        default : ''
    },
    location :{
        type :String,
        default : ""
    },
    isOnBoarded : {
        type : Boolean,
        default : false
    },
    friends : [
        {
            type : Schema.Types.ObjectId,
            ref : 'User'
        }
    ]


} ,{timestamps : true})

userSchema.pre('save' , async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password , 10)
    next()
    
})


userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)

}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign( {
        _id : this._id,

    } , process.env.JWT_ACCESS_TOKEN_SECRET , {expiresIn : process.env.JWT_ACCESS_TOKEN_EXPIRY})
}




export const User = mongoose.model("User",userSchema)