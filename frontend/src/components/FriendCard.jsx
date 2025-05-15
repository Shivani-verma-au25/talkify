import React from 'react'
import { LANGUAGE_TO_FLAG } from '..'
import { Link } from 'react-router-dom'

function FriendCard({key ,friend}) {
  return (
    <div className='card bg-base-20 hover:shodow-md transition-shadow'>
        <div className='acrd-body p-4'>
            {/* user info */}
            <div className='flex items-center gap-3 mb-3'>
                <div className='avatar size-12'>
                    <img src={friend.profilePic} alt="" />
                </div>
                <h3 className='font-semibold truncate'>{friend.fullname}</h3>
            </div>

            <div className='flex flex-wrap gap-2.5 mb-3'>
                <span className='bagde bagde-secondary text-xs'>
                    {getLaguageFlag(friend.nativeLanguage)}
                    Native : {friend.nativeLanguage}
                </span>
                <span className='bagde bagde-secondary text-xs'>
                    {getLaguageFlag(friend.learningLanguage)}
                    Learning : {friend.learningLanguage}
                </span>
            </div>
            <Link to={`/chat/${friend._id}`} className='btn btn-outline w-full' >Message</Link>
        </div>

    </div>
  )
}

export default FriendCard


export function getLaguageFlag(language){
    if(!language) return null
    const languageLow = language.toLowerCase()
    const countryCode = LANGUAGE_TO_FLAG[languageLow]

    if(countryCode){
        return(
            <img src={`http://flagcdn.com/24x18/${countryCode}.png`} alt=""
            className='h-3 mr-1 inline-block'
             />
        )
    }
    return null
}