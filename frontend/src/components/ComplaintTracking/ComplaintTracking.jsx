import React from 'react'
import "./ComplaintTracking.css"
import { Outlet } from 'react-router-dom'

const ComplaintTracking = () => {
  return (
    <>
      <div className='financial-management-wrapper-main'>
        <Outlet />
      </div>
    </>
  )
}

export default ComplaintTracking