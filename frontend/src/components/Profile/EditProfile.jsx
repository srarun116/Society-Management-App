import React, { useState } from 'react';
import './EditProfile.css'; // Custom styles if needed
import { FaRegEdit } from "react-icons/fa";

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Arlene',
    lastName: 'McCoy',
    phoneNumber: '+91 99130 44537',
    email: 'ArleneMcCoy25@gmail.com',
    society: 'Shantigram residency',
    state: 'Gujarat',
    country: 'India',
    city: 'Baroda',
  });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="container-fluid ">
      {/* Background Image Section */}
      <div className="d-flex position-relative justify-content-center mb-4">
        <img
          src="\Images\editpro1.jpeg"
          alt="Profile Background"
          className="img-fluid profile-background"
        />
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-warning text-white mb-5 edit-profile-btn" onClick={toggleEdit}>
        <FaRegEdit />
        {isEditing ? 'Update Profile' : 'Edit Profile'}
        </button>
      </div>
      
      {/* Profile Card */}
      <div className="profile-card shadow p-4 rounded bg-white col-lg-8 col-md-10 col-sm-12 mx-auto">
        <div className="row">
          <div className="img1 col-md-4 text-center mb-3">
            <img
              src="\Images\editpro2.jpeg"
              alt="Profile"
            width={"150px"}
            />
            <h5>{profile.firstName} {profile.lastName}</h5>
          </div>

          <div className="col-md-8">
            <form>
              <div className="row mb-3">
                <div className="col-sm-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={profile.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={profile.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <label>Select Society</label>
                  <input
                    type="text"
                    name="society"
                    className="form-control"
                    value={profile.society}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={profile.country}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-6">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    className="form-control"
                    value={profile.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="col-sm-6">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    value={profile.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
