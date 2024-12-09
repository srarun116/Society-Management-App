
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MaintenanceInvoices.css";

const MaintenanceInvoices = () => {
  const [showPaymentModal1, setShowPaymentModal1] = useState(false); // Payment Method Modal
  const [showPaymentModal2, setShowPaymentModal2] = useState(false); // Card Details Modal
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const paymentMethods = [
    { name: "Master Card", icon: "src/Images/MasterCard.png" },
    { name: "Visa Card", icon: "src/Images/VisaCard.png" },
    { name: "Cash Payment", icon: "src/Images/CashPayment.png" },
  ];

  const maintenanceData = [
    {
      id: 1,
      title: "Maintenance",
      BDate: "11/01/2024",
      PDate: "11/01/2024",
      Amount: "1000.00",
      PAmount: "250.00",
      Total: "₹ 1,250",
    },
    {
      id: 2,
      title: "Maintenance",
      BDate: "11/01/2024",
      PDate: "11/01/2024",
      Amount: "1000.00",
      PAmount: "250.00",
      Total: "₹ 1,250",
    },
    {
        id: 2,
        title: "Maintenance",
        BDate: "11/01/2024",
        PDate: "11/01/2024",
        Amount: "1000.00",
        PAmount: "250.00",
        Total: "₹ 1,250",
      },
  ];
  const DMaintenance = [
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

  return (
    <div className="container-fluid" style={{ backgroundColor: "#eff4f9", minHeight: "100vh", padding: "20px" }}>
      <div className="row justify-content-center">
        <div className="col-12">
             {/*Show Maintenance Details*/}
          <div className="border rounded shadow bg-white mt-3 p-4">
            <div className="row align-items-center">
            <div className="col-12 col-lg-4 col-sm-12 col-md-4 col-xl-6 text-start mb-3 mb-sm-2 mb-md-0">
                   <h4 style={{fontSize:"20px"}} className="admin-pages-styling">Show Maintenance Details</h4>
            </div>
                <div className="col-12  col-sm-6 col-xl-3  col-lg-4 col-md-4">
                    <div className="balance-card balance-card-green mb-3 mb-sm-0">
                        <div className="balance-info">
                            <p className="mb-0 text-muted mt-3 maintenance_text admin-pages-styling">Maintenance Amount</p>
                            <p className="balance-amount text-success">₹ 1,500</p>
                        </div>
                    </div>
                </div>
                <div className="col-12  col-sm-6 col-xl-3  col-lg-4 col-md-4  ">
                    <div className="balance-card balance-card-danger">
                        <div className="balance-info">
                            <p className="mb-0 text-muted mt-3 penalty_text admin-pages-styling">Penalty Amount</p>
                            <p className="balance-amount text-danger">₹ 500</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          {/* Pending Maintenance */}
          <div className="border rounded shadow bg-white mt-3 p-4">
            <div className="row align-items-center">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 style={{ fontSize: "20px" }} className="admin-pages-styling">Pending Maintenance</h2>
                <Link to="/Invoices" className="btn btn-primary admin-pages-styling">
                  View Invoice
                </Link>
              </div>
              <div className="row">
                {maintenanceData.map((note, index) => (
                  <div className=" col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4 admin-pages-styling" key={index}>
                    <div className="card shadow-sm border-0 note-card bg-white">
                      {/* Card Header */}
                      <div
                        className="card-header d-flex justify-content-between align-items-center text-white"
                        style={{ backgroundColor: "#5678e9" }}
                      >
                        <h5 className="mb-0 admin-pages-styling" style={{ fontSize: "14px" }}>{note.title}</h5>
                        <span className="badge1 Owner1 fw-normal admin-pages-styling">Pending</span>
                      </div>
                      {/* Card Body */}
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" }}>Bill Date</span>
                          <span className="text-secondary admin-pages-styling" style={{ fontSize: "12px" }}>{note.BDate}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" }}>Pending Date</span>
                          <span className="text-secondary admin-pages-styling" style={{ fontSize: "12px" }}>{note.PDate}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 border-top">
                          <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" }}>Maintenance Amount</span>
                          <span className="text-danger admin-pages-styling" style={{ fontSize: "12px" }}>{note.Amount}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" }}>Penalty Amount</span>
                          <span className="text-danger admin-pages-styling" style={{ fontSize: "12px" }}>{note.PAmount}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 border-top">
                          <span className="text-muted  admin-pages-styling" style={{ fontSize: "12px" }}>Grand Total</span>
                          <span className="text-success admin-pages-styling" style={{ fontSize: "12px" }}>{note.Total}</span>
                        </div>
                        <button
                          className="btn btn-primary col-12 admin-pages-styling"
                          onClick={() => setShowPaymentModal1(true)}
                        >
                          Pay Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Modal */}
            {showPaymentModal1 && (
              <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content" style={{ maxWidth: "350px" }}>
                    <div className="modal-header">
                      <h5 className="modal-title">Payment Method</h5>
                      <button type="button" className="btn-close" onClick={() => setShowPaymentModal1(false)}></button>
                    </div>
                    <div className="modal-body">
                      {paymentMethods.map((method, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center shadow p-2 border rounded mb-2"
                        >
                          <div className="d-flex align-items-center">
                            <img
                              src={method.icon}
                              alt={method.name}
                              className="me-2"
                              style={{ width: "40px", height: "40px" }}
                            />
                            <span>{method.name}</span>
                          </div>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.name}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between ps-3 pe-3 mb-3">
                      <button className="btn btn-outline-secondary" onClick={() => setShowPaymentModal1(false)}  style={{ width: "48%" }}>
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setShowPaymentModal1(false);
                          setShowPaymentModal2(true);
                        }}
                        disabled={!selectedMethod}
                         style={{ width: "48%" }}
                      >
                         Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card Details Modal */}
            {showPaymentModal2 && (
               <div
               className="modal fade show d-block"
               style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
           >
               <div className="modal-dialog modal-dialog-centered">
                   <div className="modal-content" style={{ maxWidth: "350px", margin: "auto" }}>
                       {/* Modal Header */}
                       <div className="modal-header">
                           <h5 className="modal-title">Payment Method</h5>
                           <button
                               type="button"
                               className="btn-close"
                               onClick={() => setShowPaymentModal2(false)}
                           ></button>
                       </div>

                       {/* Modal Body */}
                       <div className="modal-body">
                           <form>
                               {/* Card Name */}
                               <div className="mb-3">
                                   <label htmlFor="cardName" className="form-label">
                                       Card Name<span className="text-danger">*</span>
                                   </label>
                                   <input
                                       type="text"
                                       id="cardName"
                                       className="form-control"
                                       value={cardName}
                                       onChange={(e) => setCardName(e.target.value)}
                                       placeholder="Marcus George"
                                       required
                                   />
                               </div>

                               {/* Card Number */}
                               <div className="mb-3">
                                   <label htmlFor="cardNumber" className="form-label">
                                       Card Number<span className="text-danger">*</span>
                                   </label>
                                   <div className="input-group">
                                       <input
                                           type="text"
                                           id="cardNumber"
                                           className="form-control"
                                           value={cardNumber}
                                           onChange={(e) => setCardNumber(e.target.value)}
                                           placeholder="1234 5678 8745 5212"
                                           maxLength="19"
                                           required
                                       />
                                       <span className="input-group-text">
                                           <img
                                               src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                                               alt="MasterCard"
                                               style={{ width: "20px", height: "20px" }}
                                           />
                                       </span>
                                   </div>
                               </div>

                               {/* Expiry Date and CVV */}
                               <div className="row">
                                   <div className="col-6 mb-3">
                                       <label htmlFor="expiryDate" className="form-label">
                                           Expiry Date<span className="text-danger">*</span>
                                       </label>
                                       <input
                                           type="date"
                                           id="expiryDate"
                                           className="form-control"
                                           value={expiryDate}
                                           onChange={(e) => setExpiryDate(e.target.value)}
                                           placeholder="MM/YY"
                                           maxLength="5"
                                           required
                                       />
                                   </div>
                                   <div className="col-6 mb-3">
                                       <label htmlFor="cvv" className="form-label">
                                           CVV<span className="text-danger">*</span>
                                       </label>
                                       <input
                                           type="password"
                                           id="cvv"
                                           className="form-control"
                                           value={cvv}
                                           onChange={(e) => setCvv(e.target.value)}
                                           placeholder="CVV"
                                           maxLength="3"
                                           required
                                       />
                                   </div>
                               </div>

                               {/* Modal Footer */}
                               <div className="d-flex justify-content-between">
                                   <button
                                       type="button"
                                       className="btn btn-outline-secondary"
                                       onClick={() => setShowPaymentModal2(false)}
                                       style={{ width: "48%" }}
                                   >
                                       Cancel
                                   </button>
                                   <button
                                       type="submit"
                                       className="btn btn-primary"
                                       disabled={!cardName || !cardNumber || !expiryDate || !cvv}
                                       style={{ width: "48%" }}
                                   >
                                       Pay Now
                                   </button>
                               </div>
                           </form>
                       </div>
                   </div>
               </div>
           </div>
            )}
          </div>
                    {/* Due Maintanance*/}
                    <div className="border rounded shadow bg-white mt-3 p-4">
                        <div className="row align-items-center">
                            <div className="d-flex justify-content-between align-items-center ">
                                <h2 style={{ fontSize: "20px" }} className="admin-pages-styling">Due Maintanance</h2>
                            </div>
                            <div className="row">
                                {DMaintenance.map((note , index) => (
                                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4" key={index}>
                                        <div className="card shadow-sm border-0 note-card bg-white">
                                            {/* Card Header */}
                                            <div className="card-header d-flex justify-content-between align-items-center   text-white" style={{ backgroundColor: "#5678e9" }}>
                                                <h5 className="mb-0" style={{ fontSize: "14px" }}>
                                                    {note.title}
                                                </h5>
                                                <span className="badge1 Owner1 fw-normal admin-pages-styling">Pending</span>
                                            </div>
                                            {/* Card Body */}

                                            <div className="card-body">
                                                {/* Request Date */}
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" }}> Date</span>
                                                    <span className="text-secondary admin-pages-styling" style={{ fontSize: "12px" }} > {note.Date} </span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2 border-top">
                                                    <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" }}> Amount</span>
                                                    <span className="text-danger admin-pages-styling" style={{ fontSize: "12px" }} > {note.Amount} </span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" }}>Due Maintenance Amount</span>
                                                    <span className="text-danger admin-pages-styling" style={{ fontSize: "12px" }} > {note.PAmount} </span>
                                                </div>
                                                <div className=" border-top pt-2">
                                                    <button className="btn-primary btn col-12 admin-pages-styling"
                                                       onClick={() => setShowPaymentModal1(true)}
                                                    >Pay Now</button>
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

export default MaintenanceInvoices