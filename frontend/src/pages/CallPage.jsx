import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../utils/api";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";
import useAuthUser from "../hooks/useAuthUser";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {

  const { id: callId } = useParams();
  const clientRef = useRef(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const { authUser, isLoading } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const init = async () => {
      if (!authUser || !tokenData?.token || !callId) {
        setIsConnecting(false)
        return
      };

      if (clientRef.current) return; // Don't re-create client

      try {
          // Request mic permission upfront
        await navigator.mediaDevices.getUserMedia({ audio: true });

        console.log("Microphone permission granted");
        console.log("Init video client...");
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        const client = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
          logger: {
          level: 'debug',
            },
        });

        const callInstance = client.call("default", callId);
        await callInstance.join({ create: true });


         // Enable mic explicitly
          const localParticipant = callInstance.localParticipant;
          if (localParticipant) {
            await localParticipant.setMicrophoneEnabled(true);
          }
  

        clientRef.current = client;
        setCall(callInstance);
      } catch (err) {
        console.error("Error initializing call:", err);
        toast.error("Could not join the call.");
        toast.error("Could not join the call or microphone access denied.");

      } finally {
        setIsConnecting(false);
      }
    };

    init();

      return () => {
    if (call) call.leave();
  };

  }, [tokenData, authUser, callId]);

  if (isLoading || isConnecting) return <PageLoader />;

  return (
    <div className="h-screen flex items-center justify-center">
      {clientRef.current && call ? (
        <StreamVideo client={clientRef.current}>
          <StreamCall call={call}>
            <CallContent />
          </StreamCall>
        </StreamVideo>
      ) : (
        <p>Could not initialize call.</p>
      )}
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (callingState === CallingState.LEFT && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate("/");
    }
  }, [callingState]);

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition={'bottom'} />
      <CallControls />
    </StreamTheme>
  );};

export default CallPage;
