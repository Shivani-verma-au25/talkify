import React, { useState } from 'react'
import { HandMetal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/Axios';
import { signup } from '../utils/api';
import useSignup from '../hooks/useSignup';



function SignUpPage() {
  const navigate = useNavigate() 
  const [signupData ,setSignUpData] = useState({
    fullname : '',
    email : '',
    password : '',
  });


  // const queryClient = useQueryClient();

  // const {mutate ,isPending ,error} = useMutation({
  //   mutationFn : signup,
  //   onSuccess : () => queryClient.invalidateQueries({queryKey : ['authUser']})  
  // })

  const {isPending ,signupMutate , error} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault();
    // call to useMutation funct use mutate to call it
    signupMutate(signupData)
  }

  return (
    <div className='h-screen flex items-center  justify-center p-4 sm:p-6 md:p-8 ' data-theme="">
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full  max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* signup from -left side */}
        <div className='w-full lg:w-1/2 p-4  sm:p-8 flex flex-col '>
          {/* logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <HandMetal className='w-9 h-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tighter '>Takify</span>
          </div>
          {/* error message if any  */}
          {error && (
            <div className='alert alert-error b-4'>
              <span>{error.response.data.message }</span>
            </div>
          ) }
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
                    name="fullname" 
                    id="" />
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
                    name="email" 
                    id="" />
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
                    name="password" id="" />

                    <p className='text-xs opacity-70 mt-1'>Passwor must be at least 6 characters long</p>
                  </div>
                </div>
              </div>
                {/* button */}
                <button className='btn btn-primary w-full my-4 ' type='submit'>{isPending ? (
                  <>
                  <span className='loading loading-spinner loading-xs'></span>
                  Loading...
                  </>
                ) : ('Create Account') } </button>
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
            <img src='/signuppagepic.png' alt="Language ilustrations" className='w-full h-full' />
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