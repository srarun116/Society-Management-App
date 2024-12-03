
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProfile.css';
import { FaRegEdit } from "react-icons/fa";

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    society: '',
    country: '',
    state: '',
    city: '',
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
          phoneNumber: data.phoneNumber || '',
          email: data.email || '',
          society: data.society || '',
          country: data.country || '',
          state: data.state || '',
          city: data.city || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);



  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const toggleEdit = (e) => {
    e.preventDefault();
    console.log("Toggling edit mode. Current state:", isEditing);
    setIsEditing(!isEditing);
  };



  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken'); // Assuming token is stored in localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.put(API_URL, profile, config);
      setProfile(data); // Update the profile with the new data
      setIsEditing(false); // Exit edit mode
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

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
   

      {/* Profile Card */}
      <div className="profile-card shadow p-4 rounded bg-white col-lg-8 col-md-10 col-sm-12 mx-auto">
        <div className="row">
          <div className="img1 col-md-4 text-center mb-3">
            <img src="\Images\editpro2.jpeg" alt="Profile" width="150px" />
            <h5>{profile.firstName} {profile.lastName}</h5>
          </div>

          <div className="col-md-8">
            <form onSubmit={handleUpdateProfile}>
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

              {/* Edit and Save Buttons */}
              <div className="text-end mt-3">
                {!isEditing ? (
                  <button
                    type="button" // Prevent form submission
                    className="btn edit-profile-btn text-white"
                    onClick={toggleEdit} // Toggle edit mode
                  >
                    <FaRegEdit className='edit_profile_icon' />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    type="submit" // Submit the form
                    className="btn btn-success text-white"
                  >
                    Save Profile
                  </button>
                )}
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
