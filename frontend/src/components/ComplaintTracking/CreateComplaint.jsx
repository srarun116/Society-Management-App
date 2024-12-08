import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import "./CreateComplaint.css";
import moment from 'moment';
import axios from 'axios';
import { RiEditBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { GrView } from 'react-icons/gr';
import { FaStarOfLife } from 'react-icons/fa';



const CreateComplaint = () => {

  const API_URL = 'http://localhost:4000/api/complaints';

  const [createComplaint, setCreateComplaint] = useState([]);
  const [form, setForm] = useState({ complainerName: '', complaintName: '', description: '', wing: '', unit: '', priority: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCreateComplaintIndex, setCurrentCreateComplaintIndex] = useState(null);
  const [viewCreateComplaint, setViewCreateComplaint] = useState(null); // State for the selected expense to view
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  // Function to fetch complaints
  const fetchComplaints = async () => {
    try {
      const response = await axios.get(API_URL);
      setCreateComplaint(response.data);
    } catch (error) {
      console.error("Error fetching Create Complaints:", error);
    }
  };


  useEffect(() => {
    fetchComplaints(); // Fetch data on component mount
  }, []);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-danger text-white rounded-pill py-1"; // Bootstrap class for red
      case "Medium":
        return "bg-primary text-white rounded-pill py-1"; // Bootstrap class for blue
      case "Low":
        return "bg-success text-white rounded-pill py-1"; // Bootstrap class for green
      default:
        return ""; // No background
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "status-pending-item py-1";; 
      case "Open":
        return  "status-open-item py-1";
      case "Solve":
        return "status-solve-item py-1"; 
      default:
        return ""; // No background
    }
  };




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Editing a Create Complaints
        const response = await axios.put(`${API_URL}/update/${createComplaint[currentCreateComplaintIndex]._id}`, form);
        const updatedCreateComplaint = [...createComplaint];
        updatedCreateComplaint[currentCreateComplaintIndex] = response.data;
        setCreateComplaint(updatedCreateComplaint);
      } else {
        // Creating a new Create Complaints
        const response = await axios.post('http://localhost:4000/api/complaints/create', form);

        setCreateComplaint(prevComplaints => [...prevComplaints, response.data]);

      }

      // Re-fetch data to ensure state sync
      await fetchComplaints();

      // Reset the form and close modal
      setForm({ complainerName: '', complaintName: '', description: '', wing: '', unit: '', priority: '', status: '' });
      setIsEditing(false);
      setCurrentCreateComplaintIndex(null);

    } catch (error) {
      console.error("Error saving Create Complaints:", error);
    }




  };

  const handleCancel = () => {
    setForm({ complainerName: '', complaintName: '', description: '', wing: '', unit: '', priority: '', status: '' });
    setIsEditing(false);
    setCurrentCreateComplaintIndex(null);
  };

  const handleEdit = (index) => {
    setForm(createComplaint[index]);
    setIsEditing(true);
    setCurrentCreateComplaintIndex(index);
  };

  const handleView = (index) => {
    setViewCreateComplaint(createComplaint[index]); // Set the selected expense to view
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const deleteId = createComplaint[deleteIndex]._id; // Get the correct ID from the selected security protocol
      const response = await axios.delete(`${API_URL}/delete/${deleteId}`);

      // Log success
      console.log("Created Complaints deleted successfully:", response.data);

      // Update the UI by removing the deleted complain from the list
      setCreateComplaint(createComplaint.filter((_, index) => index !== deleteIndex));

      // Re-fetch data to ensure state sync
      await fetchComplaints();

      // Close the modal and reset delete index
      setShowDeleteModal(false);
      setDeleteIndex(null);
    } catch (error) {
      // Log the error details
      console.error("Error deleting Creating Complaint:", error.response ? error.response.data : error.message);

      // Optionally, show a message to the user if deletion fails
      alert("Failed to delete Create Complaint. Please check the console for details.");
    }
  };


  return (
    <>
      <div className="container-fluid border main-content-wrapper ">
        <div className="row">
          <div className="col-12">

            <div className="row mx-2 d-flex justify-content-between align-items-center mb-2">
              <div className="col-lg-2 pt-3 pb-3">
                <h4 className='fw-bold admin-pages-styling'>Create Complaint</h4>
              </div>

              <div className="col-lg-3 d-flex justify-content-end align-items-center pt-3 ">
                <button
                  className="pt-2 pb-2 px-3 add_protocol_btn admin-pages-styling"
                  data-bs-toggle="modal"
                  data-bs-target="#addCreateComplaintModal"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({ complainerName: '', complaintName: '', description: '', wing: '', unit: '', priority: '', status: '' });
                  }}
                >
                  Create Complaint
                </button>
              </div>
            </div>


            <div className="row border mx-2 mb-2 add_expense_heading">
              <div className="col-2 py-2"><h6 className="text-start admin-pages-styling">Complainer Name</h6></div>
              <div className="col-2 py-2"><h6 className="text-start admin-pages-styling">Complaint Name</h6></div>
              <div className="col-3 py-2"><h6 className="text-start admin-pages-styling">Discription</h6></div>
              <div className="col-1 py-2"><h6 className="text-start admin-pages-styling">Unit Number</h6></div>
              <div className="col-1 py-2"><h6 className="text-center admin-pages-styling">Priority</h6></div>
              <div className="col-1 py-2"><h6 className="text-center admin-pages-styling">statue</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling">Action</h6></div>
            </div>

            {createComplaint.map((complaint, index) => (
              <div className="row mt-2 mx-2 " key={index}>
                <div className="col-2 py-2"><p>{complaint.complainerName}</p></div>
                <div className="col-2 py-2"><p>{complaint.complaintName}</p></div>
                <div className="col-3 py-2"><p className="text-start">{complaint.description}</p></div>
                <div className="col-1 py-2 d-flex justify-content-center"><p className="text-start ">{complaint.unit}</p></div>
                <div className="col-1 py-2"><p className={`text-center ${getPriorityClass(complaint.priority)}`}>{complaint.priority}</p></div>
                <div className="col-1 py-2"><p className={`text-center ${getStatusClass(complaint.status)}`}>{complaint.status}</p></div>

                <div className="col-2 py-2 d-flex gap-3 justify-content-center action_btn_main">                                 

                  <img src="/Images/Edit_btn.png" onClick={() => handleEdit(index)} data-bs-toggle="modal" data-bs-target="#addCreateComplaintModal" height={40} />

                  <img src="/Images/View_btn.png" onClick={() => handleView(index)} data-bs-toggle="modal" data-bs-target="#viewCreateComplaintModal" height={40} />

                  <img src="/Images/Delete_btn.png" onClick={() => handleDeleteClick(index)} data-bs-toggle="modal" data-bs-target="#deleteCreateComplaintModal" height={40} />

                </div>
              </div>
            ))}


          </div>
        </div>
      </div>


      {/* Updated Add Create Complaint Modal */}
      <div className="modal  fade" id="addCreateComplaintModal" tabIndex="-1" aria-labelledby="addCreateComplaintModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header">
              <h4 className="modal-title admin-pages-styling" id="addCreateComplaintModalLabel">
                {isEditing ? 'Edit Complaint' : 'Create Complaint'}
              </h4>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSave}> {/* Add onSubmit here */}
                <div className="mb-3">
                  <label htmlFor="complainerName" className="form-label admin-pages-styling">Complainer Name <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="complainerName" autoComplete='off' placeholder="Enter Name" value={form.complainerName} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="complaintName" className="form-label admin-pages-styling">ComplaintName <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="complaintName" autoComplete='off' placeholder="Enter Name" value={form.complaintName} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label admin-pages-styling">Discription <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="description" autoComplete='off' placeholder="Enter Discription" value={form.description} onChange={handleInputChange} required />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="wing" className="form-label admin-pages-styling">Wing <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder='Enter Wing' name="wing" autoComplete='off' value={form.wing} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="Unit" className="form-label admin-pages-styling">Unit <FaStarOfLife className='star_icon_modal mb-2' /></label>
                    <input type="text" className="form-control " name="unit" autoComplete='off' placeholder='Enter Unit' value={form.unit} onChange={handleInputChange} required />
                  </div>
                </div>

                {/* Priority Section */}
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label admin-pages-styling">
                    Priority <FaStarOfLife className="star_icon_modal mb-2" />
                  </label>
                  <div className="d-flex row ">
                    <div className="col-4">
                      <div className='complaintPriorityBox admin-pages-styling'>
                        <input
                          type="radio"
                          name="priority"
                          value="High"
                          checked={form.priority === 'High'}
                          onChange={handleInputChange}
                          required
                        />{' '}
                        High
                      </div>
                    </div>

                    <div className="col-4">
                      <div className='complaintPriorityBox admin-pages-styling'>
                        <input
                          type="radio"
                          name="priority"
                          value="Medium"
                          checked={form.priority === 'Medium'}
                          onChange={handleInputChange}
                          required
                        />{' '}
                        Medium
                      </div>
                    </div>
                    <div className="col-4">
                      <div className='complaintPriorityBox admin-pages-styling'>
                        <input
                          type="radio"
                          name="priority"
                          value="Low"
                          checked={form.priority === 'Low'}
                          onChange={handleInputChange}
                          required
                        />{' '}
                        Low
                      </div>
                    </div>

                  </div>
                </div>

                {/* Status Section */}
                <div className="mb-3">
                  <label htmlFor="status" className="form-label admin-pages-styling">
                    Status <FaStarOfLife className="star_icon_modal mb-2" />
                  </label>
                  <div className="d-flex row ">
                    <div className="col-4">
                      <div className='complaintPriorityBox admin-pages-styling'>
                        <input
                          type="radio"
                          name="status"
                          value="Open"
                          checked={form.status === 'Open'}
                          onChange={handleInputChange}
                          required
                        />{' '}
                        Open
                      </div>
                    </div>
                    <div className="col-4">
                      <div className='complaintPriorityBox admin-pages-styling'>
                        <input
                          type="radio"
                          name="status"
                          value="Pending"
                          checked={form.status === 'Pending'}
                          onChange={handleInputChange}
                          required
                        />{' '}
                        Pending
                      </div>
                    </div>
                    <div className="col-4">
                      <div className='complaintPriorityBox admin-pages-styling'>
                        <input
                          type="radio"
                          name="status"
                          value="Solve"
                          checked={form.status === 'Solve'}
                          onChange={handleInputChange}
                          required
                        />{' '}
                        Solve
                      </div>
                    </div>
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
                      <h6 className='admin-pages-styling mb-0 py-1'>Cancel</h6>
                    </button>
                  </div>
                  <div className="col-6   ">

                    <button
                      type="submit" // Change button type to submit
                      className="btn  save_btn admin-pages-styling"
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
      <div className="modal fade" id="viewCreateComplaintModal" tabIndex="-1" aria-labelledby="viewCreateComplaintModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header  mb-0">
              <h5 className="modal-title" id="viewCreateComplaintModalLabel "> View Complaint</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <hr className="no-margin-hr" />


            <div className="modal-body mt-0">
              {viewCreateComplaint && (
                <div>
                  <div className="col-12">
                    <p className='fw-bold complainerNameViewModal'> {viewCreateComplaint.complainerName} <br /><span className='viewModalComplaintPara viewPageLabelData'> Aug 5,  2024 </span> </p>
                  </div>
                  <div className="col-12">
                    <p><strong className='viewPageLabelData'>Request Name</strong> <br />{viewCreateComplaint.complaintName}</p>
                  </div>
                  <div className="col-12">
                    <p><strong className='viewPageLabelData'>Discription</strong> <br />{viewCreateComplaint.description}</p>
                  </div>

                  <div className='d-flex '>
                    <div className="col-3">
                      <p><strong className='viewPageLabelData '>Wing</strong><br /> <span className='wingDataStyle'> {viewCreateComplaint.wing} </span></p>
                    </div>
                    <div className="col-3">
                      <p><strong className='viewPageLabelData '>Unit</strong> <br />  {viewCreateComplaint.unit} </p>
                    </div>
                    <div className="col-3">
                      <p><strong className='viewPageLabelData'>Priority</strong><br /> <span className='PriorityDataStyle '>  {viewCreateComplaint.priority}</span></p>
                    </div>
                    <div className="col-3">
                      <p><strong className='viewPageLabelData '>Status</strong> <br /> <span className='statusDataStyle '>  {viewCreateComplaint.status} </span> </p>
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
        id="deleteCreateComplaintModal"
        tabIndex="-1"
        aria-labelledby="deleteCreateComplaintModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal ">
            <div className="modal-header delete_expense_border">
              <h5 className="modal-title delete_expense_title" id="deleteCreateComplaintModalLabel">Delete Protocol?</h5>
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

export default CreateComplaint