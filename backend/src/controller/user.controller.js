import { FriendRequest } from "../models/friendsRequest.models.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getRecommendedUsers = asyncHandler( async (req ,res) =>{
    const currentUSerid = req.user?._id;
    const currentUser = req.user; 

    const recommendedUsers = await User.find({
        $and : [
            {_id : {$ne : currentUSerid}}, // exclude current user
            {$id : { $nin : currentUser.friends}}, // excludes current user's friends
            { isOnBoarded : true},
        ],
    });
    return res.status(200).json(recommendedUsers); 

})


// get my friends 
export const getMyFriends = asyncHandler( async (req, res) => {
    try {
        const user  = await User.findById(req.user?._id).select("friends").populate('friends' ,"fullname profilePic nativeLanguage learningLanguage location")
        return res.status(200).json(user.friends)
    } catch (error) {
        console.log("Erronr in getFrinds controller" , error);
        return res.status(400).json({message : "internal server error"})
    }
})



// send friend request

export const sendFriendRequest = asyncHandler( async (req, res) =>{
    try {
        const myId = req.user?._id; // my id 
        const {id} = req.params ;  //senders id

        // prevent sending request to yourself 
        if (myId === id)  {
            return res.status(400).json({message : "You can not send a friend request to yourSelf!"})
        }
        
        const recipient = await User.findById(id);
        if (!recipient) {
            return res.status(401).json({message : "Recipient not found !"})
        }

        // if user is alreadyy is friend
        if (recipient.friends.includes(myId)){
            return res.status(400).json({message : "ou are already friend with this user"})
        }

        // check request is already is exist
        const existingRequest = await FriendRequest.findOne({
            $or :[
                {sender : myId , rerecipient : id},
                {sender : id , rerecipient : myId}
            ],
        }) ;

        if (existingRequest) {
            return res.status(400).json({message : "A request already exists between you and this user !"})
        }

        const friendrequest = await FriendRequest.create({
            sender : myId,
            recipient : id
        });

        return res.status(201).json(friendrequest)

    } catch (error) {
        console.log("Error in sending friend request controller ", error);
        return res.status(500).json({message : "internal server error!"})
        
    }
})


// accept friend request 

export const acceptFriendRequest = asyncHandler( async (req, res ) =>{
    try {
        const {id} = req.params;
        const friendrequest = await FriendRequest.findById(id);

        if(!friendrequest) return res.status(400).json({message : " Friend request not found!"})
        
        // verify the current user is recipient
        if( friendrequest.recipient.tostring() !== req.user?.id){
            return res.status(401).json({message :" You are not authorized to accept this request!"})
        }
        friendrequest.status = 'accepted';
        await friendrequest.save()

        // add each other's to the friends array
        // $addToSet : adds elemnts to an array only if they do not lareadyy exist 
        await User.findByIdAndUpdate(friendrequest.sender ,{
            $addToSet  : {friends : friendrequest.recipient}
        });

        await User.findByIdAndUpdate(friendrequest.recipient ,{
            $addToSet  : {friends : friendrequest.sender}
        });

        return res.status(200).json({message : "Friend request accepted!"})

    } catch (error) {
        console.log("Error while accepting the freind request in friend request controller" , error);
        return res.status(500).json({message : "internal server error !"})
        
    }
})


// getting friend request

export const getFriendRequest = asyncHandler( async(req, res) =>{
    try {
        const incomingReqs = await FriendRequest.find({
            recipient : req.user._id,
            status : 'pending',
        }).populate('sender',"fullname  profilePic nativeLanguage learningLanguage location");

        const acceptedReqs = await FriendRequest.find({
            sender : req.user?._id,
            status : 'accepted'
        }).populate('recipient', 'fullname profilePic')

        return res.status(200).json({incomingReqs , acceptedReqs}) 
    } catch (error) {
        console.log("Error while accepting the request in getrequest controller",error);
        return res.status(500).json({message : "Internal server error !"})
        
    }
})

//getOutGoingFreindRequest

export const getOutGoingFreindRequest = asyncHandler( async( req,res) => {
    try {
        const outGoingRequest = await FriendRequest.find({
            sender : req.user?._id,
            status : 'pending',
        }).populate('recipient',"fullname profilePic nativeLanguage learningLanguage location")

        return res.status(201).json(outGoingRequest)
    } catch (error) {
        console.log("Error while getting out going reqest in outgoing controller",error);
        return res.status(500).json({message : "Internal server error!"})
        
    }
})