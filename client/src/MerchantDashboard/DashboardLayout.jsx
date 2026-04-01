import React, { useState } from 'react'
import Header from './Layout/Header'
import Dashboard from './Dashboard'
import UserPerformance from './UserPerformance'

const DashboardLayout = () => {


  return (
    <div className='bg-black '>
     <Header/>
     <Dashboard/>
     <UserPerformance/>
    </div>
  )
}

export default DashboardLayout