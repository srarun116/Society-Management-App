
// import React, { useState } from 'react';

// import './ResidentLayout.css';

// import { Outlet } from 'react-router-dom';
// import ResidentSidebar from '../ResidentSidebar/ResidentSidebar';
// import ResidentHeader from '../ResidentHeader/ResidentHeader';

// const ResidentLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="container-fluid  main-background">
//       <div className="row">
//         {/* Sidebar */}
//         <div
//           className={`sidebar ${isSidebarOpen ? 'd-block col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-2' : 'd-none d-lg-block col-lg-3 col-xl-3 col-xxl-2'
//             } border sidebar_height`}
//         >
//           <ResidentSidebar toggleSidebar={toggleSidebar} />
//         </div>

//         {/* Main content */}
//         <div
//           className={`main-content ${isSidebarOpen ? 'col-12 col-sm-12 col-md-12 col-xl-9 col-xxl-10' : 'col-12  col-lg-9 col-xl-9 col-xxl-10'
//             } sidebar_height`}
//         >
//           <ResidentHeader toggleSidebar={toggleSidebar} />

//           <div className='px-2 py-2' >
//             <Outlet />
//           </div>

//         </div>
//       </div>

//       {/* Overlay for small screens and medium screens when sidebar is open */}
//       {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
//     </div>
//   );
// };

// export default ResidentLayout;


// import React, { useState } from 'react';

// import './ResidentLayout.css';

// import { Outlet } from 'react-router-dom';
// import ResidentSidebar from '../ResidentSidebar/ResidentSidebar';
// import ResidentHeader from '../ResidentHeader/ResidentHeader';

// const ResidentLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="container-fluid main-background">
//       <div className="row">
//         {/* Sidebar */}
//         <div
//           className={`sidebar ${
//             isSidebarOpen
//               ? 'd-block col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-2'
//               : 'd-none d-lg-block col-lg-3 col-xl-3 col-xxl-2'
//           } border sidebar_height`}
//         >
//           <ResidentSidebar toggleSidebar={toggleSidebar} />
//         </div>

//         {/* Main content */}
//         <div
//           className={`main-content ${
//             isSidebarOpen
//               ? 'd-none'
//               : 'd-none d-lg-block col-lg-9 col-xl-9 col-xxl-10'
//           } sidebar_height`}
//         >
//           <ResidentHeader toggleSidebar={toggleSidebar} />

//           <div className="px-2 py-2">
//             <Outlet />
//           </div>
//         </div>
//       </div>

//       {/* Overlay for small screens and medium screens when sidebar is open */}
//       {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
//     </div>
//   );
// };

// export default ResidentLayout;


import React, { useState } from 'react';

import './ResidentLayout.css';

import { Outlet } from 'react-router-dom';
import ResidentSidebar from '../ResidentSidebar/ResidentSidebar';
import ResidentHeader from '../ResidentHeader/ResidentHeader';

const ResidentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container-fluid main-background">
      <div className="row">
        {/* Sidebar */}
        <div
          className={`sidebar ${
            isSidebarOpen
              ? 'd-block col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-2'
              : 'd-none d-lg-block col-lg-3 col-xl-3 col-xxl-2'
          } border sidebar_height`}
        >
          <ResidentSidebar toggleSidebar={toggleSidebar} />
        </div>

        {/* Main content */}
        <div
          className={`main-content ${
            isSidebarOpen
              ? 'd-none'
              : 'col-12 col-lg-9 col-xl-9 col-xxl-10'
          } sidebar_height`}
        >
          <ResidentHeader toggleSidebar={toggleSidebar} />

          <div className="px-2 py-2">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Overlay for small screens and medium screens when sidebar is open */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default ResidentLayout;
