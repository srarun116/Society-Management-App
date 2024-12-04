import React, { useState } from 'react';
import "../../components/Layout/Layout.css"
import SecuritySidebar from '../SecuritySidebar/SecuritySidebar'
import SecurityHeader from '../SecurityHeader/SecurityHeader'
import { Outlet } from 'react-router-dom'

const SecurityLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
     <div className="container-fluid  main-background">
      <div className="row">
        {/* Sidebar */}
        <div
          className={`sidebar ${isSidebarOpen ? 'd-block col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-2' : 'd-none d-lg-block col-lg-3 col-xl-3 col-xxl-2'
            } border sidebar_height`}
        >
          <SecuritySidebar toggleSidebar={toggleSidebar} />
        </div>

        {/* Main content */}
        <div
          className={`main-content ${isSidebarOpen ? 'col-12 col-sm-12 col-md-12 col-xl-9 col-xxl-10' : 'col-12  col-lg-9 col-xl-9 col-xxl-10'
            } sidebar_height`}
        >
          <SecurityHeader toggleSidebar={toggleSidebar} />

          <div className='px-2 py-2' >
            <Outlet />
          </div>

        </div>
      </div>

      {/* Overlay for small screens and medium screens when sidebar is open */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
    </>
  )
}

export default SecurityLayout