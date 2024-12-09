
import React, { useState } from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa";
import { TbMessage2Cancel } from "react-icons/tb";
import { AiFillSecurityScan } from "react-icons/ai";
import { SiSpringsecurity } from "react-icons/si";
import { GrAnnounce } from "react-icons/gr";
import { Collapse } from 'react-bootstrap';


const Sidebar = ({ toggleSidebar }) => {
  const [isFinancialOpen, setIsFinancialOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);

  const toggleFinancialDropdown = () => {
    setIsFinancialOpen(!isFinancialOpen);
    setIsSecurityOpen(false);
    setIsComplaintOpen(false);
  };

  const toggleSecurityDropdown = () => {
    setIsSecurityOpen(!isSecurityOpen);
    setIsComplaintOpen(false);
    setIsFinancialOpen(false);
  }

  const toggleComplaintDropdown = () => {
    setIsComplaintOpen(!isComplaintOpen);
    setIsFinancialOpen(false);
    setIsSecurityOpen(false);

  }

  return (
    <>
      <div className="row">
        {/* Close button for screens up to 767px */}
        <div className="col-12  d-xl-none text-end mt-2">
          <button className="btn close-btn" onClick={toggleSidebar}>
            <IoMdClose />
          </button>
        </div>

        <div className="col-md-12 mt-2 d-flex align-items-center justify-content-center flex-column">
          <img src='/Images/logo.png' height={70} className='pt-2' alt="Logo" />
        </div>
        <hr className='sidebar_logo_hr' />

        <div className='d-flex justify-content-start flex-column '>
          <div className='d-flex flex-column'>
            <div className="col-md-11 mt-2 mb-2  background_color sidebar_link mx-auto">
              <NavLink to="/admin/dashboard" onClick={toggleSidebar}>
                <p className='ps-2 sidebar-item-styling' ><MdDashboard className='me-2 fs-4 font_color ' /> Dashboard</p>
              </NavLink>
            </div>

            <div className="col-md-11 mt-2 mb-2  sidebar_link mx-auto">
              <NavLink to="/admin/ResidentManagement" onClick={toggleSidebar}>
                <p className='ps-2 sidebar-item-styling'><IoMdPerson className='me-2 fs-4 font_color' />Resident Management</p>
              </NavLink>
            </div>


            <div className="col-md-11 mt-2 mb-2   mx-auto financial_management_main">
              <div onClick={toggleFinancialDropdown} style={{ cursor: 'pointer' }}>
                <div className="sidebar_link  d-flex">
                  <p
                    style={{
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                    className="ms-2  font_color sidebar-item-styling"
                  >
                    <RiMoneyDollarBoxFill className='me-2 fs-4 font_color' />
                    Financial Management
                  </p>
                  {/* Use arrow class directly on the img element */}
                  <img
                    className={`arrow ms-3 mt-1 ${isFinancialOpen ? 'up' : ''}`}
                    src="\Images\arrow-down.png"
                    alt="Arrow"
                  />
                </div>
              </div>
              <Collapse in={isFinancialOpen} className="dropdown-main bg-white shadow p-3 rounded">
                <div>
                  {/* Access Forums */}
                  <NavLink
                    to="/admin/FinancialManagement/Income"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex  ${isActive ? "active-link" : "default-link"}`
                    }
                  >
                    <p className="menu-item font_color1 sidebar-item-styling">Income</p>
                  </NavLink>

                  <NavLink
                    to="/admin/FinancialManagement/Expense"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex ${isActive ? "active-link" : "default-link"}`
                    }
                  >
                    <p className="menu-item font_color1 sidebar-item-styling">Expense</p>
                  </NavLink>

                  <NavLink
                    to="/admin/FinancialManagement/Note"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex ${isActive ? "active-link" : "default-link"}`
                    }
                  >
                    <p className="menu-item font_color1 sidebar-item-styling">Note</p>
                  </NavLink>

                </div>
              </Collapse>

            </div>

            <div className="col-md-11 mt-2 mb-2  sidebar_link mx-auto">
              <NavLink to="/admin/FacilityManagement" onClick={toggleSidebar}>
                <p className='ps-2 sidebar-item-styling'><FaBuilding className='me-2 fs-4 font_color' /> Facility Management</p>
              </NavLink>
            </div>


            <div className="col-md-11 mt-2 mb-2   mx-auto financial_management_main">
              <div onClick={toggleComplaintDropdown} style={{ cursor: 'pointer' }}>
                <div className="sidebar_link  d-flex">
                  <p
                    style={{
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                    className="ms-2  font_color sidebar-item-styling"
                  >
                    <TbMessage2Cancel className='me-2 fs-4 font_color' /> Complaint Tracking
                  </p>
                  {/* Use arrow class directly on the img element */}
                  <img
                    className={`arrow ms-3 mt-1 ${isComplaintOpen ? 'up' : ''}`}
                    src="\Images\arrow-down.png"
                    alt="Arrow"
                  />
                </div>
              </div>
              <Collapse in={isComplaintOpen} className="dropdown-main bg-white shadow p-3 rounded">
                <div>
                  {/* Access Forums */}
                  <NavLink
                    to="/admin/ComplaintTracking/CreateComplaint"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex  ${isActive ? "active-link" : "default-link"}`
                    }
                  >
                    <p className="menu-item font_color1 sidebar-item-styling">Create Complaint</p>
                  </NavLink>

                  <NavLink
                    to="/admin/ComplaintTracking/RequestTracking"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex ${isActive ? "active-link" : "default-link"}`
                    }
                  >
                    <p className="menu-item font_color1 sidebar-item-styling">Request Tracking</p>
                  </NavLink>

                </div>
              </Collapse>

            </div>



            <div className="col-md-11 mt-2 mb-2   mx-auto financial_management_main">
              <div onClick={toggleSecurityDropdown} style={{ cursor: 'pointer' }}>
                <div className="sidebar_link  d-flex">
                  <p
                    style={{
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                    className="ms-2  font_color sidebar-item-styling"
                  >
                    <AiFillSecurityScan className='me-2 fs-4 font_color' /> Security Management
                  </p>
                  {/* Use arrow class directly on the img element */}
                  <img
                    className={`arrow ms-3 ${isSecurityOpen ? 'up' : ''}`}
                    src="\Images\arrow-down.png"
                    alt="Arrow"
                  />
                </div>
              </div>
              <Collapse in={isSecurityOpen} className="dropdown-main bg-white shadow p-3 rounded">
                <div>
                  {/* Access Forums */}
                  <NavLink
                    to="/admin/SecurityManagement/VisitorLogs"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex  ${isActive ? "active-link" : "default-link"}`
                    }
                  >
                    <p className="menu-item font_color1 sidebar-item-styling">Visitor Logs</p>
                  </NavLink>

                  <NavLink
                    to="/admin/SecurityManagement/SecurityProtocols"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex ${isActive ? "active-link" : "default-link"}`
                    }
                  >
                    <p className="menu-item font_color1 sidebar-item-styling">Security Protocols</p>
                  </NavLink>

                </div>
              </Collapse>

            </div>

            <div className="col-md-11 mt-2 mb-2  sidebar_link mx-auto">
              <NavLink to="/admin/SecurityGuard" onClick={toggleSidebar}>
                <p className='ps-2 sidebar-item-styling'><SiSpringsecurity className='me-2 fs-4 font_color ' /> Security Guard</p>
              </NavLink>
            </div>

            <div className="col-md-11 mt-2 mb-2  sidebar_link mx-auto">
              <NavLink to="/admin/Announcement" onClick={toggleSidebar}>
                <p className='ps-2 sidebar-item-styling'><GrAnnounce className='me-2 fs-4 font_color' /> Announcement</p>
              </NavLink>
            </div>
          </div>

          <div className="row ">
            <div className="col-12 col-lg-1 mt-1 mb-1 ms-3  mx-auto position-fixed bottom-0">
              <NavLink to="/login" onClick={toggleSidebar}>
                <p className='ps-1 sidebar-item-styling logout-style'> <img src='/Images/logout.png' /> Logout</p>
              </NavLink>
            </div>
          </div>


        </div>

      </div>
    </>
  );
};

export default Sidebar;
