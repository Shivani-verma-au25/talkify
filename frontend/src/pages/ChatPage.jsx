import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../utils/api';
import {Channel,ChannelHeader, Chat,MessageInput ,MessageList , Thread ,Window} from 'stream-chat-react'
import { StreamChat } from 'stream-chat';
import toast from 'react-hot-toast';
import ChatLoader from '../components/ChatLoader';
import CallButton from '../components/CallButton';

function ChatPage() {
  const {id:targetUserID} = useParams()
  // console.log(targetUserID);
  const navigate = useNavigate()
  

  const [chatClient ,setChatClient] = useState(null)
  const [channel ,setChannel] = useState(null)
  const [loading ,setLoading] = useState(true)

  const {authUser} = useAuthUser()
  
  const {data:tokenData} = useQuery({
    queryKey : ['streamToken'],
    queryFn : getStreamToken,
    enabled : !!authUser // this will only run when authuser is available
  })

  useEffect(() => {
    console.log("Token Data:", tokenData);
    const initChat  = async () =>{
      if (!tokenData?.token || !authUser) return ;

      try {
        console.log("Initializing the Stream chat client....");
        // initialize first
        const client = StreamChat.getInstance(import.meta.env.VITE_STREAM_API_KEY)
        // connect to the user
        await client.connectUser({
          id : authUser._id,
          name : authUser.fullname,
          image : authUser.profilePic
        },tokenData.token);

      // sort chat ides
      const channelId = [authUser._id ,targetUserID].sort().join("-"); 
    // create cuurent channel
      const currentChannel = client.channel('messaging',channelId,{
        members : [authUser._id , targetUserID]
      })  
      // watch for real time changes
      await currentChannel.watch()
      // update the states
      setChatClient(client)
      setChannel(currentChannel)
        
      } catch (error) {
        // console.log('Error initializing caht',error);
        toast.error("Could not connet to chat. Please try again!")
        
      }finally{
        setLoading(false)
      }
    }
    initChat()
  },[tokenData ,authUser ,targetUserID])

  // video call handler
  const handleVideoCall =() => {
    if (channel) {
      // const callUrl = `${window.location.origin}/call/${channel.id}`
      const callUrl = `${window.location.origin}/call/${channel.id}`
      // console.log("call url" ,callUrl);
      
      channel.sendMessage({
        text : `I've started a video call. Join me here : ${callUrl}`
      })
      toast.success("Video call link send successfully!")  
    }
  }
  
  if(loading || !chatClient || !channel) return <ChatLoader/>

  return (
    <div className='h-[91vh]  '>
      <Chat client={chatClient}>
        <Channel channel={channel} >
          <div className='w-full relative '>
            <CallButton handleVideoCall={handleVideoCall}/>
            <Window>
              <ChannelHeader/>
              <MessageList  />
              <MessageInput focus/>
            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage