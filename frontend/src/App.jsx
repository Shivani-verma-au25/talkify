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
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import LayOut from './components/LayOut.jsx'

function App() {
// tanstack query
   
  const {isLoading , authUser} = useAuthUser()
  const authenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnBoarded 

   console.log(authUser,"authuser");
   
  if (isLoading) return <PageLoader/>

  return (
    <>
    <Routes  >
      <Route path='/' element={ authenticated  && isOnboarded ? (
        <LayOut showSidebar = {true}>
          <HomePage />
        </LayOut>
      ) : (
        <Navigate to={ !authenticated ? "/login" : '/onboarding'} />
        )} />
      <Route path='signup/' element={ !authenticated ?  <SignUpPage /> : <Navigate  to={ isOnboarded ? '/' : '/onboarding' } />  } /> 
      <Route path='/login' element={ !authenticated ?  <LoginPage />  : <Navigate to={ isOnboarded ? '/' : '/onboarding' } />} />
      <Route path='/notificatoion' element={ authenticated ? < NotificationPage/>  : <Navigate to='/login'/>} />
      <Route path='/onboarding' element={ authenticated ? 
      (
        !isOnboarded ? (
          <OnBoardingPage />
        ) : (
          <Navigate to={'/'} />
        )
      ) : (
        <Navigate to={'/login'} />
      ) } />
      <Route path='/chat' element={ authenticated ? <ChatPage /> : <Navigate to='/login'/>} />
      <Route path='/call' element={authenticated ? <ChatPage /> : <Navigate to={'/login'} />}  />
    </Routes>
    <Toaster />
    </>
  )
}

export default App