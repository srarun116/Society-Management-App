import "./FinancialIncome.css"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { FaEye, FaCalendarAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FiX } from 'react-icons/fi';
import moment from "moment";
import axios from "axios";

function FinancialIncome() {
    const [activeTab, setActiveTab] = useState("maintenance");
    const [showMainModal, setShowMainModal] = useState(false);
    const [showAddMaintenanceModal, setShowAddMaintenanceModal] = useState(false);
    const [maintenanceAmount, setMaintenanceAmount] = useState("");
    const [penaltyAmount, setPenaltyAmount] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [penaltyDays, setPenaltyDays] = useState("");
    const [data, setData] = useState([
        {
            name: "Cody Fisher",
            unitNumber: "1001",
            date: "2024-02-10",
            status: "Tenant",
            phoneNumber: "92524 34522",
            amount: "₹ 2000",
            penalty: "₹ 500",
            paymentStatus: "Pending",
            paymentMethod: "Online",
        },
    ]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleContinue = () => {
        setShowMainModal(false);
        setShowAddMaintenanceModal(true);
    };

    const handleSaveMaintenance = () => {
        if (!maintenanceAmount || !dueDate) {
            alert("Please fill all required fields!");
            return;
        }

        const newRecord = {
            name: "John Doe",
            unitNumber: "101",
            date: dueDate,
            status: "Owner",
            phoneNumber: "12345 67890",
            amount: maintenanceAmount,
            penalty: penaltyAmount || "₹ 0",
            paymentStatus: "Pending",
            paymentMethod: "Cash",
        };

        setData((prevData) => [...prevData, newRecord]);

        setMaintenanceAmount("");
        setPenaltyAmount("");
        setDueDate("");
        setPenaltyDays("");
        setShowAddMaintenanceModal(false);
    };

    return (
        <div className="container-fluid p-4 " style={{ backgroundColor: "white" , borderRadius: "20px" }}>
            <div className="row mb-4 align-items-center mx-1">
                <div className="col-lg-2 col-md-2 ">
                    <div className="balance-card balance-card-green">
                        <div className="balance-info">
                            <p className="mb-0 text-muted mt-3 admin-pages-styling">Maintenance Amount</p>
                            <p className="balance-amount text-success">₹ 0</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-2 ">
                    <div className="balance-card balance-card-danger">
                        <div className="balance-info">
                            <p className="mb-0 text-muted mt-3 admin-pages-styling">Penalty Amount</p>
                            <p className="balance-amount text-danger">₹ 0</p>
                        </div>
                    </div>
                </div>
                <div className="col text-end">
                    <button
                        className="btn btn-primary mb-3 admin-pages-styling"
                        onClick={() => setShowMainModal(true)}
                    >
                        Set Maintenance
                    </button>
                </div>
            </div>

            {showMainModal && (
                <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{ width: "430px" }}>
                            <div className="modal-header">
                                <h5 className="modal-title admin-pages-styling">Set Maintenance</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowMainModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label admin-pages-styling">
                                        Password<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter password"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                        >
                                            <FaEye />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="row mx-2 mb-3">
                              <div className="col-6">
                              <button
                                    type="button"
                                    style={{width:"100%"}}
                                    className="btn btn-outline-secondary text-dark fw-bold"
                                    onClick={() => setShowMainModal(false)}
                                >
                                    Cancel
                                </button>
                              </div>
                              <div className="col-6">
                              <button
                                    type="button"
                                    className="btn fw-bold"
                                    style={{
                                        background: "linear-gradient(90deg, #FF5722, #FF9800)",
                                        color: "white",
                                        width:"100%"
                                    }}
                                    onClick={handleContinue}
                                >
                                    Continue
                                </button>
                              </div>
                                
                               
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showAddMaintenanceModal && (
                <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{ width: "430px" }}>
                            <div className="modal-header">
                                <h5 className="modal-title admin-pages-styling">Add Maintenance Detail</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddMaintenanceModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label admin-pages-styling">Maintenance Amount</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="₹ 2000"
                                            value={maintenanceAmount}
                                            onChange={(e) => setMaintenanceAmount(e.target.value)}
                                        />
                                    </div>
                                    <div className="col">
                                        <label className="form-label admin-pages-styling">Penalty Amount</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="₹ 500"
                                            value={penaltyAmount}
                                            onChange={(e) => setPenaltyAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label admin-pages-styling">Maintenance Due Date</label>
                                    <div className="input-group">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label admin-pages-styling">
                                        Penalty Applied After Day Selection
                                    </label>
                                    <select
                                        className="form-select admin-pages-styling"
                                        value={penaltyDays}
                                        onChange={(e) => setPenaltyDays(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select days
                                        </option>
                                        <option value="1 Day">1 Day</option>
                                        <option value="2 Days">2 Days</option>
                                        <option value="3 Days">3 Days</option>
                                        <option value="4 Days">4 Days</option>
                                    </select>
                                </div>
                            </div>
                          
                              <div className="row mx-2
                              mb-3">                           
                              <div className="col-6 ">
                              <button
                                    type="button" 
                                    style={{width:"100%"}}                                  
                                    className="btn btn-outline-secondary fw-bold"
                                    onClick={() => setShowAddMaintenanceModal(false)}
                                >
                                    Cancel
                                </button>
                              </div>
                              <div className="col-6 ">
                              <button type="button" className="btn fw-bold" 
                                    style={{
                                        background: "linear-gradient(90deg, #FF5722, #FF9800)", color: "white", width:"100%"
                                    }}
                                    onClick={handleSaveMaintenance}
                                >
                                    Apply
                                </button>
                              </div>
                              </div>
                               
                         
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs Section */}
            <div className="container-fluid mt-3">
                <ul className="nav nav-tabs border-0">
                    <li className="nav-item">
                        <button
                            className={`nav-link admin-pages-styling ${activeTab === 'maintenance' ? 'active' : ''}`}
                            onClick={() => handleTabClick('maintenance')}
                            style={{
                                background: activeTab === 'maintenance' ? 'linear-gradient(90deg, #FF5722, #FF9800)' : 'white',
                                color: activeTab === 'maintenance' ? 'white' : 'black',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                                border: 'none',
                                padding: '10px 20px'
                            }}
                        >
                            Maintenance
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link admin-pages-styling ${activeTab === 'otherIncome' ? 'active' : ''}`}
                            onClick={() => handleTabClick('otherIncome')}
                            style={{
                                background: activeTab === 'otherIncome' ? 'linear-gradient(90deg, #FF5722, #FF9800)' : 'white',
                                color: activeTab === 'otherIncome' ? 'white' : 'black',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                                border: 'none',
                                padding: '10px 20px'
                            }}
                        >
                            Other Income
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content border border-top-0 p-3 bg-white rounded-bottom">
                    {activeTab === "maintenance" && <MaintenanceDetails data={data} />}
                    {activeTab === 'otherIncome' && <OtherIncome />}
                </div>
            </div>
        </div>

    );
}



function MaintenanceDetails({ data }) { // Accept data as prop
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const handleViewClick = (rowData) => {
        setSelectedData(rowData);
        setShowModal(true);
    };

    return (
        <div className="container-fluid mt-4">
            <div className="row pt-3">
                <div className="complaint-list ">
                    <div
                        className="table-responsive  bg-white"
                        style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ddd", borderRadius: "8px" }}
                    >
                        <table className="table align-middle text-center">
                            <thead>
                                <tr >
                                    <th  className="admin-pages-styling"  style={{ backgroundColor: "#5678e91b", }}>Name</th>
                                    <th  className="admin-pages-styling" style={{ backgroundColor: "#5678e91b", }}>Unit Number</th>
                                    <th  className="admin-pages-styling" style={{ backgroundColor: "#5678e91b", }}>Date</th>
                                    <th  className="admin-pages-styling" style={{ backgroundColor: "#5678e91b", }}>Status</th>
                                    <th  className="admin-pages-styling" style={{ backgroundColor: "#5678e91b", }}>Phone Number</th>
                                    <th  className="admin-pages-styling" style={{ backgroundColor: "#5678e91b", }}>Amount</th>
                                    <th  className="admin-pages-styling" style={{ backgroundColor: "#5678e91b", }}>Penalty</th>
                                    <th  className="admin-pages-styling" style={{ backgroundColor: "#5678e91b", }}>Status</th>
                                    <th  className="admin-pages-styling" style={{ backgroundColor: "#5678e91b", }}>Payment</th>
                                    <th  className="admin-pages-styling" style={{ backgroundColor: "#5678e91b", }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="complainer d-flex align-items-center">
                                            <img
                                                src="/Images/image.png"
                                                alt="Complainer"
                                                className="rounded-circle me-2"
                                                style={{ width: "35px", height: "35px", objectFit: "cover" }}
                                            />
                                            {item.name}
                                        </td>
                                        <td>
                                            <span className="status open" style={{ fontSize: "14px" }}>A</span>
                                            <span className="badge rounded-circle bg-primary text-white" style={{ padding: "10px" }}>
                                                {item.unitLetter}
                                            </span>
                                            <span className="ms-2">{item.unitNumber}</span>
                                        </td>
                                        <td>{item.date}</td>
                                        <td>
                                            <span className={`badge1 ${item.status === "Owner1" ? "Owner1" : "Tenant"} `}
                                                style={{ fontSize: "14px" }}> <FaUser className="mb-1" /> {item.status}
                                            </span>
                                        </td>
                                        <td>{item.phoneNumber}</td>
                                        <td style={{ color: "green", }}> {item.amount}</td>
                                        <td style={{ color: item.penalty !== "--" ? "red" : "black" }}>
                                            {item.penalty === "--" ? "--" : ` ${item.penalty}`}
                                        </td>
                                        <td>
                                            <span className={`badge1 ${item.paymentStatus === "Pending" ? "Pending" : "Done"}`}
                                                style={{ fontSize: "14px" }}> {item.paymentStatus}
                                            </span>
                                        </td>
                                        <td>
                                            <span  className={`badge1 ${item.paymentMethod === "Cash" ? "Cash" : "Online"}`}
                                                 style={{ fontSize: "14px" }}  > <MdPayment className="mb-1" /> {item.paymentMethod}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-action">
                                                <img src="/Images/view.png" alt="View" onClick={() => handleViewClick(item)} height={30} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {/* Modal */}
            {showModal && selectedData && (
                <>
                    <div className={`modal fade ${showModal ? "show d-block" : "d-none"}`} tabIndex="-1"
                        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} role="dialog">
                        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "500px" }} role="document" >
                            <div className="modal-content" style={{ borderRadius: "10px" }}>
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h5 className="modal-title  admin-pages-styling" style={{ fontWeight: "bold" }}>
                                        View Maintenance Details
                                    </h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}><FiX size={24} /> </button>
                                </div>
                                {/* Modal Body */}
                                <div className="modal-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <img src="\Images\image.png" alt="User" className="rounded-circle me-3"
                                            style={{ width: "50px", height: "50px",objectFit: "cover",}}/>
                                        <div>
                                            <h6 style={{ fontWeight: "bold", margin: 0 }}>
                                                {selectedData.name}
                                            </h6>
                                            <p style={{ margin: 0,  color: "#777",   fontSize: "14px", }}>
                                                {selectedData.date}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Row of Four Columns */}
                                    <div className="row">
                                        <div className="col-3 mb-2">
                                            <p className="mb-1 text-secondary">Wing</p>
                                            <span  className="status open" style={{ fontSize: "14px" }}  >A
                                                {selectedData.wing}
                                            </span>
                                        </div>
                                        <div className="col-3 mb-2">
                                            <p className="mb-1 text-secondary">Unit</p>
                                            <span>{selectedData.unitNumber}</span>
                                        </div>
                                        <div className="col-3 mb-2">
                                            <p className="mb-1 text-secondary">Status</p>
                                            <span
                                                className={`badge1 ${selectedData.status === "Owner1" ? "Owner1" : "Tenant" }`}
                                                style={{ fontSize: "14px" }} >
                                                   <FaUser className="mb-1" />
                                                {selectedData.status}
                                            </span>
                                        </div>
                                        <div className="col-3 mb-2">
                                            <p className="mb-1 text-secondary">Amount</p>
                                            <span
                                                style={{
                                                    color: "green",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {selectedData.amount}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Second Row of Four Columns */}
                                    <div className="row">
                                        <div className="col-3 mb-2">
                                            <p className="mb-1 text-secondary">Penalty</p>
                                            <span
                                                style={{
                                                    color: selectedData.penalty === "--" ? "#777" : "red",
                                                }}
                                            >
                                                {selectedData.penalty}
                                            </span>
                                        </div>

                                        <div className="col-3 mb-2">
                                            <p className="mb-1 text-secondary">Payment Status</p>
                                            <span
                                                className={`badge1 ${selectedData.paymentStatus === "Pending"
                                                        ? "Pending"
                                                        : "Done"
                                                    }`}
                                                style={{ fontSize: "14px" }}
                                            >
                                                {selectedData.paymentStatus}
                                            </span>
                                        </div>

                                        <div className="col-3 mb-2">
                                            <p className="mb-1 text-secondary">Payment</p>
                                            <span
                                                className={`badge1 ${selectedData.paymentMethod === "Cash"
                                                        ? "Cash"
                                                        : "Online"
                                                    }`}
                                                style={{
                                                    padding: "5px 10px",
                                                }}
                                            >
                                                {selectedData.paymentMethod}
                                            </span>
                                        </div>
                                        <div className="col-3 mb-2">
                                            <p className="mb-1 text-secondary">Other Info</p>
                                            <span
                                                style={{
                                                    color: "#333",
                                                }}
                                            >
                                                --
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

// OtherIncome start

const OtherIncome = () => {

    const API_URL = "http://localhost:4000/api/other-income";

    const [notes, setNotes] = useState([
        // { title: "Ganesh Chaturthi", description: "Celebration of Ganesh Chaturthi.", date: "2024-01-07", amount: "1500", dueDate: "2024-01-10" ,totalMembers : 12 },
        // { title: "Navratri", description: "Navratri celebrations.", date: "2024-02-15", amount: "1200", dueDate: "2024-02-20" ,totalMembers: 12 },
    ]);
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        date: "",
        dueDate: "",
        amount: "",
        totalMembers: ""
    });
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [modalType, setModalType] = useState(""); // "create" or "edit"
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

     // Fetch all other income data
        const fetchNotes = async () => {
            try {
                const response = await axios.get(API_URL);
                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        }; 
        // Load data on component mount
        useEffect(() => {
            fetchNotes();
        }, []);



    // Toggles the dropdown menu
    const toggleDropdown = (index) => {
        setDropdownIndex(dropdownIndex === index ? null : index);
    };

    // Handles form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'
    };

    // Pre-fill form values when editing a note
    useEffect(() => {
        if (modalType === "edit" && currentNote) {
            setFormValues({
                title: currentNote.title || "",
                date: formatDate(currentNote.date) || "",
                dueDate: formatDate(currentNote.dueDate) || "",
                description: currentNote.description || "",
                amount: currentNote.amount || "",
                totalMembers: currentNote.totalMembers || ""
            });
        }
    }, [modalType, currentNote]);

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();

        // Check if any required field is empty
        if (
            !formValues.title.trim() ||
            !formValues.description.trim() ||
            !formValues.date ||
            !formValues.dueDate ||
            !formValues.amount ||
            !formValues.totalMembers
        ) {
            alert("Please fill in all fields."); // Notify the user
            return; // Exit the function
        }

        try {
            if (modalType === "create") {
                const response = await axios.post(`${API_URL}/add`, formValues);
                setNotes([...notes, response.data.otherIncome]);
            } else if (modalType === "edit") {
                const response = await axios.put(`${API_URL}/${currentNote._id}`, formValues);
                setNotes(
                    notes.map((note) =>
                        note._id === currentNote._id ? response.data.otherIncome : note
                    )
                );
            }

            // Reset state
            setShowModal(false);
            setFormValues({
                title: "",
                description: "",
                date: "",
                dueDate: "",
                amount: "",
                totalMembers: "",
            });
            setModalType("");
        } catch (error) {
            console.error("Error saving data:", error.message);
        }
    };


    // Opens the Create Note modal
    const handleCreateClick = () => {
        setModalType("create");
        setShowModal(true);
    };

    // Opens the Edit Note modal
    const handleEditClick = (note) => {
        setCurrentNote(note);
        setFormValues(note);
        setModalType("edit");
        setShowModal(true);
    };

    // Closes the Create/Edit modal
    const handleCloseEditModal = () => {
        setShowModal(false);
        setModalType("");
        setCurrentNote(null);
    };

    // Opens the Delete Confirmation modal
    const handleDeleteClick = (note) => {
        setCurrentNote(note);
        setShowDeleteModal(true);
    };

    // Closes the Delete Confirmation modal
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setCurrentNote(null);
    };

    // Confirms the deletion of a note
    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${API_URL}/${currentNote._id}`);
            setNotes(notes.filter((note) => note._id !== currentNote._id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting data:", error.message);
        }
    };

    return (
        <div className="container-fluid pt-3 mt-3 financial-management">
            <div className="d-flex justify-content-between align-items-center mb-3 text-dark">
                <h2 style={{ fontSize: "20px" }} className="admin-pages-styling">Other Income </h2>
                <button className="btn btn-primary mb-3 admin-pages-styling"  onClick={() => {
                        setModalType("create");
                        setShowModal(true);
                    }}>
                    Create Other Income
                </button>
            </div>

            {/* Notes Cards */}
            <div className="row">
                {notes.map((note, index) => (
                    <div key={index} className="col-md-3 mb-4">
                        <div className="card note-card shadow-sm bg-white">
                            <div
                                className="d-flex justify-content-between align-items-center rounded-top p-2"
                                style={{ backgroundColor: "#5678e9", color: "white" }}
                            >
                                <h5 className="card-title mb-0 admin-pages-styling" style={{ fontSize: "16px" }}>
                                    {note.title}
                                </h5>
                                <img
                                    src="/Images/menu.png"
                                    role="button"
                                    tabIndex="0"
                                    alt="Menu"
                                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                    onClick={() => toggleDropdown(index)}
                                />
                                {dropdownIndex === index && (
                                    <div
                                        className="dropdown-menu show"
                                        style={{ position: "absolute", top: "40px", right: "10px" }}
                                    >
                                        <button className="dropdown-item" onClick={() => handleEditClick(note)}>
                                            Edit
                                        </button>
                                        <button className="dropdown-item" onClick={() => handleDeleteClick(note)}>
                                            Delete
                                        </button>
                                        <Link to="/MemberList" className="dropdown-item">
                                            View
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <div className="card-body ">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" , fontFamily: "sans-serif" ,   }}> Amount Per Member: </span>
                                    <span className='badge admin-pages-styling text-primary' style={{
                                        fontSize: "12px",
                                        padding: "5px 10px",
                                        borderRadius: "20px",
                                        fontWeight: "bold", backgroundColor: "#ecf4ff" ,fontFamily: "sans-serif"
                                    }}>₹ {note.amount} </span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" , fontFamily: "sans-serif" }}> Total Menbers: </span>
                                    <span style={{ fontSize: "12px", fontWeight: "bold", fontFamily: "sans-serif"  }}  className="admin-pages-styling"> {note.totalMembers} </span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" , fontFamily: "sans-serif" }}> Date: </span>
                                    <span style={{ fontSize: "12px", fontWeight: "bold", fontFamily: "sans-serif"  }} className="admin-pages-styling"> {moment(note.date).format('DD/MM/YYYY')} </span>
                                </div>
                                <div className=" d-flex justify-content-between mb-2">
                                    <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" , fontFamily: "sans-serif" }}>Due Date: </span>
                                    <span style={{ fontSize: "12px", fontWeight: "bold", fontFamily: "sans-serif" }} className="admin-pages-styling"> {moment(note.dueDate).format('DD/MM/YYYY')} </span>
                                </div>
                                <div>
                                    <h6 className="text-start text-muted  admin-pages-styling mb-1" style={{ fontSize: "12px" , fontFamily: "sans-serif" }}  >
                                        Description:
                                    </h6>
                                    <p className="text-normal mb-0 admin-pages-styling" style={{ fontSize: "12px" ,fontFamily: "sans-serif" }}>{note.description} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title admin-pages-styling">
                                    {modalType === "create" ? "Create Other Income" : `Edit ${currentNote?.title}`}
                                </h5>
                                <button type="button" className="btn-close"  onClick={() => {
                                                                                    setShowModal(false);
                                                                                    setFormValues({
                                                                                        title: "",
                                                                                        description: "",
                                                                                        date: "",
                                                                                        dueDate: "",
                                                                                        amount: "",
                                                                                        totalMembers: "",
                                                                                    });
                                 }}>

                                 </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    {/* Form Fields */}
                                    <div className="form-group mb-2">
                                        <label className="admin-pages-styling" >Title<span className='text-danger'>*</span></label>
                                        <input type="text" name="title" className="form-control" value={formValues.title} onChange={handleInputChange} />
                                    </div>
                                    <div className=" row form-row d-flex ">
                                        <div className="form-group col-6 mb-1 ">
                                            <label className="admin-pages-styling" >Date<span className='text-danger'>*</span></label>
                                            <input type="date" className="form-control" name="date" value={formValues.date}
                                                onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group col-6 mb-1">
                                            <label className="admin-pages-styling" >Due Date<span className='text-danger'>*</span></label>
                                            <input type="date" className="form-control" name="dueDate" value={formValues.dueDate}
                                                onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="admin-pages-styling" >Description<span className='text-danger'>*</span></label>
                                        <textarea name="description" className="form-control" value={formValues.description}
                                            onChange={handleInputChange} ></textarea>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="admin-pages-styling" >Total Members<span className='text-danger'>*</span></label>
                                        <input type="number" name="totalMembers" className="form-control" value={formValues.totalMembers}
                                            onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="admin-pages-styling" >Amount<span className='text-danger'>*</span></label>
                                        <input type="text" name="amount" className="form-control" value={formValues.amount}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                   
                                      <div className="row mt-3">
                                        <div className="col-6">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{width:"100%"}} >
                                            Cancel
                                        </button>
                                        </div>
                                        <div className="col-6">
                                        <button type="submit" className="btn btn-primary" style={{width:"100%"}}>
                                           {modalType === "create" ? "Add" : "Update"}
                                        </button>
                                        </div>
                                      </div>
                                       
                                        
                                 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div>
                    {/* Modal Backdrop */}
                    <div className="modal-backdrop show"></div>

                    {/* Modal Dialog */}
                    <div
                        className="modal fade show d-block "
                        tabIndex="-1"
                        role="dialog"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <div className="modal-dialog ">
                            <div
                                className="modal-content"
                                style={{ width: "400px", marginTop: "200px" }}
                            >
                                {/* Modal Header */}
                                <div className="modal-header">
                                    <h5 className="modal-title">Delete Other Income?</h5>
                                    <button type="button" className="btn-close" onClick={handleCloseDeleteModal} ></button>
                                </div>

                                {/* Modal Body */}
                                <div className="modal-body">
                                    <p>Are you sure you want to delete this income?</p>
                                </div>

                                {/* Modal Footer */}
                                <div className="modal-footer d-flex justify-content-between">
                                    <button type="button" className="btn btn-outline-secondary" style={{ width: "45%" }}
                                        onClick={handleCloseDeleteModal} > Cancel
                                    </button>
                                    <button type="button" className="btn btn-danger" style={{ width: "45%" }} onClick={handleConfirmDelete}>  Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};


export default FinancialIncome;
