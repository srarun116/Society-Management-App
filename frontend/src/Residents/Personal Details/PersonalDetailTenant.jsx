import React from "react";
import { Link } from "react-router-dom";
import "./PersonalDetail.css";

function PersonalDetailTenant() {
    const notes = [
        {   
            title: "Arlene McCoy",
            Email: "Arlenemccoy@gmail.com",
            Phone: "+91 99130 52221",
            Age: "22",
            Gender: "Male",
            Relation: "Uncle"
        },
        {   
            title: "Arlene McCoy",
            Email: "BrooklynSimmons@gmail.com",
            Phone: "+91 99233 66134",
            Age: "22",
            Gender: "Male",
            Relation: "Brother"
        },
        {   
            title: "Arlene McCoy",
            Email: "JennyWilson@gmail.com",
            Phone: "+91 99130 52221",
            Age: "22",
            Gender: "Male",
            Relation: "Sister"
        },
        {   
            title: "Arlene McCoy",
            Email: "JaneCooper@gmail.com",
            Phone: "+91 99130 52221",
            Age: "22",
            Gender: "Male",
            Relation: "Mother"
        },
    ];
    const Vehicle = [
        {
            Vehicletitle: "Preventive Measures",
            VehicleName:"Splendor",
            VehicleNumber: "GJ-5216",
        },
        {
            Vehicletitle: "Preventive Measures",
            VehicleName:"Splendor",
            VehicleNumber: "GJ-5216",
        },
        {
            Vehicletitle: "Preventive Measures",
            VehicleName:"Splendor",
            VehicleNumber: "GJ-5216",
        },
        {
            Vehicletitle: "Preventive Measures",
            VehicleName:"Splendor",
            VehicleNumber: "GJ-5216",
        },
    ]
    const Maintenance =[
        {
          title: "Maintenance",
          BDate: "11/01/2024",
          PDate: "11/01/2024",
          Amount: "1000.00",
          PAmount: "250.00",
          Total: "₹ 1,250"  
        },
        {
            title: "Maintenance",
            BDate: "11/01/2024",
            PDate: "11/01/2024",
            Amount: "1000.00",
            PAmount: "250.00",
            Total: "₹ 1,250" 
        },
        {
          title: "Maintenance",
          BDate: "11/01/2024",
          PDate: "11/01/2024",
          Amount: "1000.00",
          PAmount: "250.00",
          Total: "₹ 1,250" 
        },
    ]
    const DMaintenance =[
        {
          title: "Maintenance",
          Date: "11/01/2024",
          Amount: "1000.00",
          PAmount: "250.00", 
        },
        {
            title: "Maintenance",
            Date: "11/01/2024",
            Amount: "1000.00",
            PAmount: "250.00", 
          },
    ]
    const Community =[
        {
            title: "Community Initiatives",
            Date:"01/02/2024",
            Time: "10:15 AM",
            description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in."
        },
        {
            title: "Community Initiatives",
            Date:"01/02/2024",
            Time: "10:15 AM",
            description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in."
        },
        {
            title: "Community Initiatives",
            Date:"01/02/2024",
            Time: "10:15 AM",
            description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in."
        },
        {
            title: "Community Initiatives",
            Date:"01/02/2024",
            Time: "10:15 AM",
            description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in."
        },
    ]
  return (
    <div className="container-fluid" style={{ backgroundColor: "#eff4f9", minHeight: "100vh", padding: "20px" }}>
      <div className="row justify-content-center">
        <div className="col-12">
{/* Tabs for Owner and Tenant */}
          <div className="d-flex ms-1">
          <Link to="/resident/personaldetails" className="rounded-top border-top-only btn btn-light text-dark px-4 py-2">
                Owner
            </Link>
            <button className="rounded-top border-top-only btn btn-primary px-4 py-2">Tenant</button>
          </div>
{/* Profile Details */}
<div className="border rounded shadow bg-white mb-4  p-4">
            <div className="row align-items-center">
                 {/* Right Side - Form Details */}
              <div className="col-lg-7">
                <div className="row ">
                  <div className="col-md-3">
                    <h6 className="text-muted mb-1">Owner Name</h6>
                    <p className="text-secondary">Arlene McCoy</p>
                  </div>
                  <div className="col-md-3">
                    <h6 className="text-muted mb-1">Owner Phone</h6>
                    <p className="text-secondary">+91 9575225165</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-muted mb-1">Owner Address</h6>
                    <p className="text-secondary">C-101,Dhara Arcade , Mota Varacha Surat.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>         
{/* Profile form */}
          <div className="border rounded shadow bg-white  p-4">
            <div className="row align-items-center">
              {/* Left Side - Profile Image */}
              <div className="col-lg-2 d-flex flex-column align-items-center">
                <img
                  src="../../Images/personalprofile.png"
                  className="img-thumbnail rounded-circle mb-2"
                  alt="Profile"
                  style={{ width: "120px", height: "120px" }}
                />
              </div>

                 {/* Right Side - Form Details */}
              <div className="col-lg-7">
                <div className="row mb-3">
                  <div className="col-md-3">
                    <h6 className="text-muted mb-1">Full Name</h6>
                    <p className="text-secondary">Arlene McCoy</p>
                  </div>
                  <div className="col-md-3">
                    <h6 className="text-muted mb-1">Phone Number</h6>
                    <p className="text-secondary">+91 99130 44537</p>
                  </div>
                  <div className="col-md-4">
                    <h6 className="text-muted mb-1">Email Address</h6>
                    <p className="text-secondary">ArleneMcCoy25@gmail.com</p>
                  </div>
                  <div className="col-md-2">
                    <h6 className="text-muted mb-1">Gender</h6>
                    <p className="text-secondary">Male</p>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <h6 className="text-muted mb-1">Wing</h6>
                    <p className="text-secondary">A</p>
                  </div>
                  <div className="col-md-3">
                    <h6 className="text-muted mb-1">Age</h6>
                    <p className="text-secondary">20</p>
                  </div>
                  <div className="col-md-4">
                    <h6 className="text-muted mb-1">Unit</h6>
                    <p className="text-secondary">1001</p>
                  </div>
                  <div className="col-md-2">
                    <h6 className="text-muted mb-1">Relation</h6>
                    <p className="text-secondary">Father</p>
                  </div>
                </div>
              </div>
              {/* File Attachments */}
              <div className="col-lg-3">
                <div className="border rounded p-2 mb-2 d-flex">
                 <img className="p-2" src="../../Images/image2.png" alt="" />
                  <div>
                    <p style={{fontSize:"12px"}}>Syncfusion Adharcard Front Side.JPG</p>
                    <span className="text-secondary" style={{fontSize:"12px"}}>3.5 MB</span>
                  </div>
                </div>
                <div className="border rounded p-2 mb-2 d-flex">
                 <img src="../../Images/image2.png" className="p-2" alt="" />
                  <div>
                    <p style={{fontSize:"12px"}}>Address Proof Front Side.PDF</p>
                    <span className="text-secondary" style={{fontSize:"12px"}}>3.5 MB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
 {/* Member : (04) start */}
          <div className="border rounded shadow bg-white mt-3 p-4">
            <div className="row align-items-center">
            <div className="d-flex justify-content-between align-items-center ">
                <h2 style={{ fontSize: "20px" }}>Member : (04)</h2>
            </div>
            <div className="row">
                {notes.map((note , index) => (
                      <div className=" col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4" key={index}>
                      <div className="card shadow-sm border-0 note-card bg-white">
                          {/* Card Header */}
                          <div
                              className="d-flex justify-content-between align-items-center p-2 rounded-top"
                              style={{ backgroundColor: "#5678e9", color: "#fff" }} >
                              <h5 className="card-title mb-0" style={{ fontSize: "14px"}} >
                                  {note.title}
                              </h5>
                          </div>
                          {/* Card Body */}
                          <div className="card-body">
                              {/* Request Date */}
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}> Email</span>
                                  <span style={{ fontSize: "12px", fontWeight: "bold"}} > {note.Email} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}> Phone Number</span>
                                  <span style={{ fontSize: "12px", fontWeight: "bold"}} > {note.Phone} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}> Age</span>
                                  <span style={{ fontSize: "12px", fontWeight: "bold"}} > {note.Age} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}> Gender</span>
                                  <span style={{ fontSize: "12px", fontWeight: "bold"}} > {note.Gender} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}> Relation</span>
                                  <span style={{ fontSize: "12px", fontWeight: "bold"}} > {note.Relation} </span>
                              </div>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
            </div>
          </div>

{/* Vehicle : (04) start */}
          <div className="border rounded shadow bg-white mt-3 p-4">
            <div className="row align-items-center">
            <div className="d-flex justify-content-between align-items-center ">
                <h2 style={{ fontSize: "20px" }}>Vehicle : (04)</h2>
            </div>
            <div className="row">
                {Vehicle.map((note , index) => (
                      <div className=" col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4" onKeyDown={index}>
                      <div className="card shadow-sm border-0 note-card bg-white">
                          {/* Card Header */}
                          <div
                              className="d-flex justify-content-between align-items-center p-2 rounded-top"
                              style={{ backgroundColor: "#5678e9", color: "#fff" }} >
                              <h5 className="card-title mb-0" style={{ fontSize: "14px"}} >
                                  {note.Vehicletitle}
                              </h5>
                          </div>
                          {/* Card Body */}
                          <div className="card-body">
                              {/* Request Date */}
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}> Vehicle Name</span>
                                  <span style={{ fontSize: "12px", fontWeight: "bold"}} > {note.VehicleName} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}>Vehicle Number</span>
                                  <span style={{ fontSize: "12px", fontWeight: "bold"}} > {note.VehicleNumber} </span>
                              </div>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
            </div>
          </div>
 {/*Show Maintenance Details*/}
          <div className="border rounded shadow bg-white mt-3 p-4">
          <div className="row align-items-center">
            <div className="col-12 col-lg-4 col-sm-12 col-md-4 col-xl-6 text-start mb-3 mb-sm-2 mb-md-0">
                   <h4 style={{fontSize:"20px"}}>Show Maintenance Details</h4>
            </div>
                <div className="col-12  col-sm-6 col-xl-3  col-lg-4 col-md-4">
                    <div className="balance-card balance-card-green mb-3 mb-sm-0">
                        <div className="balance-info">
                            <p className="mb-0 text-muted mt-3 maintenance_text">Maintenance Amount</p>
                            <p className="balance-amount text-success">₹ 1,500</p>
                        </div>
                    </div>
                </div>
                <div className="col-12  col-sm-6 col-xl-3  col-lg-4 col-md-4  ">
                    <div className="balance-card balance-card-danger">
                        <div className="balance-info">
                            <p className="mb-0 text-muted mt-3 penalty_text">Penalty Amount</p>
                            <p className="balance-amount text-danger">₹ 500</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

 {/* Pending Maintanance */}
            <div className="border rounded shadow bg-white mt-3 p-4">
            <div className="row align-items-center">
            <div className="d-flex justify-content-between align-items-center ">
                <h2 style={{ fontSize: "20px" }}>Pending Maintanance</h2>
            </div>
            <div className="row">
                {Maintenance.map((note , index) => (
                      <div className=" col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4" key={index}>
                      <div className="card shadow-sm border-0 note-card bg-white">
                          {/* Card Header */}
                          <div className="card-header d-flex justify-content-between align-items-center   text-white" style={{backgroundColor:"#5678e9"}}>
                  <h5 className="mb-0" style={{ fontSize: "14px"}}>
                    {note.title}
                  </h5>
                  <span className="badge1 Owner">Pending</span>
                </div>
                          {/* Card Body */}
                        
                          <div className="card-body">
                              {/* Request Date */}
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}>Bill Date</span>
                                  <span className="text-secondary" style={{ fontSize: "12px"}} > {note.BDate} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2 ">
                                  <span className="text-muted" style={{ fontSize: "12px" }}>Pending Date</span>
                                  <span className="text-secondary " style={{ fontSize: "12px"}} > {note.PDate} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2 border-top">
                                  <span className="text-muted" style={{ fontSize: "12px" }}>Maintanance Amount</span>
                                  <span className="text-danger" style={{ fontSize: "12px"}} > {note.Amount} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted text-start" style={{ fontSize: "12px" }}>Maintenance Penalty Amount</span>
                                  <span className="text-danger" style={{ fontSize: "12px"}} > {note.PAmount} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2 border-top">
                                  <span className="text-muted fw-bold" style={{ fontSize: "12px"}}>Grand Total</span>
                                  <span className="text-success" style={{ fontSize: "12px"}} > {note.Total} </span>
                              </div>
                              <button className="btn-primary btn col-12" >Pay Now</button>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
            </div>
          </div>
 {/* Due Maintanance*/}
           <div className="border rounded shadow bg-white mt-3 p-4">
            <div className="row align-items-center">
            <div className="d-flex justify-content-between align-items-center ">
                <h2 style={{ fontSize: "20px" }}>Due Maintanance</h2>
            </div>
            <div className="row">
                {DMaintenance.map((note , index) => (
                      <div className=" col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4" key={index}>
                      <div className="card shadow-sm border-0 note-card bg-white">
                          {/* Card Header */}
                          <div className="card-header d-flex justify-content-between align-items-center   text-white" style={{backgroundColor:"#5678e9"}}>
                  <h5 className="mb-0" style={{ fontSize: "14px"}}>
                    {note.title}
                  </h5>
                  <span className="badge1 Owner">Pending</span>
                </div>
                          {/* Card Body */}
                        
                          <div className="card-body">
                              {/* Request Date */}
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}> Date</span>
                                  <span className="text-secondary" style={{ fontSize: "12px"}} > {note.Date} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2 border-top">
                                  <span className="text-muted" style={{ fontSize: "12px" }}> Amount</span>
                                  <span className="text-danger" style={{ fontSize: "12px"}} > {note.Amount} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}>Due Maintenance Amount</span>
                                  <span className="text-danger" style={{ fontSize: "12px"}} > {note.PAmount} </span>
                              </div>
                            <div className=" border-top pt-2">
                                     <button className="btn-primary btn col-12 " >Pay Now</button>
                            </div>
                              
                          </div>
                      </div>
                  </div>
                ))}
            </div>
            </div>
          </div>
  {/*Announcement Details */}
          <div className="border rounded shadow bg-white mt-3 p-4">
            <div className="row align-items-center">
            <div className="d-flex justify-content-between align-items-center ">
                <h2 style={{ fontSize: "20px" }}>Announcement Details</h2>
            </div>
            <div className="row">
                {Community.map((note , index) => (
                      <div className=" col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4" key={index}>
                      <div className="card shadow-sm border-0 note-card bg-white">
                          {/* Card Header */}
                          <div
                              className="d-flex justify-content-between align-items-center p-2 rounded-top"
                              style={{ backgroundColor: "#5678e9", color: "#fff" }} >
                              <h5 className="card-title mb-0" style={{ fontSize: "14px"}} >
                                  {note.title}
                              </h5>
                          </div>
                          {/* Card Body */}
                          <div className="card-body">
                              {/* Request Date */}
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}>Announcement Date</span>
                                  <span style={{ fontSize: "12px", fontWeight: "bold"}} > {note.Date} </span>
                              </div>
                              <div className="d-flex justify-content-between mb-2">
                                  <span className="text-muted" style={{ fontSize: "12px" }}>Announcement Time</span>
                                  <span style={{ fontSize: "12px", fontWeight: "bold"}} > {note.Time} </span>
                              </div>
                              <div className="mb-2">
                                    <h6 className="mb-1 text-start text-muted" style={{ fontSize: "12px" }}>Description</h6>
                                     <p className="card-text" style={{ fontSize: "11px" }}>{note.description}</p>
                                </div>
                          </div>
                      </div>
                  </div>
                ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default PersonalDetailTenant;