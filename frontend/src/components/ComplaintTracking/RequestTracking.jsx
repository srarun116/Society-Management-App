import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import "./RequestTracking.css"
import moment from 'moment';
import axios from 'axios';
import { RiEditBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { GrView } from 'react-icons/gr';
import { FaStarOfLife } from 'react-icons/fa';

const RequestTracking = () => {

  const API_URL = 'http://localhost:4000/api/requests';

  const [createRequest, setCreateRequest] = useState([]);
  const [form, setForm] = useState({ requesterName: '', requestName: '', description: '', date: '', wing: '', unit: '', priority: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCreateRequestIndex, setCurrentCreateRequestIndex] = useState(null);
  const [viewCreateRequest, setViewCreateRequest] = useState(null); // State for the selected expense to view
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

     // Function to fetch complaints
     const fetchRequestComplaints = async () => {
      try {
          const response = await axios.get(API_URL);
          setCreateRequest(response.data);
      } catch (error) {
          console.error("Error fetching Request Complaints:", error);
      }
     };

    useEffect(() => {
      fetchRequestComplaints(); // Fetch data on component mount
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
        return "bg-warning text-white rounded-pill py-1"; // Bootstrap class for warning
      case "Open":
        return "bg-primary text-white rounded-pill py-1"; // Bootstrap class for blue
      case "Solve":
        return "bg-success text-white rounded-pill py-1"; // Bootstrap class for green
      default:
        return ""; // No background
    }
  };




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async(e) => {
    e.preventDefault();

    try {
      if (isEditing) {
         // Editing a Create Complaints
         const response = await axios.put(`${API_URL}/${createRequest[currentCreateRequestIndex]._id}`, form);
        const updatedCreateRequest = [...createRequest];
        updatedCreateRequest[currentCreateRequestIndex] = response.data;
        setCreateRequest(updatedCreateRequest);
      } else {
          // Creating a new Create Complaints
          const response = await axios.post('http://localhost:4000/api/requests/create', form);
       
          setCreateRequest(prevRequest => [...prevRequest, response.data]);   
      }

       // Re-fetch data to ensure state sync
       await fetchRequestComplaints();

          // Reset the form and close modal
    setForm({ requesterName: '', requestName: '', description: '', date: '', wing: '', unit: '', priority: '', status: '' });
    setIsEditing(false);
    setCurrentCreateRequestIndex(null);

    } catch (error) {
      console.error("Error saving Request Complaints:", error);
    }
  };

  const handleCancel = () => {
    setForm({ requesterName: '', requestName: '', description: '', date: '', wing: '', unit: '', priority: '', status: '' });
    setIsEditing(false);
    setCurrentCreateRequestIndex(null);
  };


  const handleEdit = (index) => {
    const selectedRequest = createRequest[index];
  
    // Format the date to 'YYYY-MM-DD' for the date input
    const formattedDate = moment(selectedRequest.date).format('YYYY-MM-DD');
  
    setForm({
      ...selectedRequest,
      date: formattedDate, // Set the formatted date
    });
  
    setIsEditing(true);
    setCurrentCreateRequestIndex(index);
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
    setViewCreateRequest(createRequest[index]); // Set the selected request to view
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async() => {

    try {
      const deleteId = createRequest[deleteIndex]._id; // Get the correct ID from the selected security protocol
      const response = await axios.delete(`${API_URL}/${deleteId}`);

        // Log success
        console.log("Created Complaints deleted successfully:", response.data);

        // Update the UI by removing the deleted request from the list
        setCreateRequest(createRequest.filter((_, index) => index !== deleteIndex));
 
        // Re-fetch data to ensure state sync
        await fetchRequestComplaints();
 
        // Close the modal and reset delete index
        setShowDeleteModal(false);
        setDeleteIndex(null);
    } catch (error) {
       // Log the error details
       console.error("Error deleting request Complaint:", error.response ? error.response.data : error.message);
        
       // Optionally, show a message to the user if deletion fails
       alert("Failed to delete request Complaint. Please check the console for details.");
    }
  
  };
  return (
    <>
      <div className="container-fluid border main-content-wrapper ">
        <div className="row">
          <div className="col-12">

            <div className="row mx-2 d-flex justify-content-between align-items-center mb-1">
              <div className="col-lg-2 pt-2 pb-3">
                <h4  fw-bold>Create Request</h4>
              </div>

              <div className="col-lg-3 d-flex justify-content-end align-items-center pt-3 ">
                <button
                  className="pt-2 pb-2 px-3 add_protocol_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#addCreateRequestModal"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({ requesterName: '', requestName: '', description: '', date: '', wing: '', unit: '', priority: '', status: '' });
                  }}
                >
                  Create Request
                </button>
              </div>
            </div>


            <div className="row border mx-2 mb-2 add_expense_heading">
              <div className="col-2 py-2"><h6 className="text-start fw-bold">Requester Name</h6></div>
              <div className="col-2 py-2"><h6 className="text-start fw-bold">Request Name</h6></div>
              <div className="col-2 py-2"><h6 className="text-start fw-bold">Description</h6></div>
              <div className="col-1 py-2"><h6 className="text-start fw-bold"> Request Date</h6></div>
              <div className="col-1 py-2"><h6 className="text-center fw-bold">Unit Number</h6></div>
              <div className="col-1 py-2"><h6 className="text-center fw-bold">Priority</h6></div>
              <div className="col-1 py-2"><h6 className="text-center fw-bold">statue</h6></div>
              <div className="col-2 py-2"><h6 className="text-center fw-bold">Action</h6></div>
            </div>

            {createRequest.map((complaint, index) => (
              <div className="row mt-2 mx-2 " key={index}>
                <div className="col-2 py-2"><p>{complaint.requesterName}</p></div>
                <div className="col-2 py-2"><p>{complaint.requestName}</p></div>
                <div className="col-2 py-2"><p className="text-start">{complaint.description}</p></div>
                <div className="col-1 py-2"><p className="text-start">{moment(complaint.date).format('DD/MM/YYYY')}</p></div>
                <div className="col-1 py-2 d-flex justify-content-center"><p className="text-center ">{complaint.unit}</p></div>
                <div className="col-1 py-2"><p className={`text-center ${getPriorityClass(complaint.priority)}`}>{complaint.priority}</p></div>
                <div className="col-1 py-2"><p className={`text-center ${getStatusClass(complaint.status)}`}>{complaint.status}</p></div>

                <div className="col-2 py-2 d-flex gap-3 justify-content-center action_btn_main">
                  <button
                    className="px-2 action_btn"
                    onClick={() => handleEdit(index)}
                    data-bs-toggle="modal"
                    data-bs-target="#addCreateRequestModal"
                  >
                    <RiEditBoxFill className="action_icon edit_icon_size" />
                  </button>
                  <button
                    className="px-2 action_btn"
                    onClick={() => handleView(index)}
                    data-bs-toggle="modal"
                    data-bs-target="#viewCreateRequestModal"
                  >
                    <GrView className="action_icon view_icon" />
                  </button>

                  {/* delete */}
                  <button
                    className="px-2 action_btn"
                    onClick={() => handleDeleteClick(index)}
                    data-bs-toggle="modal"
                    data-bs-target="#deleteCreateRequestModal"  // Add this line
                  >
                    <RiDeleteBin2Fill className="action_icon delete_icon" />
                  </button>


                </div>
              </div>
            ))}


          </div>
        </div>
      </div>


      {/* Updated Add Create Complaint Modal */}
      <div className="modal  fade" id="addCreateRequestModal" tabIndex="-1" aria-labelledby="addCreateRequestModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header">
              <h4 className="modal-title" id="addCreateRequestModalLabel">
                {isEditing ? 'Edit Request' : 'Create Request'}
              </h4>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSave}> {/* Add onSubmit here */}
                <div className="mb-3">
                  <label htmlFor="requesterName" className="form-label">Requester Name <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="requesterName" placeholder="Enter Name" value={form.requesterName} autoComplete='off' onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="requestName" className="form-label">RequestName <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="requestName" placeholder="Enter Name" value={form.requestName} autoComplete='off' onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="description" placeholder="Enter Discription" value={form.description} autoComplete='off' onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Request Date <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="date" className="form-control" name="date" placeholder="Enter Date" value={form.date} autoComplete='off' onChange={handleInputChange} required />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="wing" className="form-label">Wing <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder='Enter Wing' name="wing" value={form.wing} autoComplete='off' onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="Unit" className="form-label">Unit <FaStarOfLife className='star_icon_modal mb-2' /></label>
                    <input type="text" className="form-control " name="unit" placeholder='Enter Unit' value={form.unit} autoComplete='off' onChange={handleInputChange} required />
                  </div>
                </div>

                {/* Priority Section */}
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">
                    Priority <FaStarOfLife className="star_icon_modal mb-2" />
                  </label>
                  <div className="d-flex row ">
                    <div className="col-4">
                      <div className='complaintPriorityBox'>
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
                      <div className='complaintPriorityBox'>
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
                      <div className='complaintPriorityBox'>
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
                  <label htmlFor="status" className="form-label">
                    Status <FaStarOfLife className="star_icon_modal mb-2" />
                  </label>
                  <div className="d-flex row ">
                    <div className="col-4">
                      <div className='complaintPriorityBox'>
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
                      <div className='complaintPriorityBox'>
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
                      <div className='complaintPriorityBox'>
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
      <div className="modal fade" id="viewCreateRequestModal" tabIndex="-1" aria-labelledby="viewCreateRequestModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header  mb-0">
              <h5 className="modal-title" id="viewCreateRequestModalLabel "> View Request</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <hr className="no-margin-hr" />


            <div className="modal-body mt-0">
              {viewCreateRequest && (
                <div>
                  <div className="col-12">
                    <p className='fw-bold complainerNameViewModal'> {viewCreateRequest.requesterName} <br /><span className='viewModalComplaintPara viewPageLabelData'> {formattedDate(viewCreateRequest.date)} </span> </p>
                  </div>
                  <div className="col-12">
                    <p><strong className='viewPageLabelData'>Request Name</strong> <br />{viewCreateRequest.requestName}</p>
                  </div>
                  <div className="col-12">
                    <p><strong className='viewPageLabelData'>Description</strong> <br />{viewCreateRequest.description}</p>
                  </div>

                  <div className='d-flex '>
                    <div className="col-3">
                      <p><strong className='viewPageLabelData '>Wing</strong><br /> <span className='wingDataStyle'> {viewCreateRequest.wing} </span></p>
                    </div>
                    <div className="col-3">
                      <p><strong className='viewPageLabelData '>Unit</strong> <br />  {viewCreateRequest.unit} </p>
                    </div>
                    <div className="col-3">
                      <p><strong className='viewPageLabelData'>Priority</strong><br /> <span className='PriorityDataStyle '>  {viewCreateRequest.priority}</span></p>
                    </div>
                    <div className="col-3">
                      <p><strong className='viewPageLabelData '>Status</strong> <br /> <span className='statusDataStyle '>  {viewCreateRequest.status} </span> </p>
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
        id="deleteCreateRequestModal"
        tabIndex="-1"
        aria-labelledby="deleteCreateRequestModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal ">
            <div className="modal-header delete_expense_border">
              <h5 className="modal-title delete_expense_title" id="deleteCreateRequestModalLabel">Delete Protocol?</h5>
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

export default RequestTracking