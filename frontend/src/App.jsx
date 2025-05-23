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
import { useThemeStore } from './store/useThemeStore.js'

function App() {
// tanstack query
const {theme } = useThemeStore()
  const {isLoading , authUser} = useAuthUser()
  const authenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnBoarded 

  //  console.log(authUser,"authuser");
   
  if (isLoading) return <PageLoader/>

  return (
    <div className='h-screen ' data-theme={theme}>
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
      <Route path='/notifications' element={ authenticated && isOnboarded  ? (
        <LayOut showSidebar={true}>
          <NotificationPage />
        </LayOut>
      ) : (
        <Navigate to={!authenticated ? '/login' : '/onboarding'} />
      )} />
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
      <Route path='/chat/:id' element={ authenticated && isOnboarded ? (
        <LayOut showSidebar={true}>
          <ChatPage />
        </LayOut>
      ) : (
        <Navigate to={!authenticated ?'/login' : '/onboarding' } />
      )} />
      <Route path='/call/:id' element={authenticated && isOnboarded ? (
        <CallPage />
      ) : (
        <Navigate to={!authenticated ? '/login' : '/onboarding'} />
      )}  />
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>

    <Toaster />
    </div>
  )
}

export default App