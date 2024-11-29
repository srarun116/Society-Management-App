import React from 'react'
import "./SecurityManagement.css"
import { Outlet } from 'react-router-dom'

const SecurityManagement = () => {
  return (
    <>
      <div className='financial-management-wrapper-main'>
        <Outlet />
      </div>
    </>
  )
}

export default SecurityManagement