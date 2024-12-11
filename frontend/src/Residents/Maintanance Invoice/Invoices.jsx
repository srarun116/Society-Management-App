import React, { useState } from "react";
import styles from "./Invoices.module.css"
import { RiFileDownloadFill } from "react-icons/ri";


function Invoices() {
    const invoices = [
        { id: "152563", owner: "Terry Rhiel Madsen", billDate: "10/02/2024", paymentDate: "10/02/2024", phone: "9764816457", email: "FrancesLHarris@rhyta.com", maintenance: 1500, pending: 2500 },
        { id: "152563", owner: "Marcus Vaccaro", billDate: "10/02/2024", paymentDate: "10/02/2024", phone: "9601765987", email: "DavidRSkley@dayrep.com", maintenance: 1500, pending: 6500 },
        { id: "152563", owner: "Marcus Schleifer", billDate: "10/02/2024", paymentDate: "10/02/2024", phone: "3216565498", email: "Thomas@jourrapide.com", maintenance: 1500, pending: 7500 },
        { id: "152563", owner: "Cristofer Lipshutz", billDate: "10/02/2024", paymentDate: "10/02/2024", phone: "4216545987", email: "MaryDHurst@jourrapide.com", maintenance: 1500, pending: 8500 },
        { id: "152563", owner: "James Donin", billDate: "10/02/2024", paymentDate: "10/02/2024", phone: "6549873215", email: "Dummymail@gmail.Com", maintenance: 1500, pending: 3500 },
        { id: "152563", owner: "Cristofer Vetrov", billDate: "10/02/2024", paymentDate: "10/02/2024", phone: "8745698556", email: "EdwardJLee@dayrep.com", maintenance: 1500, pending: 2500 },
        { id: "152563", owner: "Ahmad Siphron", billDate: "10/02/2024", paymentDate: "10/02/2024", phone: "5827416935", email: "PeterECardwell@dayrep.com", maintenance: 1500, pending: 9500 },
    ];

    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const handleViewClick = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const closeModal = () => {
        setSelectedInvoice(null);
    };
    return (
        <div className="container-fluid mt-2 ">
            <div className={styles.invoicesMain}>
                <h4 className="mb-3 resident-pages-styling">Maintenance Invoices</h4>
                <div
                    className="table-responsive  bg-white"
                    style={{ overflowY: "auto",  borderRadius: "8px" }}
                >
                    <table className="table align-middle text-center">
                        <thead>
                            <tr style={{ backgroundColor: "#5678E9", fontSize: "14px" }} className="resident-pages-styling">
                                <th  className="text-start">Invoice ID</th>
                                <th >Due Date</th>
                                <th >Payment Date</th>
                                <th >Maintenance Amount</th>
                                <th >Pending Amount</th>
                                <th >Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoices.map((invoice, index) => (
                                <tr key={index}>
                                    <td className="text-start">{invoice.id}</td>
                                    <td>{invoice.billDate}</td>
                                    <td>{invoice.paymentDate}</td>
                                    <td style={{ color: "green" }}>₹ {invoice.maintenance}</td>
                                    <td style={{ color: "red" }}>₹ {invoice.pending}</td>
                                    <td className="d-flex justify-content-center">
                                        <button className="btn-action">
                                            <img src="/Images/view.png" alt="View" onClick={() => handleViewClick(invoices[0])} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                {selectedInvoice && (
                    <div className="modal-overlay">
                        <div className={styles.modalContainer} style={{ maxWidth: "300px" }}>
                            <div className={styles.modalHeader}>
                                <h5 className={styles.modalHeaderTitle}  >Maintenance Invoices</h5>
                                <button className={styles.closebtn} onClick={closeModal}>
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body ">
                                <div className="rounded p-3 mt-3" style={{ backgroundColor: "#F6F8FB" }}>
                                    <div className={styles.detailsGrid }>
                                        <div>
                                            <strong>Invoice Id</strong>
                                            <p>{selectedInvoice.id}</p>
                                        </div>
                                        <div>
                                            <strong>Owner Name</strong>
                                            <p>{selectedInvoice.owner}</p>
                                        </div>
                                        <div>
                                            <strong>Bill Date</strong>
                                            <p>{selectedInvoice.billDate}</p>
                                        </div>
                                        <div>
                                            <strong>Payment Date</strong>
                                            <p>{selectedInvoice.paymentDate}</p>
                                        </div>

                                    </div>
                                    <div className="">
                                        <div>
                                            <strong>Phone Number</strong>
                                            <p>{selectedInvoice.phone}</p>
                                        </div>
                                        <div>
                                            <strong>Email</strong>
                                            <p>{selectedInvoice.email}</p>
                                        </div>
                                        <div className="full-width">
                                            <strong>Address</strong>
                                            <p>{selectedInvoice.address}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={` ${styles.amountDetails}  p-2 rounded    `  } style={{ backgroundColor: "#F6F8FB" }}>
                                    <div>
                                        <strong className="text-dark">Maintenance Amount</strong>
                                        <p className="amount positive">
                                            ₹ {selectedInvoice.maintenance}
                                        </p>
                                    </div>
                                    <div>
                                        <strong className="text-dark">Penalty</strong>
                                        <p className="amount negative text-normal">
                                            ₹ {selectedInvoice.pending}
                                        </p>
                                    </div>
                                    <div className="total border-top">
                                        <strong className="text-dark">Grand Total</strong>
                                        <p>₹ {selectedInvoice.maintenance + selectedInvoice.pending}</p>
                                    </div>
                                </div>
                                <div className="note p-2 rounded mb-2" style={{ backgroundColor: "#F6F8FB" }}>
                                    <strong>Note</strong>
                                    <p className="text-dark">
                                        A visual representation of your spending
                                        categories visual representation.
                                    </p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-primary btn col-12">
                                    <RiFileDownloadFill className='mb-1' /> Download Invoice
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Invoices;