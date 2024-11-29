
import React from 'react';
import { Outlet } from 'react-router-dom';
import "./FinanceManagement.css"


const FinanceManagement = () => {


  return (
    <>
      <div className='financial-management-wrapper-main p-2'>
        <Outlet />
      </div>
    </>
  );
};

export default FinanceManagement;



