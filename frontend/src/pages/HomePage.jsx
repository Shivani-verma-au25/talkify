import React, { useEffect, useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import PageLoader from '../components/PageLoader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getFriends, getOutgoinFriendReq, getRecommendedUser, sendFriendReq } from '../utils/api';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, MapPinIcon, UserIcon, UserPlusIcon } from 'lucide-react';
import FriendCard, { getLaguageFlag } from '../components/FriendCard';
import NOFRIENDfound from '../components/NOFRIENDfound';

function HomePage() {
  const { isLoading } = useAuthUser();
  const queryClient = useQueryClient();
  const [outGoingRequests, setOutGoingRequests] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: getFriends,
  });

  const { data: recommendedUser = [], isLoading: loadingRecommendUser } = useQuery({
    queryKey: ['users'],
    queryFn: getRecommendedUser,
  });

  const { data: outgoingFriendReq = [] } = useQuery({
    queryKey: ['outgoingFriendReq'],
    queryFn: getOutgoinFriendReq,
  });

  const { mutate: sendReqMutation, error, isPending } = useMutation({
    mutationFn: sendFriendReq,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['outgoingFriendReq'] }),
  });

  useEffect(() => {
    const outgoingIDs = new Set();
    if (outgoingFriendReq && outgoingFriendReq.length > 0) {
      outgoingFriendReq.forEach((req) => {
        // console.log(req);
        
        outgoingIDs.add(req?.recipient._id);
      });
    }
    setOutGoingRequests(outgoingIDs);
  }, [outgoingFriendReq]);

  if (isLoading) return <PageLoader />;

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
        {/* Friends Header */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <h2 className='text-2xl sm:text-xl font-bold tracking-tighter'>Your Friends</h2>
          <Link to={'/notifications'} className='btn btn-outline btn-sm'>
            <UserIcon className='mr-2 size-4' />
            Friend Request
          </Link>
        </div>

        {/* Friends List */}
        {loadingFriends ? (
          <div className='flex justify-center py-12'>
            <span className='loading-spinner loading loading-lg' />
          </div>
        ) : friends.length === 0 ? (
          <NOFRIENDfound />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* Recommended Users */}
        <section>
          <div className=' mb-6 sm:mb-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Meet new Friends</h2>
                <p className='opacity-70'>
                  Discover perfect language exchange partners based on your profile
                </p>
              </div>
            </div>
          </div>

          {loadingRecommendUser ? (
            <div className='flex justify-center py-12'>
              <span className='loading loading-spinner load'></span>
            </div>
          ) : recommendedUser.length === 0 ? (
            <div className='card bg-base-200 p-6 text-center '>
              <h3 className='font-semibold text-lg mb-2'>No recommendations available</h3>
              <p className='text-base-content opacity-70'>
                Check back later for new partners!
              </p>
            </div>
          ) : (
            // <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
             <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4'>

              {recommendedUser.map((user) => {
                const hasRequestBeenSent = outGoingRequests.has(user._id);
                return (
                  <div key={user._id} className='card bg-base-200 hover:shadow-lg transition-all duration-300'>
                    <div className='card-body p-5 space-y-4'>
                      <div className='flex items-center gap-3'>
                        <div className='avatar size-16 rounded-full'>
                          <img src={user.profilePic} alt={user.fullname} />
                        </div>
                        <div>
                          <h3 className='font-semibold text-lg'>{user.fullname}</h3>
                          {user.location && (
                            <div className='flex items-center text-xs opacity-70 mt-1'>
                              <MapPinIcon className='size-3 mr-1' />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>


                      {/* languaes with flag */}
                        <div className='flex  flex-wrap gap-1.5'>
                          <span className='badge badge-secondary text-xs'>
                            {getLaguageFlag(user.nativeLanguage)}
                            Native: {capitalize(user.nativeLanguage)}
                          </span>
                          <span className='badge badge-secondary text-xs'>
                            {getLaguageFlag(user.learningLanguage)}
                            Learning: {capitalize(user.learningLanguage)}
                          </span>
                        </div>

                        {user.bio && <p className='text-sm opacity-70'>{user.bio}</p> }

                        {/* action button */}
                        <button className={`btn w-full mt-2 ${hasRequestBeenSent ? 'btn-disabled' : 'btn-primary'}`}
                        onClick={()=> sendReqMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                        >
                          {hasRequestBeenSent ? (
                            <>
                            <CheckCircleIcon  className='size-4 mr-2'/>
                            Request send
                            </>
                          ) : (
                            <>
                            <UserPlusIcon  className='size-4 mr-2'/>
                            Send friend request
                            </>
                          )}
                        </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HomePage;

export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
