import React from 'react'
import { Outlet } from 'react-router-dom'
import "./SecurityMain.css"

const SecurityMain = () => {
  return (
    <>
    <div className='financial-management-wrapper-main'>
        <Outlet />
      </div>
    </>
  )
}

export default SecurityMain