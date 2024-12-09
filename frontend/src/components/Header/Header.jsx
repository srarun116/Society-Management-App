
import React, { useState , useEffect} from 'react';
import './Header.css';
import axios from 'axios';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";

const Header = ({ toggleSidebar }) => {

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    role: ''
  });
  
  const API_URL = 'http://localhost:4000/api/userProfile';

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log(token)
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(API_URL, config);
        setProfile({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          role: data.role || ''
         
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const [notifications, setNotifications] = useState([
    {
      title: "Maintenance (A-101)",
      time: "Tuesday 11:41 AM",
      message: "Evelyn Harper gave a Maintenance of 1000 rupees.",
      type: "notification2",
      actions: true,
      timestamp: "2 days ago",
    },
    {
      title: "Maintenance (A-101)",
      time: "Tuesday 11:41 AM",
      message: "Evelyn Harper gave a Maintenance of 1000 rupees.",
      type: "notification3",
      actions: true,
      timestamp: "2 days ago",
    },
    {
      title: "Ganesh Chaturthi (A-101)",
      time: "Saturday 11:41 AM",
      message: "Per Person Amount: ₹ 1,500",
      p: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesha in Our Resident.",
      type: "notification4",
      actions: true,
      timestamp: "2 days ago",
    },
    {
      title: "Update Maintenance",
      time: "32 Minutes ago",
      message: "Maintenance Amount: ₹ 1,500\nMaintenance Penalty: ₹ 350",
      type: "notification3",
      actions: false,
      timestamp: "32 Minutes ago",
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  return (
    <>
      <div className="header-main ">
        <nav className="navbar navbar-expand-lg bg-white navbar_main">
          <div className="container-fluid d-flex align-items-center justify-content-between mt-1">
            {/* Hamburger Icon (Mobile Only) */}
            <div className="d-lg-none">
              <button className="btn" onClick={toggleSidebar}>
                <RxHamburgerMenu size={24} />
              </button>
            </div>

            {/* Search Section */}
            <div className="d-flex align-items-center flex-grow-1">
              {/* Search Bar for Large Screens */}
              <div className="d-none d-md-block ">
                <div className="input-group">
                  <span className="input-group-text bg-white border" style={{ maxHeight: "37.5px" }}>
                    <FiSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Search Here"
                    aria-label="Search"
                  />
                </div>
              </div>
            </div>

            {/* Right Section: Search Icon (Mobile) + Notifications + Profile */}
            <div className="d-flex align-items-center gap-3">
              {/* Search Icon for Mobile Screens */}
              <div className="d-block d-md-none">
                <button className="btn">
                  <FiSearch size={24} />
                </button>
              </div>

             
            <div className="d-flex ">
              {/* Notification Icon */}
              <button
                className="btn position-relative p-0"
                onClick={toggleNotifications}
              >
                <img
                  src="/Images/Notification.png"
                  alt="Notifications"
                  className="img-fluid"
                />
                {notifications.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification Popup */}
              {showNotifications && (
                <div
                  className="notification-dropdown position-absolute bg-white border rounded shadow p-3  "
                  style={{
                    right: "60px",
                    top: "60px",
                    width: "00px",
                    zIndex: 1000,
                    maxHeight: "600px", // Set maximum height
                    overflowY: "auto",  // Enable vertical scrollbar
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Notification</h6>
                    <button
                      className="btn btn-link text-decoration-none"
                      onClick={clearNotifications}
                    >
                      Clear All
                    </button>
                  </div>
                  <ul className="list-unstyled ">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <li key={index} className="notification-item  py-3 border-bottom ">
                          <div className=" notification-img d-flex">
                            {/* Use the notification2.png image */}
                            <img
                              src={`/Images/${notification.type}.png`} // Points to notification2.png
                              alt={notification.type}
                              className="notification-img"
                              width={40}
                              height={40}
                            />

                            <div className=" flex-grow-1 px-2">
                              <h6 className="mb-1 text-start" >{notification.title}</h6>
                              <small className="text-muted d-block mt-2" style={{ fontSize: "12px" }}>{notification.time}</small>
                              <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>{notification.message}</p>
                              <p className="mb-1 text-muted" style={{ fontSize: "14px" }}>{notification.p}</p>
                              {notification.actions && (
                                <div className="d-flex gap-2">
                                  <button className="btn border text-decoration-none text-dark btn-sm">Accept</button>
                                  <button className="btn border text-decoration-none text-white btn-sm" style={{ backgroundColor: " #5678E9" }}>Decline</button>
                                </div>
                              )}
                            </div>
                          </div>
                          <small className="text-muted float-end " style={{ marginTop: "-8px" }}>{notification.timestamp}<IoCheckmarkDoneOutline className='ms-1' />
                          </small>
                        </li>
                      ))
                    ) : (
                      <li className="text-muted">No new notifications</li>
                    )}
                  </ul>

                </div>
              )}
         </div>
              {/* User Profile */}
              <div className="dropdown d-flex align-items-center">
                <Link to="./EditProfile">
                  <button
                    className="btn btn-light dropdown-toggle d-flex align-items-center"
                    type="button"
                    aria-expanded="false"
                  >
                    {/* Profile Image (Mobile and Large Screen) */}
                    <img
                      src="/Images/Profileimg.png"
                      alt="User"
                      className="rounded-circle me-2 img-fluid"
                      width="40"
                      height="40"
                    />
                    {/* Profile Name and Role (Large Screen Only) */}
                    <div className="d-none d-md-block">
                      <span>{profile.firstName} {profile.lastName} </span>
                      <br />
                      <small className="text-muted">Admin</small>
                    </div>
                  </button>
                </Link>
              </div>

              
            </div>
          </div>
        </nav>

        {/* Notification Popup */}
     {/* Notification Popup */}
    
      </div>
    </>
  );
};

export default Header;

