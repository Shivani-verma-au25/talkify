import React, { useState } from 'react'
import { HandMetal } from 'lucide-react';
import { Link } from 'react-router-dom';



function SignUpPage() {
  const [signupData ,setSignUpData] = useState({
    fullname : '',
    email : '',
    password : '',
  });

  const handleSubmit = (e) => {
    e.preventDeafault()
  }

  return (
    <div className='h-screen flex items-center  justify-center p-4 sm:p-6 md:p-8 ' data-theme="coffee">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full  max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* signup from -left side */}
        <div className='w-full lg:w-1/2 p-4  sm:p-8 flex flex-col '>
          {/* logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <HandMetal className='w-9 h-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tighter '>Takify</span>
          </div>

          <div className='w-full'>
            {/* signup form */}
            <form onSubmit={handleSubmit} >
              <div className='space-y-4 '>
                <div>
                  <h2 className='text-xl font-semibold '>Create an Account</h2>
                  <p className='text-sm opacity-70'>Join talkify and start your  language learning advanture!</p>
                </div>

                <div className='space-y-3'>
                  {/* name */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Full Name</span>
                    </label>

                    <input className='input input-bordered w-full' 
                    type="text" placeholder='John deo' 
                    value={signupData.fullname}
                    onChange={(e) => setSignUpData({...signupData , fullname : e.target.value})}
                    required
                    name="" id="" />
                  </div>

                  {/* email */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>

                    <input className='input input-bordered w-full' 
                    type="email" placeholder='Johndeo@gmail.com' 
                    value={signupData.email}
                    onChange={(e) => setSignUpData({...signupData , email : e.target.value})}
                    required
                    name="" id="" />
                  </div>


                  {/* password */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>

                    <input className='input input-bordered w-full' 
                    type="password" placeholder='*********' 
                    value={signupData.password}
                    onChange={(e) => setSignUpData({...signupData , password : e.target.value})}
                    required
                    name="" id="" />

                    <p className='text-xs opacity-70 mt-1'>Passwor must be at least 6 characters long</p>
                  </div>
                </div>
              </div>
                {/* button */}
                <button className='btn btn-primary w-full my-4 ' type='submit'>Create Account </button>
                <p className='text-xs'>
                  Allready have an account?{' '}
                  <Link to={'/login'} className='text-primary hover:underline'>Sign in</Link> 
                </p>
            </form>
          </div>

        </div>


        {/* sign up image right side */}
        <div className='hidden lg:flex  w-full lg:h-1/2 bg-primary/10 items-center justify-center'>
        <div className='max-w-md p-8'>
          {/* illustration */}
          <div className='relative aspect-square max-w-sm mx-auto'>
            <img src='./public/signuppagepic.png' alt="Language ilustrations" className='w-full h-full' />
          </div>

          <div className='text-center space-y-3 mt-7'>
            <p className='text-xl font-extrabold'>Connect with language partners worldwide</p>
            <p className='opacity-70'>
              Practice conversation, make friends and improve your language skills together
            </p>
          </div>
        </div>

        </div>

      </div>
    </div>
  )
}

export default SignUpPage