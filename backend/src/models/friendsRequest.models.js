import mongoose, {Schema} from 'mongoose'

const friendReqestSchema = new Schema(
    {
    sender : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    recipient : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type :String,
        enum : ['pending' ,'accepted'],
        default : 'pending'
        }
    }, {timeStamps : true}
)

export const FriendRequest = mongoose.model("FriendRequest" , friendReqestSchema)