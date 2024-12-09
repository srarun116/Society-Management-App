import React, { useState } from 'react'
import "./OtherIncomeInvoice.css";
import { FiX } from 'react-icons/fi';
import { RiFileDownloadFill } from "react-icons/ri";

function OtherIncomeInvoice() {
    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal1, setShowPaymentModal1] = useState(false); // Payment Method Modal
    const [showPaymentModal2, setShowPaymentModal2] = useState(false); // Card Details Modal
    const [selectedMethod, setSelectedMethod] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const paymentMethods = [
        { name: "Master Card", icon: "src/Images/MasterCard.png" },
        { name: "Visa Card", icon: "src/Images/VisaCard.png" },
        { name: "Cash Payment", icon: "src/Images/CashPayment.png" },
    ];
    const DMaintenance = [
        {
            title: "Due Event Payment",
            name: "Navratri",
            Date: "11/01/2024",
            Amount: "1000.00",

        },
        {
            title: "Due Event Payment",
            name: "Navratri",
            Date: "11/01/2024",
            Amount: "1000.00",
        },
        {
            title: "Due Event Payment",
            name: "Navratri",
            Date: "11/01/2024",
            Amount: "1000.00",
        },
        {
            title: "Due Event Payment",
            name: "Navratri",
            Date: "11/01/2024",
            Amount: "1000.00",
        },
    ]
    return (
        <div>
            <div className="container-fluid" style={{ backgroundColor: "#eff4f9", padding: "20px" }}>
                <div className="row justify-content-center">
                    <div className="border rounded shadow bg-white mt-3 p-4">
                        <div className="row align-items-center">
                            <div className="d-flex justify-content-between align-items-center mb-3 ">
                                <h2 style={{ fontSize: "20px" }} className='admin-pages-styling'>Due Event Payment</h2>
                                <button className="btn btn-primary admin-pages-styling" onClick={() => handleShowModal(true)}>
                                    View Invoice
                                </button>
                            </div>

                            {/* Modal */}
                            {showModal && (
                                <div
                                    className="modal fade show d-block"
                                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                                >
                                    <div
                                        className="modal-dialog modal-dialog-centered"
                                        style={{ maxWidth: "350px" }}
                                    >
                                        <div className="modal-content">
                                            {/* Modal Header */}
                                            <div className="modal-header">
                                                <h5 className='admin-pages-styling'>Event Invoices List</h5>
                                                <button
                                                    className="btn-close"
                                                    onClick={handleCloseModal}
                                                > 
                                                </button>
                                            </div>
                                          

                                            {/* Modal Body */}
                                            <div className="modal-body">
                                               <div className='p-2 rounded'  style={{backgroundColor:"#F6F8FB"}}>
                                               <div className="mb-2">
                                                    <div className="row g-2">
                                                        <div className="col-6">
                                                            <strong className='admin-pages-styling'>Invoice Id</strong>
                                                            <p>125465</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <strong className='admin-pages-styling'>Owner Name</strong>
                                                            <p>Terry Rhiel Madsen</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <strong className='admin-pages-styling'>Bill Date</strong>
                                                            <p>10/02/2024</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <strong className='admin-pages-styling'>Payment Date</strong>
                                                            <p>10/02/2024</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <strong className='admin-pages-styling'>Event Date</strong>
                                                            <p>6549873521</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <strong className='admin-pages-styling'>Phone Number</strong>
                                                            <p>6549873521</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-3 ">
                                                    <strong className='admin-pages-styling'>Email</strong>
                                                    <p>MaryDHurst@jourrapide.com</p>
                                                    <strong className='admin-pages-styling'>Event Name</strong>
                                                    <p>Ganesh Chaturthi</p>
                                                    <strong className='admin-pages-styling'>Description</strong>
                                                    <p>
                                                        The celebration of Ganesh Chaturthi involves the
                                                        installation of clay idols of Lord Ganesa in OurResident.
                                                    </p>
                                                </div>
                                               </div>

                                                {/* Amount Section */}
                                                <div className=" p-3 mt-3 rounded"  style={{backgroundColor:"#F6F8FB"}}>
                                                    <div className="d-flex justify-content-between">
                                                        <strong className='admin-pages-styling'>Maintenance Amount</strong>
                                                        <p className="text-success admin-pages-styling">₹ 1500.00</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between border-top pt-2 mt-2">
                                                        <strong className='admin-pages-styling'>Grand Total</strong>
                                                        <p className='admin-pages-styling'>₹ 1850.00</p>
                                                    </div>
                                                </div>

                                                {/* Note Section */}
                                                <div className="p-2 mt-3 rounded"  style={{backgroundColor:"#F6F8FB"}}>
                                                    <strong className='admin-pages-styling'>Note</strong>
                                                    <p>
                                                        A visual representation of your spending categories visual
                                                        representation.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Modal Footer */}
                                            <div className="modal-footer">
                                                <button className="btn btn-primary col-12">
                                                <RiFileDownloadFill className='mb-1' /> Download Invoice
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )}

                            <div className="row">
                                {DMaintenance.map((note) => (
                                    <div className="col-sm-6 col-md-4 col-lg-6 col-xl-4 col-xxl-3 mb-4">
                                        <div className="card shadow-sm border-0 note-card bg-white">
                                            {/* Card Header */}
                                            <div className="card-header d-flex justify-content-between align-items-center   text-white" style={{ backgroundColor: "#5678e9" }}>
                                                <h5 className="mb-0 admin-pages-styling" style={{ fontSize: "14px" }}>
                                                    {note.title}
                                                </h5>
                                                <span className="badge1 Owner1 fw-normal admin-pages-styling">Pending</span>
                                            </div>
                                            {/* Card Body */}

                                            <div className="card-body">
                                                {/* Request Date */}
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" }}> Event Name</span>
                                                    <span className="text-secondary admin-pages-styling" style={{ fontSize: "12px" }} > {note.name} </span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" }}> Event Due Date  </span>
                                                    <span className="text-secondary admin-pages-styling" style={{ fontSize: "12px" }} > {note.Date} </span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="text-muted admin-pages-styling" style={{ fontSize: "12px" }}> Amount</span>
                                                    <span className="text-danger admin-pages-styling" style={{ fontSize: "12px" }} > {note.Amount} </span>
                                                </div>
                                                <div className=" pt-2">
                                                    <button className="btn-primary btn col-12 "
                                                        onClick={() => setShowPaymentModal1(true)}
                                                    >Pay Now</button>
                                                </div>

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
                                            <h5 className="modal-title admin-pages-styling">Payment Method</h5>
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
                                                            src=""
                                                            alt={method.name}
                                                            className="me-2"
                                                            style={{ width: "40px", height: "40px" }}
                                                        />
                                                        <span className='admin-pages-styling'>{method.name}</span>
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
                                            <button className="btn btn-outline-secondary fw-bold" onClick={() => setShowPaymentModal1(false)} style={{ width: "48%" }}>
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
                                            <h5 className="modal-title admin-pages-styling">Payment Method</h5>
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
                                                    <label htmlFor="cardName" className="form-label admin-pages-styling">
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
                                                    <label htmlFor="cardNumber" className="form-label admin-pages-styling">
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
                                                        <label htmlFor="expiryDate" className="form-label admin-pages-styling">
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
                                                        <label htmlFor="cvv" className="form-label admin-pages-styling">
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
                </div>
            </div>
        </div>
    )
}

export default OtherIncomeInvoice