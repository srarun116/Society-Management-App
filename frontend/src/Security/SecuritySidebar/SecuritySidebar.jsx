import React, { useState } from 'react';
import "../../components/Sidebar/Sidebar.css"
import { NavLink } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { AiOutlineSecurityScan } from "react-icons/ai";
import { Collapse } from 'react-bootstrap';


const SecuritySidebar = ({ toggleSidebar }) => {

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
        <div className="col-12  d-lg-none text-end mt-2">
          <button className="btn close-btn" onClick={toggleSidebar}>
            <IoMdClose />
          </button>
        </div>

        <div className="col-md-12 mt-2 d-flex align-items-center justify-content-center flex-column">
          <img src='/Images/logo.png' height={70} className='pt-2' alt="Logo" />
        </div>
        <hr className='sidebar_logo_hr'/>

      <div className='d-flex justify-content-start flex-column '>  
       <div className='d-flex flex-column'>  
        

      


      

        

        
          <div className="col-md-11 mt-2 mb-2   mx-auto financial_management_main">
          <div onClick={toggleComplaintDropdown} style={{ cursor: 'pointer' }}>
            <div className="sidebar_link  d-flex">
              <p
                style={{
                  cursor: 'pointer',
                  fontSize: '17px',
                  fontWeight: '500',
                }}
                className="ms-2  font_color security-pages-styling"
              >
              <AiOutlineSecurityScan className='me-2 fs-4 font_color ' /> Security
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
                to="/Security/VisitorTracking"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `text-decoration-none d-flex  ${isActive ? "active-link" : "default-link"}`
                }
              >
                <p className="menu-item-security  security-pages-styling">Visotor Tracking</p>
              </NavLink>

              <NavLink
                to="/Security/EmergencyManagement"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  `text-decoration-none d-flex ${isActive ? "active-link" : "default-link"}`
                }
              >
                <p className="menu-item-security  security-pages-styling">Emergency Management</p>
              </NavLink>

            </div>
          </Collapse>

        </div>


       
        


        
      </div>

       <div className="row ">
       <div className="col-12 col-lg-1 mt-1 mb-1 ms-3  mx-auto position-fixed bottom-0">
          <NavLink to="/login" onClick={toggleSidebar}>
            <p className='ps-1 logout-style'> <img src='/Images/logout.png'/> Logout</p>
          </NavLink>
        </div>
       </div>
       

        </div>
       
      </div>
    </>
  )
}

export default SecuritySidebar