import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import NotificationPage from './pages/NotificationPage'
import OnBoardingPage from './pages/OnBoardingPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import  {Toaster} from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {axiosInstance} from './utils/Axios.js'

function App() {
// tanstack query
   
   const {data ,isLoading} = useQuery({
    queryKey : ['authUser'],
    queryFn : async() => {
      const res = await  axiosInstance.get(`/auth/me`)
      return res.data;
    },
    retry : false
   })


  const authUser = data?.User;
  
   console.log(data,"data");
   

  return (
    <>
    <Routes  >
      <Route path='/' element={ authUser ?  <HomePage /> : <Navigate to='/login'/> } />
      <Route path='signup/' element={ !authUser ?  <SignUpPage /> : <Navigate to={'/'} />  } /> 
      <Route path='/login' element={ !authUser ?  <LoginPage />  : <Navigate to={'/'} />} />
      <Route path='/notificatoion' element={ authUser ? < NotificationPage/>  : <Navigate to='/login'/>} />
      <Route path='/onboarding' element={ authUser ? <OnBoardingPage /> :  <Navigate to='/login'/> } />
      <Route path='/chat' element={ authUser ? <ChatPage /> : <Navigate to='/login'/>} />
      <Route path='/call' element={ authUser ? <CallPage /> :  <Navigate to='/login'/>}  />
    </Routes>
    <Toaster />
    </>
  )
}

export default App