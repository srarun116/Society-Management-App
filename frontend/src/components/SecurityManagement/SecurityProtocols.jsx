import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import "./SecurityProtocol.css";
import axios from 'axios';
import { RiEditBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { GrView } from 'react-icons/gr';
import moment from 'moment';
import { FaStarOfLife } from 'react-icons/fa';


const API_URL = 'http://localhost:4000/api/security-protocols';

const SecurityProtocols = () => {

  const [protocol, setProtocol] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentProtocolIndex, setCurrentProtocolIndex] = useState(null);
  const [viewProtocol, setViewProtocol] = useState(null); // State for the selected expense to view
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  // Function to fetch security guards
  const fetchSecurityProtocol = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setProtocol(response.data);
    } catch (error) {
      console.error("Error fetching Security Guard:", error);
    }
  };


  useEffect(() => {
    fetchSecurityProtocol(); // Fetch data on component mount
  }, []);

  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    const meridiem = isPM ? "PM" : "AM";
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${meridiem}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };

      if (isEditing) {
        // Editing an Security Protocol
        const response = await axios.put(`${API_URL}/${protocol[currentProtocolIndex]._id}`, form, config);
        const updatedProtocol = [...protocol];
        updatedProtocol[currentProtocolIndex] = response.data;
        setProtocol(updatedProtocol);
      } else {
        // Creating a new Security Protocol
        const response = await axios.post(API_URL, form, config);
        setProtocol(prevProtocol => [...prevProtocol, response.data]);

      }

      // Re-fetch data to ensure state sync
      await fetchSecurityProtocol();

      // Reset the form and close modal
      setForm({ title: '', description: '', date: '', time: '' });
      setIsEditing(false);
      setCurrentProtocolIndex(null);

    } catch (error) {
      console.error("Error saving securityProtocol:", error);
    }
  };


  const handleCancel = () => {
    setForm({ title: '', description: '', date: '', time: '' });
    setIsEditing(false);
    setCurrentProtocolIndex(null);
  };


  //  Edit data value in input field
  const handleEdit = (index) => {
    const selectedProtocol = protocol[index];

    // Format the date to 'YYYY-MM-DD' for the date input
    const formattedDate = moment(selectedProtocol.date).format('YYYY-MM-DD');

    setForm({
      ...selectedProtocol,
      date: formattedDate, // Set the formatted date
    });

    setIsEditing(true);
    setCurrentProtocolIndex(index);
  };

  // Function to format date in MM/DD/YY format
  const formattedDate = (dateString) => {
    const date = new Date(dateString); // Parse the database date
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
    });
  };


  const handleView = (index) => {
    setViewProtocol(protocol[index]); // Set the selected expense to view
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };

      const deleteId = protocol[deleteIndex]._id; // Get the correct ID from the selected security protocol
      const response = await axios.delete(`${API_URL}/${deleteId}`, config);

      // Log success
      console.log("Security Protocol deleted successfully:", response.data);

      // Update the UI by removing the deleted security protocol from the list
      setProtocol(protocol.filter((_, index) => index !== deleteIndex));

      // Re-fetch data to ensure state sync
      await fetchSecurityProtocol();

      // Close the modal and reset delete index
      setShowDeleteModal(false);
      setDeleteIndex(null);
    } catch (error) {
      // Log the error details
      console.error("Error deleting security protocol:", error.response ? error.response.data : error.message);

      // Optionally, show a message to the user if deletion fails
      alert("Failed to delete Security Protocol. Please check the console for details.");
    }

  };
  return (
    <>
      <div className="container-fluid border main-content-wrapper ">
        <div className="row">
          <div className="col-12">

            <div className="row mx-2 d-flex justify-content-between align-items-center mb-2">
              <div className="col-lg-2 pt-3 pb-3">
                <h4 className='fw-bold admin-pages-styling'>Security Protocols</h4>
              </div>

              <div className="col-lg-3 d-flex justify-content-end align-items-center pt-3 ">
                <button
                  className="pt-2 pb-2 px-3 add_protocol_btn admin-pages-styling"
                  data-bs-toggle="modal"
                  data-bs-target="#addProtocolModal"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({ title: '', description: '', date: '', time: '' });
                  }}
                >
                  Create Protocol
                </button>
              </div>
            </div>

            <div className="row border mx-2 mb-2 add_expense_heading">
              <div className="col-2 py-2"><h6 className="text-start admin-pages-styling">Title</h6></div>
              <div className="col-4 py-2"><h6 className="text-start admin-pages-styling">Description</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling">Date</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling">Time</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling">Action</h6></div>
            </div>

            {protocol.map((protocol, index) => (
              <div className="row mt-2 mx-2" key={index}>
                <div className="col-2 py-2"><p>{protocol.title}</p></div>
                <div className="col-4 py-2"><p>{protocol.description}</p></div>
                <div className="col-2 py-2"><p className="text-center">{moment(protocol.date).format('DD/MM/YYYY')}</p></div>
                <div className="col-2 py-2 d-flex justify-content-center"><p className="text-center amount-column protocol_time_data">{formatTime(protocol.time)}</p></div>

                <div className="col-2 py-2 d-flex gap-3 justify-content-center action_btn_main">
                 
                  <img src="/Images/Edit_btn.png" onClick={() => handleEdit(index)} data-bs-toggle="modal"   data-bs-target="#addProtocolModal" height={40} />
                
                  <img src="/Images/View_btn.png"  onClick={() => handleView(index)}   data-bs-toggle="modal"  data-bs-target="#viewProtocolModal" height={40}/>

                  <img src="/Images/Delete_btn.png"  onClick={() => handleDeleteClick(index)}  data-bs-toggle="modal"  data-bs-target="#deleteProtocolModal" height={40} />
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Updated Add Security Protocol Modal */}
      <div className="modal  fade" id="addProtocolModal" tabIndex="-1" aria-labelledby="addProtocolModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header">
              <h5 className="modal-title admin-pages-styling" id="addProtocolModalLabel">
                {isEditing ? 'Edit Security Protocols' : 'Security Protocols'}
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSave}> {/* Add onSubmit here */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label admin-pages-styling">Title <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="title" placeholder="Enter Title" value={form.title} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label admin-pages-styling">Description <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="description" placeholder="Enter Description" value={form.description} onChange={handleInputChange} required />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="date" className="form-label admin-pages-styling">Date <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                    <div className="input-group">
                      <input type="date" className="form-control" name="date" value={form.date} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="time" className="form-label admin-pages-styling">Time <FaStarOfLife className='star_icon_modal mb-2' /></label>
                    <input type="time" className="form-control " name="time" value={form.time} onChange={handleInputChange} required />
                  </div>
                </div>


                {/* Modal Footer */}

                <div className="row mt-4 px-0 ">
                  <div className="col-6 ">
                    <button
                      type="button"
                      className="btn btn-outline-secondary expense_cancel_btn_modal py-2  me-2"
                      data-bs-dismiss="modal"
                      onClick={handleCancel}

                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6   ">

                    <button
                      type="submit" // Change button type to submit
                      className="btn  save_btn "
                      data-bs-dismiss="modal"
                    >
                      {isEditing ? 'Update' : 'Save'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* View Security Protocol Modal */}
      <div className="modal fade" id="viewProtocolModal" tabIndex="-1" aria-labelledby="viewProtocolModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header  mb-0">
              <h5 className="modal-title admin-pages-styling" id="viewProtocolModalLabel "> View Security Protocol</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <hr className="no-margin-hr" />


            <div className="modal-body mt-0">
              {viewProtocol && (
                <div>
                  <div className="col-12">
                    <p className='admin-pages-styling'><strong className='viewPageLabel admin-pages-styling'>Title </strong><br /> {viewProtocol.title}</p>
                  </div>

                  <p className='admin-pages-styling'><strong className='viewPageLabel admin-pages-styling'>Description</strong> <br />{viewProtocol.description}</p>
                  <div className='d-flex '>
                    <div className="col-5">
                      <p className='admin-pages-styling'><strong className='viewPageLabel admin-pages-styling'>Date</strong><br /> {formattedDate(viewProtocol.date)}</p>
                    </div>
                    <div className="col-5">
                      <p className='admin-pages-styling'><strong className='viewPageLabel admin-pages-styling'>Time</strong> <br />  {viewProtocol.time} </p>
                    </div>

                  </div>


                </div>
              )}
            </div>

          </div>
        </div>
      </div>


      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteProtocolModal"
        tabIndex="-1"
        aria-labelledby="deleteProtocolModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal ">
            <div className="modal-header delete_expense_border">
              <h5 className="modal-title delete_expense_title" id="deleteProtocolModalLabel">Delete Protocol?</h5>
            </div>
            <hr className="no-margin-hr" />

            <div className="modal-body">
              <p className='delete_para'>Are you sure you want to delete this?</p>
            </div>
            <div className="modal-footer">
              <div className="d-flex w-100 justify-content-between">

                <button
                  type="button"
                  className="btn btn-outline-secondary w-50 ms-2"
                  data-bs-dismiss="modal" // Add this attribute to close the modal on cancel
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>


                <button
                  type="button"
                  className="btn btn-danger w-50 ms-2"
                  data-bs-dismiss="modal" // Add this attribute to close the modal on delete
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
              </div>



            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default SecurityProtocols