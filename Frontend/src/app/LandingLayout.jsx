import React from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../features/auth/hooks/useAuth'
import { useEffect } from 'react'


const LandingLayout = () => {


  const {handleGetUser} = useAuth()

  useEffect(() => {
    handleGetUser()
  }, [])


  return <Outlet/>
}

export default LandingLayout
