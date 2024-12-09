import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaAngleDown, FaStarOfLife } from "react-icons/fa";
import "./ResidentDashBoard.css"
import axios from 'axios';
import moment from 'moment';
import ResidentBalanceChart from '../ResidentBalanceChart/ResidentBalanceChart';

const ResidentDashBoard = () => {

  // Complaint Start

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
  // Complaint End

  // Upcoming Activity Start

  const [activity, setActivity] = useState([]);

  const API_URL_ACTIVITY = 'http://localhost:4000/api/announcements';

  // Function to fetch announcement
  // const fetchAnnouncements = async () => {
  //   try {
  //     const response = await axios.get(API_URL_ACTIVITY);
  //     setActivity(response.data);
  //   } catch (error) {
  //     console.error("Error fetching announcements:", error);
  //   }
  // };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(API_URL_ACTIVITY);

      setActivity(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };


  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    const meridiem = isPM ? "PM" : "AM";
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${meridiem}`;
  };

  // Upcoming Activity End

  // Import Number Start

  const NUMBER_API_URL = 'http://localhost:4000/api/important-number';

  const [createNumber, setCreateNumber] = useState([]);
  const [numberForm, setNumberForm] = useState({ fullName: '', phoneNumber: '', work: '' });
  const [isNumberEditing, setIsNumberEditing] = useState(false);
  const [currentCreateNumberIndex, setCurrentCreateNumberIndex] = useState(null);
  const [showNumberDeleteModal, setShowNumberDeleteModal] = useState(false);
  const [deleteNumberIndex, setDeleteNumberIndex] = useState(null);

  // Function to fetch Number
  const fetchNumber = async () => {
    try {
      const response = await axios.get(NUMBER_API_URL);
      setCreateNumber(response.data);
    } catch (error) {
      console.error("Error fetching Create Number:", error);
    }
  };


  useEffect(() => {
    fetchNumber(); // Fetch data on component mount
  }, []);

  // Baki
  const handleInputNumberChange = (e) => {
    const { name, value } = e.target;
    setNumberForm({ ...numberForm, [name]: value });
  };

  const handleNumberSave = async (e) => {
    e.preventDefault();

    // Validate input fields
    const { fullName, phoneNumber, work } = numberForm;

    if (!fullName || !phoneNumber || !work) {
        alert("All fields are required. Please fill in full name, phone number, and work.");
        return; // Stop further execution if validation fails
    }

    try {
      if (isNumberEditing) {
        // Editing a Create Number
        const response = await axios.put(`${NUMBER_API_URL}/${createNumber[currentCreateNumberIndex]._id}`, numberForm);
        const updatedCreateNumber = [...createNumber];
        updatedCreateNumber[currentCreateNumberIndex] = response.data;
        setCreateNumber(updatedCreateNumber);
      } else {


        // Creating a new Create Complaints
        const response = await axios.post('http://localhost:4000/api/important-number', numberForm);

        setCreateNumber(prevNumbers => [...prevNumbers, response.data]);

      }

      // Re-fetch data to ensure state sync
      await fetchNumber();

      // Reset the form and close modal
      setNumberForm({ fullName: '', phoneNumber: '', work: '' });
      setIsNumberEditing(false);
      setCurrentCreateNumberIndex(null);

    } catch (error) {
      console.error("Error saving Create Number:", error);
    }

  };

  const handleNumberCancel = () => {
    setNumberForm({ fullName: '', phoneNumber: '', work: '' });
    setIsNumberEditing(false);
    setCurrentCreateNumberIndex(null);
  };

  const handleNumberEdit = (index) => {
    setNumberForm(createNumber[index]);
    setIsNumberEditing(true);
    setCurrentCreateNumberIndex(index);
  };

  const handleNumberDeleteClick = (index) => {
    setDeleteNumberIndex(index);
    setShowNumberDeleteModal(true);
  };

  const handleNumberDeleteConfirm = async () => {
    try {
      const deleteId = createNumber[deleteNumberIndex]._id; // Get the correct ID from the selected Number
      const response = await axios.delete(`${NUMBER_API_URL}/${deleteId}`);

      // Log success
      console.log("Created Number deleted successfully:", response.data);

      // Update the UI by removing the deleted Number from the list
      setCreateNumber(createNumber.filter((_, index) => index !== deleteNumberIndex));

      // Re-fetch data to ensure state sync
      await fetchNumber();

      // Close the modal and reset delete index
      setShowNumberDeleteModal(false);
      setDeleteNumberIndex(null);
    } catch (error) {
      // Log the error details
      console.error("Error deleting Created Number:", error.response ? error.response.data : error.message);

      // Optionally, show a message to the user if deletion fails
      alert("Failed to delete Created Number. Please check the console for details.");
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "complaintPriorityHigh "; // Bootstrap class for red
      case "Medium":
        return "complaintPriorityMedium  "; // Bootstrap class for blue
      case "Low":
        return "complaintPriorityLow "; // Bootstrap class for green
      default:
        return ""; // No background
    }
  };

  // Import number end 

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal1, setShowDeleteModal1] = useState(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowDeleteModal1 = () => setShowDeleteModal1(true);
  const handleCloseDeleteModal1 = () => setShowDeleteModal1(false);


  return (
    <div className="container-fluid resident-management ">
      {/* Top Balance Cards */}
      <div className="row ">
        <div className="col-6 col-sm-6  col-lg-6 col-xl-3  mb-3  px-3">
          <div className="balance-card-main balance-card-orange">
            <div className="balance-info">
              <p className="mb-0 text-muted mt-3 dashboard-styling">Total Balance</p>
              <p className="balance-amount-price">₹ 2,22,520</p>
            </div>
            <div className="icon-container">
              <img src="/src/Images/Group1.png" alt="Balance icon" />
            </div>
          </div>
        </div>

        <div className="col-6 col-sm-6  col-lg-6 col-xl-3 mb-3  px-3 ">
          <div className="balance-card-main balance-card-green">
            <div className="balance-info">
              <p className="mb-0 text-muted  mt-3 dashboard-styling">Total Income</p>
              <p className="balance-amount-price">₹ 55,000</p>
            </div>
            <div className="icon-container ">
              <img src="/src/Images/Group2.png" alt="Income icon"  />
            </div>
          </div>
        </div>

        <div className="col-6 col-sm-6  col-lg-6 col-xl-3 mb-3  px-3">
          <div className="balance-card-main balance-card-blue">
            <div className="balance-info">
              <p className="mb-0 text-muted  mt-3 dashboard-styling">Total Expense</p>
              <p className="balance-amount-price">₹ 20,550</p>
            </div>
            <div className="icon-container">
              <img src="/src/Images/Group3.png" alt="Expense icon" />
            </div>
          </div>
        </div>

        <div className="col-6 col-sm-6   col-lg-6 col-xl-3 mb-3  px-3">
          <div className="balance-card-main balance-card-pink">
            <div className="balance-info">
              <p className="mb-0 text-muted  mt-3 dashboard-styling">Total Unit</p>
              <p className="balance-amount-price">₹ 20,550</p>
            </div>
            <div className="icon-container">
              <img src="/src/Images/Group4.png" alt="Unit icon" />
            </div>
          </div>
        </div>
      </div>


      {/* Balance Chart and Sidebar Panels */}
      <div className="row mb-2">
        <div className="col-lg-12 col-xl-6" >
          <div className="card balance-chart" style={{ maxHeight: "430px"  }}>
            <ResidentBalanceChart />
          </div>
        </div>

        <div className="  col-lg-12 col-xl-6 mt-3 mt-sm-3 mt-md-3 mt-lg-2 mt-xl-0">
          <div className="row">
            {/* Important Numbers */}
            <div className=" col-sm-6 col-md-6  col-lg-6">
              <div className="card border rounded" style={{ maxHeight: "430px", minHeight: "430px" }}>
                <div className="card-header d-flex justify-content-between align-items-center p-2">
                  <h5 style={{ fontSize: "20px" , fontWeight: "bold" }} className='dashboard-styling' >Important Numbers</h5>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addCreateNumberModal"
                    onClick={() => {
                      setIsNumberEditing(false);
                      setNumberForm({ fullName: '', phoneNumber: '', work: '' });
                    }}
                  >
                   <h6 className='dashboard-styling mb-1 me-1'> Add </h6> 
                  </button>
                </div>
                <div className="important-numbers scrollable-card">
                  <div className="m-2">
                    {createNumber.map((number, index) => (
                      <div
                        className="border rounded mb-2 d-flex justify-content-between align-items-center"
                        key={index}
                      >
                        <div className="col-lg-8 p-2">
                          <h5 style={{ fontSize: "13px" }} >
                            Name: <span className="text-secondary fw-normal">{number.fullName}</span>
                          </h5>
                          <h5 style={{ fontSize: "12px" }}>
                            Phone: <span className="text-secondary fw-normal"> {number.phoneNumber} </span>
                          </h5>
                          <h5 style={{ fontSize: "13px" }}>
                            Work: <span className="text-secondary fw-normal "> {number.work} </span>
                          </h5>
                        </div>
                        <div className="col-lg-4 text-end">
                          <img
                            className="delete-number me-2"
                            role="button"
                            tabIndex="0"
                            src="/src/Images/delet.png"
                            alt="delete"
                            onClick={() => handleNumberDeleteClick(index)}
                            data-bs-toggle="modal"
                            data-bs-target="#deleteCreateNumberModal"
                          />
                          <img className="edit-number"
                            role="button"
                            tabIndex="0"
                            src="/src/Images/edit.png"
                            alt="edit"
                            onClick={() => handleNumberEdit(index)}
                            data-bs-toggle="modal"
                            data-bs-target="#addCreateNumberModal"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </div>

              {/* Updated Add Create Number Modal */}
              <div className="modal  fade" id="addCreateNumberModal" tabIndex="-1" aria-labelledby="addCreateNumberModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content custom-modal" style={{backgroundColor: "white" , color: "black" , maxWidth: "400px" }}>
                    <div className="modal-header">
                      <h5 className="modal-title m-0 dashboard-styling" id="addCreateNumberModalLabel">
                        {isNumberEditing ? 'Edit Number' : 'Create Number'}
                      </h5>
                    </div>

                    <div className="modal-body">
                      <form onSubmit={handleNumberSave}> {/* Add onSubmit here */}
                        <div className="mb-3">
                          <label htmlFor="fullName" className="form-label dashboard-styling">Full Name <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                          <input type="text" className="form-control" name="fullName" autoComplete='off' placeholder="Enter Name" value={numberForm.fullName} onChange={handleInputNumberChange} required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="phoneNumber" className="form-label dashboard-styling"> Phone Number <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                          <input type="text" className="form-control" name="phoneNumber" autoComplete='off' placeholder="Enter Phone Number" value={numberForm.phoneNumber} onChange={handleInputNumberChange} required />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="work" className="form-label dashboard-styling"> Work <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                          <input type="text" className="form-control" name="work" autoComplete='off' placeholder="Enter Work" value={numberForm.work} onChange={handleInputNumberChange} required />
                        </div>


                        {/* Modal Footer */}

                        <div className="row mt-4 px-0 ">
                          <div className="col-6 ">
                            <button
                              type="button"
                              className="btn btn-outline-secondary expense_cancel_btn_modal py-2  me-2"
                              data-bs-dismiss="modal"
                              onClick={handleNumberCancel}

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
                              {isNumberEditing ? 'Update' : 'Save'}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Confirmation Modal */}
              <div
                className="modal fade"
                id="deleteCreateNumberModal"
                tabIndex="-1"
                aria-labelledby="deleteCreateNumberModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content custom-modal ">
                    <div className="modal-header delete_expense_border">
                      <h5 className="modal-title delete_expense_title" id="deleteCreateNumberModalLabel">Delete Number?</h5>
                    </div>
                    <hr className="no-margin-hr" />

                    <div className="modal-body">
                      <p className='delete_para'>Are you sure you want to delete this Number?</p>
                    </div>
                    <div className="modal-footer">
                      <div className="d-flex w-100 justify-content-between">

                        <button
                          type="button"
                          className="btn btn-outline-secondary w-50 "
                          data-bs-dismiss="modal" // Add this attribute to close the modal on cancel
                          onClick={() => setShowNumberDeleteModal(false)}
                        >
                          Cancel
                        </button>


                        <button
                          type="button"
                          className="btn btn-danger w-50 ms-2"
                          data-bs-dismiss="modal" // Add this attribute to close the modal on delete
                          onClick={handleNumberDeleteConfirm}
                        >
                          Delete
                        </button>
                      </div>



                    </div>
                  </div>
                </div>
              </div>


            

            {/* Pending Maintenances */}
            <div className=" col-sm-6 col-md-6 col-lg-6 mt-3 mt-sm-0 mt-md-0">
              <div className="card pending-maintenance" style={{ maxHeight: "430px" , minHeight: "430px" }}>
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 style={{ fontSize: "17px" , fontWeight: "bold" }} className='dashboard-styling' >Pending Maintenances</h5>
                  <span className='text-primary dashboard-styling'>View all</span>
                </div>
                <div className="card-body scrollable-card">
                  {/* Sample Pending Maintenance Item */}
                  {[...Array(10)].map((_, index) => (
                    <div className="maintenance-item d-flex bd-highlight mt-1 align-items-center border-bottom" key={index}>
                      <div className="bd-highlight rounded  mb-1">
                        <img src="\src\Images\image2.png" alt="maintenance" style={{ height: "40px" }} />
                      </div>
                      <div className="ps-2 bd-highlight">
                        <h5 style={{ fontSize: "13px" }}>Roger Lubin</h5>
                        <h5 style={{ fontSize: "12px" }} className='text-secondary fw-normal'>2 Month Pending</h5>
                      </div>
                      <div className="text-danger ms-auto p-2 bd-highlight">
                        <h2 style={{ fontSize: "12px" }}> <MdOutlineCurrencyRupee className='mb-1' />5000</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complaint List */}
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-9 ">
          <div className="border rounded complaint-list p-3 bg-white">
            <div className="d-flex justify-content-between align-items-center ">
              <h5 className='fw-bold dashboard-styling'>Complaint List</h5>
              <button className="btn border">Month <i className="fas fa-angle-down"></i></button>
            </div>
            <div className="table-responsive mt-2">
              <table className="table rounded-table">
                <thead>
                  <tr>
                    <th className=' text-start dashboard-styling' style={{ backgroundColor: "#5678e91b" , color: "black" , fontWeight: "bold"}}>Complainer Name</th>
                    <th className=' text-center dashboard-styling' style={{ backgroundColor: "#5678e91b" , color: "black" , fontWeight: "bold"}}>Complaint Name</th>
                    <th className='dashboard-styling' style={{ backgroundColor: "#5678e91b" , color: "black" , fontWeight: "bold"}}>Date</th>
                    <th className='dashboard-styling' style={{ backgroundColor: "#5678e91b" , color: "black" , fontWeight: "bold"}}>Priority</th>
                    <th className='dashboard-styling' style={{ backgroundColor: "#5678e91b" , color: "black" , fontWeight: "bold"}}>Complain Status</th>
                    <th className='dashboard-styling' style={{ backgroundColor: "#5678e91b" , color: "black" , fontWeight: "bold"}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {createComplaint.map((complaint, index) => (
                    <tr key={index} >
                      <td className="complainer">
                        {complaint.complainerName}
                      </td>
                      <td>{complaint.complaintName}</td>
                      <td>{moment(complaint.createdAt).format('DD-MM-YYYY')}</td>
                      <td><span className={`text-center  ${getPriorityClass(complaint.priority)}`}>{complaint.priority}</span></td>
                      <td><span className="status open">{complaint.status}</span></td>
                      <td className="actions d-flex justify-content-center">
                        <button className="btn-action mb-2">
                          <img
                            className="edit-Complaint"
                            src="/src/Images/edit.png"
                            alt="Edit"
                            onClick={() => handleEdit(index)}
                            data-bs-toggle="modal"
                            data-bs-target="#addCreateComplaintModal"
                          />
                        </button>
                        <button className="btn-action">
                          <img src="/src/Images/view.png"
                            alt="View"
                            onClick={() => handleView(index)}
                            data-bs-toggle="modal"
                            data-bs-target="#viewCreateComplaintModal"
                          />
                        </button>
                        <button className="btn-action">
                          <img src="/src/Images/delet.png"
                            alt="Delete"
                            onClick={() => handleDeleteClick(index)}
                            data-bs-toggle="modal"
                            data-bs-target="#deleteCreateComplaintModal"
                          />
                        </button>
                      </td>
                    </tr>

                  ))}



                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* View Complaint Modal */}
        <div className="modal fade" id="viewCreateComplaintModal" tabIndex="-1" aria-labelledby="viewCreateComplaintModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content custom-modal">
              <div className="modal-header  mb-0">
                <h5 className="modal-title dashboard-styling" id="viewCreateComplaintModalLabel "> View Complaint</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <hr className="no-margin-hr" />


              <div className="modal-body mt-0">
                {viewCreateComplaint && (
                  <div>
                    <div className="col-12">
                      <p className='fw-bold complainerNameViewModal dashboard-styling'> {viewCreateComplaint.complainerName} <br /><span className='viewModalComplaintPara viewPageLabelData'> {moment(viewCreateComplaint.createdAt).format('DD MMMM, YYYY')} </span> </p>
                    </div>
                    <div className="col-12">
                      <p className='dashboard-styling'><strong className='viewPageLabelData dashboard-styling'>Request Name</strong> <br />{viewCreateComplaint.complaintName}</p>
                    </div>
                    <div className="col-12">
                      <p className='dashboard-styling'><strong className='viewPageLabelData dashboard-styling'>Discription</strong> <br />{viewCreateComplaint.description}</p>
                    </div>

                    <div className='d-flex '>
                      <div className="col-3">
                        <p><strong className='viewPageLabelData dashboard-styling'>Wing</strong><br /> <span className='wingDataStyle dashboard-styling'> {viewCreateComplaint.wing} </span></p>
                      </div>
                      <div className="col-3">
                        <p className='dashboard-styling'><strong className='viewPageLabelData dashboard-styling'>Unit</strong> <br />  {viewCreateComplaint.unit} </p>
                      </div>
                      <div className="col-3">
                        <p className='dashboard-styling'><strong className='viewPageLabelData dashboard-styling'>Priority</strong><br /> <span className="">  {viewCreateComplaint.priority}</span></p>
                      </div>
                      <div className="col-3">
                        <p className='dashboard-styling'><strong className='viewPageLabelData dashboard-styling'>Status</strong> <br /> <span className='statusDataStyle '>  {viewCreateComplaint.status} </span> </p>
                      </div>

                    </div>


                  </div>
                )}
              </div>

            </div>
          </div>
        </div>



        {/* Updated Add Create Complaint Modal */}
        <div className="modal  fade" id="addCreateComplaintModal" tabIndex="-1" aria-labelledby="addCreateComplaintModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content custom-modal">
              <div className="modal-header">
                <h5 className="modal-title dashboard-styling" id="addCreateComplaintModalLabel">
                  {isEditing ? 'Edit Complaint' : 'Create Complaint'}
                </h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSave}> {/* Add onSubmit here */}
                  <div className="mb-3">
                    <label htmlFor="complainerName" className="form-label dashboard-styling">Complainer Name <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                    <input type="text" className="form-control" name="complainerName" autoComplete='off' placeholder="Enter Name" value={form.complainerName} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="complaintName" className="form-label dashboard-styling">ComplaintName <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                    <input type="text" className="form-control" name="complaintName" autoComplete='off' placeholder="Enter Name" value={form.complaintName} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label dashboard-styling">Discription <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                    <input type="text" className="form-control" name="description" autoComplete='off' placeholder="Enter Discription" value={form.description} onChange={handleInputChange} required />
                  </div>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label htmlFor="wing" className="form-label dashboard-styling">Wing <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder='Enter Wing' name="wing" autoComplete='off' value={form.wing} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <label htmlFor="Unit" className="form-label dashboard-styling">Unit <FaStarOfLife className='star_icon_modal mb-2' /></label>
                      <input type="text" className="form-control " name="unit" autoComplete='off' placeholder='Enter Unit' value={form.unit} onChange={handleInputChange} required />
                    </div>
                  </div>

                  {/* Priority Section */}
                  <div className="mb-3">
                    <label htmlFor="priority" className="form-label dashboard-styling">
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
                    <label htmlFor="status" className="form-label dashboard-styling">
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
                       <h6 className='dashboard-styling mb-1'>  Cancel </h6> 
                      </button>
                    </div>
                    <div className="col-6   ">

                      <button
                        type="submit" // Change button type to submit
                        className="btn  save_btn "
                        data-bs-dismiss="modal"
                      >
                       <h6 className='dashboard-styling mb-0'> {isEditing ? 'Update' : 'Save'} </h6> 
                      </button>
                    </div>
                  </div>
                </form>
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
                <h5 className="modal-title delete_expense_title" id="deleteCreateComplaintModalLabel">Delete Complaint?</h5>
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



        {/* Upcoming Activity */}
        <div className="col-md-6 col-lg-6 col-xl-3 mt-3 mt-md-0">
          <div className="card upcoming-activity">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 style={{ fontSize: "18px" , fontWeight: "bold" }} className='dashboard-styling' >Upcoming Activity</h5>
              <button className='btn border' style={{ maxWidth: "90px", fontSize: "14px" }}>Month <FaAngleDown /></button>
            </div>
            <div className="card-body scrollable-card">
              
              {activity.map((activity, index) => (
                <div className="maintenance-item d-flex bd-highlight align-items-center border-bottom" key={index} >
                  <div className=" bd-highlight rounded">
                    <img src="\src\Images\Group5.png" alt="activity" style={{ height: "40px" }} />
                  </div>
                  <div className="p-2 bd-highlight">
                    <h5 style={{ fontSize: "14px" }}>{activity.title}</h5>
                    <h5 style={{ fontSize: "12px" }} className="text-secondary fw-normal">{formatTime(activity.time)}</h5>
                  </div>
                  <div className="ms-auto  bd-highlight">
                    <h2 style={{ fontSize: "12px" }}>{moment(activity.date).format('DD/MM/YYYY')}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResidentDashBoard;