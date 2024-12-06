
import React, { useState } from "react";
import "./ResidentSidebar.css";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { TbMessage2Cancel, TbMessageQuestion } from "react-icons/tb";
import { SiSpringsecurity } from "react-icons/si";
import { Collapse } from "react-bootstrap";
import { BiCalendarEvent } from "react-icons/bi";

import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const ResidentSidebar = ({ toggleSidebar }) => {
  const [isFinancialOpen, setIsFinancialOpen] = useState(false);
  
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);

  const toggleFinancialDropdown = () => {
    setIsFinancialOpen(!isFinancialOpen);
    setIsSecurityOpen(false);
    setIsComplaintOpen(false);
  };


  const toggleComplaintDropdown = () => {
    setIsComplaintOpen(!isComplaintOpen);
    setIsFinancialOpen(false);
    setIsSecurityOpen(false);
  };

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
          <img src="/Images/logo.png" height={70} className="pt-2" alt="Logo" />
        </div>
        <hr className="sidebar_logo_hr" />

        <div className="d-flex justify-content-start flex-column ">
          <div className="d-flex flex-column">
            <div className="col-md-11 mt-2 mb-2  background_color sidebar_link mx-auto">
              <NavLink to="/resident" onClick={toggleSidebar}>
                <p className="ps-2 font_color">
                  <MdDashboard className="me-2 fs-4 font_color" /> Dashboard
                </p>
              </NavLink>
            </div>

            <div className="col-md-11 mt-2 mb-2  sidebar_link mx-auto">
              <NavLink to="/resident/personaldetails" onClick={toggleSidebar}>
                <p className="ps-2 font_color">
                  <BsFillPersonVcardFill className="me-2 fs-4 font_color" />
                  Personal Details
                </p>
              </NavLink>
            </div>

            <div className="col-md-11 mt-2 mb-2  sidebar_link mx-auto">
              <NavLink
                to="/resident/serviceandcomplaint"
                onClick={toggleSidebar}
              >
                <p className="ps-2 font_color">
                  <TbMessageQuestion className="me-2 fs-4 font_color" />
                  Service And Complaints
                </p>
              </NavLink>
            </div>

            <div className="col-md-11 mt-2 mb-2  sidebar_link mx-auto">
              <NavLink
                to="/resident/eventparticipation"
                onClick={toggleSidebar}
              >
                <p className="ps-2 font_color">
                  <BiCalendarEvent className="me-2 fs-4 font_color" />
                  Events Participations
                </p>
              </NavLink>
            </div>

            <div className="col-md-11 mt-2 mb-2   mx-auto financial_management_main">
              <div
                onClick={toggleFinancialDropdown}
                style={{ cursor: "pointer" }}
              >
                <div className="sidebar_link  d-flex">
                  <p
                    style={{
                      cursor: "pointer",
                      fontSize: "17px",
                      fontWeight: "500",
                    }}
                    className="ms-2  font_color"
                  >
                    <BiCalendarEvent className="me-2 fs-4 font_color" />
                    Community
                  </p>
                  {/* Use arrow class directly on the img element */}
                  <img
                    className={`arrow ms-3 mt-1 ${isFinancialOpen ? "up" : ""}`}
                    src="\Images\arrow-down.png"
                    alt="Arrow"
                  />
                </div>
              </div>
              <Collapse
                in={isFinancialOpen}
                className="dropdown-main bg-white shadow p-3 rounded"
              >
                <div>
                  {/* Access Forums */}
                  <NavLink
                    to="/resident/AccessForums"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex  ${
                        isActive ? "active-link" : "default-link"
                      }`
                    }
                  >
                    <p className="menu-item-resident font_color1 ">Access Forums</p>
                  </NavLink>

                  <NavLink
                    to="/resident/Polls"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex ${
                        isActive ? "active-link" : "default-link"
                      }`
                    }
                  >
                    <p className="menu-item-resident font_color1">Polls</p>
                  </NavLink>

                  <NavLink
                    to="/resident/cd"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex ${
                        isActive ? "active-link" : "default-link"
                      }`
                    }
                  >
                    <p className="menu-item-resident font_color1">
                      Community Discussion
                    </p>
                  </NavLink>
                </div>
              </Collapse>
            </div>

            <div className="col-md-11 mt-2 mb-2   mx-auto financial_management_main">
              <div
                onClick={toggleComplaintDropdown}
                style={{ cursor: "pointer" }}
              >
                <div className="sidebar_link  d-flex">
                  <p
                    style={{
                      cursor: "pointer",
                      fontSize: "17px",
                      fontWeight: "500",
                    }}
                    className="ms-2  font_color"
                  >
                    <FaMoneyCheckDollar className="me-2 fs-4 font_color" />
                    Payment Portal
                  </p>
                  {/* Use arrow class directly on the img element */}
                  <img
                    className={`arrow ms-3 mt-1 ${isComplaintOpen ? "up" : ""}`}
                    src="\Images\arrow-down.png"
                    alt="Arrow"
                  />
                </div>
              </div>
              <Collapse
                in={isComplaintOpen}
                className="dropdown-main bg-white shadow p-3 rounded"
              >
                <div>
                  {/* Access Forums */}
                  <NavLink
                    to="/resident/maintananceinvoice"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex  ${
                        isActive ? "active-link" : "default-link"
                      }`
                    }
                  >
                    <p className="menu-item-resident font_color1 ">Maintance Invoice</p>
                  </NavLink>

                  <NavLink
                    to="/resident/OtherIncomeInvoice"
                    onClick={toggleSidebar}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex ${
                        isActive ? "active-link" : "default-link"
                      }`
                    }
                  >
                    <p className="menu-item-resident font_color1">Other Invoice</p>
                  </NavLink>
                </div>
              </Collapse>
            </div>

            <div className="col-md-11 mt-2 mb-2  sidebar_link mx-auto">
              <NavLink to="/resident/securityprotocols" onClick={toggleSidebar}>
                <p className="ps-2 font_color">
                  <SiSpringsecurity className="me-2 fs-4 font_color" /> Security
                  Protocol
                </p>
              </NavLink>
            </div>
            
          </div>

          <div className="row ">
            <div className="col-12 col-lg-1 mt-1 mb-1 ms-3  mx-auto position-fixed bottom-0">
              <NavLink to="/login" onClick={toggleSidebar}>
                <p className="ps-1 logout-style">
                  {" "}
                  <img src="/Images/logout.png" /> Logout
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResidentSidebar;
