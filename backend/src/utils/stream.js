import {StreamChat} from 'stream-chat' 
import dotenv from "dotenv";
dotenv.config()


const apiky = process.env.STREAM_CHAT_API_KEY
const apikySceret = process.env.STREAM_CHAT_API_SECERET
// console.log(process.env.STREAM_CHAT_API_KEY);
// console.log(process.env.STREAM_CHAT_API_SECERET);


if ( !apiky || !apikySceret){
    console.log("Stream api key or screst is missing !");
}

const streamClient = StreamChat.getInstance(apiky ,apikySceret);

export const upStreamUser =  async(userData) =>{
    try {
        await streamClient.upsertUser({
            id : userData.id,
            name : userData.name,
            image : userData.image || ''
        })
        return userData;
    } catch (error) {
        console.log("Error creating stream user :",error);
        
    }
}


// todo : to it later
export const genrateStreamToken = async (userID) =>{}