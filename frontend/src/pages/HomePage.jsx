import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import PageLoader from '../components/PageLoader'

function HomePage() {
  const {isLoading} = useAuthUser()

  if (isLoading) return <PageLoader />
  
  return (
    <div>HomePage</div>
  )
}

export default HomePage