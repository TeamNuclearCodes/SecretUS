import React from 'react'
import { Sidebar } from '../components/sidebar'
import { Outlet } from 'react-router-dom'

const Base = () => {
  return (
    <div>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Base