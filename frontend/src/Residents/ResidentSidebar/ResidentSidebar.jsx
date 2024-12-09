
import React, { useState, useEffect } from "react";
import "./ResidentSidebar.css";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { TbMessageQuestion } from "react-icons/tb";
import { SiSpringsecurity } from "react-icons/si";
import { Collapse } from "react-bootstrap";
import { BiCalendarEvent } from "react-icons/bi";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";



const ResidentSidebar = ({ toggleSidebar }) => {
  const [isFinancialOpen, setIsFinancialOpen] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 992);

  // Update screen size dynamically
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleFinancialDropdown = () => {
    setIsFinancialOpen(!isFinancialOpen);
    setIsComplaintOpen(false);
  };

  const toggleComplaintDropdown = () => {
    setIsComplaintOpen(!isComplaintOpen);
    setIsFinancialOpen(false);
  };

  const handleSidebarItemClick = () => {
    // Only close the sidebar on smaller screens (<992px)
    if (!isLargeScreen) {
      toggleSidebar();
    }
  };

  return (
    <>
      <div className="row">
        {/* Close button for screens up to 767px */}
        <div className="col-12 d-lg-none text-end mt-2">
          <button className="btn close-btn" onClick={toggleSidebar}>
            <IoMdClose />
          </button>
        </div>

        <div className="col-md-12 mt-2 d-flex align-items-center justify-content-center flex-column">
          <img src="/Images/logo.png" height={70} className="pt-2" alt="Logo" />
        </div>
        <hr className="sidebar_logo_hr" />

        <div className="d-flex  flex-column ">
          <div className="d-flex flex-column align-items-start align-items-md-center ">
            <div className="col-md-11 mt-2 mb-2 background_color sidebar_link ">
              <NavLink to="/resident/dashboard" onClick={handleSidebarItemClick}>
                <p className="ps-2 font_color sidebar-item-styling">
                  <MdDashboard className="me-2 fs-4 font_color" /> Dashboard
                </p>
              </NavLink>
            </div>

            <div className="col-md-11 mt-2 mb-2 sidebar_link ">
              <NavLink to="/resident/personaldetails" onClick={handleSidebarItemClick}>
                <p className="ps-2 font_color sidebar-item-styling">
                  <BsFillPersonVcardFill className="me-2 fs-4 font_color" />
                  Personal Details
                </p>
              </NavLink>
            </div>

            <div className="col-md-11 mt-2 mb-2 sidebar_link">
              <NavLink to="/resident/serviceandcomplaint" onClick={handleSidebarItemClick}>
                <p className="ps-2 font_color sidebar-item-styling">
                  <TbMessageQuestion className="me-2 fs-4 font_color" />
                  {/* <img src="/Images/Resident-Service.png" className="me-2 fs-4 font_color sidebar_img" height={26}/> */}
                  Service And Complaints
                </p>
              </NavLink>
            </div>

            <div className="col-md-11 mt-2 mb-2 sidebar_link">
              <NavLink to="/resident/eventparticipation" onClick={handleSidebarItemClick}>
                <p className="ps-2 font_color sidebar-item-styling">
                  <BiCalendarEvent className="me-2 fs-4 font_color" />
                  Events Participations
                </p>
              </NavLink>
            </div>

            {/* Community Section */}
            <div className="col-md-11 mt-2 mb-2  financial_management_main">
              <div onClick={toggleFinancialDropdown} style={{ cursor: "pointer" }}>
                <div className="sidebar_link d-flex">
                  <p className="ms-2 font_color sidebar-item-styling" style={{
                    cursor: "pointer",
                    fontSize: "17px",
                    fontWeight: "500",
                  }}>
                    < IoPersonCircle className="me-2 fs-4 font_color" />
                   
                    Community
                  </p>
                  <img
                    className={`arrow ms-3 mt-1 ${isFinancialOpen ? "up" : ""}`}
                    src="\Images\arrow-down.png"
                    alt="Arrow"
                  />
                </div>
              </div>
              <Collapse in={isFinancialOpen} className="dropdown-main bg-white shadow p-3 rounded">
                <div>
                  <NavLink to="/resident/AccessForums"
                   onClick={handleSidebarItemClick}
                   className={({ isActive }) =>
                    `text-decoration-none d-flex  ${isActive ? "active-link" : "default-link"
                    }`
                  }
                   >
                    <p className="menu-item-resident font_color1 sidebar-item-styling">Access Forums</p>
                  </NavLink>
                  <NavLink to="/resident/Polls"
                   onClick={handleSidebarItemClick}
                   className={({ isActive }) =>
                    `text-decoration-none d-flex  ${isActive ? "active-link" : "default-link"
                    }`
                  }
                   >
                    <p className="menu-item-resident font_color1 sidebar-item-styling">Polls</p>
                  </NavLink>
                  <NavLink to="/resident/cd"
                   onClick={handleSidebarItemClick}
                   className={({ isActive }) =>
                    `text-decoration-none d-flex  ${isActive ? "active-link" : "default-link"
                    }`
                  }
                   >
                    <p className="menu-item-resident font_color1 sidebar-item-styling">Community Discussion</p>
                  </NavLink>
                </div>
              </Collapse>
            </div>

            {/* Payment Portal Section */}
            <div className="col-md-11 mt-2 mb-2  financial_management_main">
              <div onClick={toggleComplaintDropdown} style={{ cursor: "pointer" }}>
                <div className="sidebar_link d-flex">
                  <p className="ms-2 font_color sidebar-item-styling" style={{
                    cursor: "pointer",
                    fontSize: "17px",
                    fontWeight: "500",
                  }}>
                    <FaMoneyCheckDollar className="me-2 fs-4 font_color" />
                  
                    Payment Portal
                  </p>
                  <img
                    className={`arrow ms-3 mt-1 ${isComplaintOpen ? "up" : ""}`}
                    src="\Images\arrow-down.png"
                    alt="Arrow"
                  />
                </div>
              </div>
              <Collapse in={isComplaintOpen} className="dropdown-main bg-white shadow p-3 rounded">
                <div>
                  <NavLink to="/resident/maintananceinvoice"
                    onClick={handleSidebarItemClick}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex  ${isActive ? "active-link" : "default-link"
                      }`
                    }
                  >
                    <p className="menu-item-resident font_color1 sidebar-item-styling">Maintanance Invoice</p>
                  </NavLink>
                  <NavLink to="/resident/OtherIncomeInvoice"
                   onClick={handleSidebarItemClick}
                   className={({ isActive }) =>
                    `text-decoration-none d-flex  ${isActive ? "active-link" : "default-link"
                    }`
                  }
                   >
                    <p className="menu-item-resident font_color1 sidebar-item-styling">Other Invoice</p>
                  </NavLink>
                </div>
              </Collapse>
            </div>

            <div className="col-md-11 mt-2 mb-2 sidebar_link ">
              <NavLink to="/resident/residentsecurityprotocols" onClick={handleSidebarItemClick}>
                <p className="ps-2 font_color sidebar-item-styling">
                  <SiSpringsecurity className="me-2 fs-4 font_color" />
                  
                  Security Protocol
                </p>
              </NavLink>
            </div>
          </div>

          <div className="row ">
            <div className="col-12 col-lg-1 mt-1 mb-1 ms-3  mx-auto position-fixed bottom-0">
              <NavLink to="/login" onClick={toggleSidebar}>
                <p className='ps-1 logout-style'> <img src='/Images/logout.png' /> Logout</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResidentSidebar;

