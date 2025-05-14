import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router-dom'
import { BellIcon, HomeIcon, ShipWheelIcon, User2Icon } from 'lucide-react'

function SideBar() {
    const {authUser} =useAuthUser()
    const {pathname} = useLocation()
    // console.log(pathname);
    
  return (
    
    <aside className='w-64 bg-base-200 bordr-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0' data-theme="">
        <div className='p-5 border-b border-base-300'>
            <Link to={'/'} className='flex items-center gap-2.5'>
                <ShipWheelIcon  className='size-9 text-primary'/>
                <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                    Talkify
                </span>
            </Link>
        </div>

        {/* navigation */}
        <nav className='flex-1 p-4 space-y-1'>
            <Link to={'/'} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${pathname === '/' ? "btn-active" : "" }`}>
                <HomeIcon  className='size-5 text-base-content opacity-70'/>
                <span>Home</span>
            </Link>
                {/* friends */}
             <Link to={'/friends'} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${pathname === '/friends' ? "btn-active" : "" }`}>
                <User2Icon  className='size-5 text-base-content opacity-70'/>
                <span>Friends</span>
            </Link>
                {/* notification */}
            <Link to={'/notification'} className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${pathname === '/notification' ? "btn-active" : "" }`}>
                <BellIcon  className='size-5 text-base-content opacity-70'/>
                <span>Notifications</span>
            </Link>
        </nav> 

        {/* user profile section */}
        <div className='p-4 border-t border-base-300 mt-auto'>
            <div className='flex items-center gap-5 '>
                <div className='avatar'>
                    <div className='w-10 rounded-full'> 
                        <img src={authUser?.profilePic} alt="User avatar" />
                    </div>
                </div>
                <div className='flex-1'>
                        <p className='font-semibold text-sm'>{authUser.fullname}</p>
                        <p className='text-xs text-success flex items-center gap-2'>
                            <span className='size-4 rounded-full text-success inline-block'>Online</span>
                        </p>
                    </div>
            </div>
        </div>
    </aside>
  )
}

export default SideBar