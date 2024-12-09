
import React, { useState } from "react";
import styles from "./VisitorTracking.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const VisitorTracking = () => {
    const [visitors, setVisitors] = useState([
        { name: "Evelyn Harper", phone: "97852 12369", date: "2024-01-10", wing: "A", unit: "1001", time: "15:45" },
        { name: "Wade Warren", phone: "97852 25893", date: "2024-01-11", wing: "B", unit: "1002", time: "02:45" },
        { name: "Guy Hawkins", phone: "97589 55563", date: "2024-01-15", wing: "C", unit: "1003", time: "15:00" },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState("All"); // Week filter state
    const [newVisitor, setNewVisitor] = useState({
        name: "",
        phone: "",
        wing: "",
        unit: "",
        date: "",
        time: "",
    });

    // Week-based filtering logic
    const getWeekDates = (weekNumber) => {
        const startOfYear = new Date("2024-01-01");
        const startOfWeek = new Date(startOfYear.setDate(startOfYear.getDate() + (weekNumber - 1) * 7));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);
        return { startOfWeek, endOfWeek };
    };

    const filteredVisitors =
        selectedWeek === "All"
            ? visitors
            : visitors.filter((visitor) => {
                const visitorDate = new Date(visitor.date);
                const { startOfWeek, endOfWeek } = getWeekDates(Number(selectedWeek));
                return visitorDate >= startOfWeek && visitorDate <= endOfWeek;
            });

            const formatTime = (time) => {
                if (!time) {
                    return ""; // Return empty string if time is undefined or empty
                }
                
                const [hour, minute] = time.split(":").map(Number);
                const isPM = hour >= 12;
                const formattedHour = hour % 12 || 12;
                const meridiem = isPM ? "PM" : "AM";
                return `${formattedHour}:${minute.toString().padStart(2, "0")} ${meridiem}`;
            };
            

    // Handle form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVisitor({ ...newVisitor, [name]: value });
    };

    // Save visitor and close modal
    const handleSaveVisitor = (e) => {
        e.preventDefault();

        setVisitors([...visitors, newVisitor]);
        setModalVisible(false);
        setNewVisitor({
            name: "",
            phone: "",
            wing: "",
            unit: "",
            date: "",
            time: "",
        });
    };

    return (
        <div className={`${styles.visitorTrackingContainer} container-fluid  p-4`} >
            <div className="row ">
                <div className="col-12 bg-white rounded-4 shadow p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <p style={{ fontFamily: "poppins" , fontWeight: "600" ,fontSize: "20px" }}>Visitor Tracking</p>
                        <div>
                            <select
                                className={`btn border me-2 ${styles.selectWeek}`}
                                value={selectedWeek}
                                onChange={(e) => setSelectedWeek(e.target.value)}
                            >
                                <option value="All">Week All</option>
                                <option value="1">Week 1</option>
                                <option value="2">Week 2</option>
                                <option value="3">Week 3</option>
                                <option value="4">Week 4</option>
                            </select>
                            <button className="btn btn-primary" style={{ fontFamily: "poppins" , fontWeight: "500" }} onClick={() => setModalVisible(true)}>
                                + Add Visitor Details
                            </button>
                        </div>
                    </div>

                    {/* Visitors Table */}
                    <div className={`table-responsive ${styles.scrollable}`}>
                        <table className="table  rounded-table">
                            <thead className={`${styles.tableLightTh}`}>
                                <tr className="text-start" style={{ fontFamily: "poppins" , fontWeight: "bold" , fontSize:"14px" }}>
                                    <th className="text-start security-pages-styling">Visitor Name</th>
                                    <th className="security-pages-styling" >Phone Number</th>
                                    <th className="security-pages-styling">Date</th>
                                    <th className="security-pages-styling">Unit Number</th>
                                    <th className="text-center security-pages-styling">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVisitors.length > 0 ? (
                                    filteredVisitors.map((visitor, index) => (
                                        <tr key={index} style={{ fontFamily: "poppins" , fontWeight: "500" , fontSize:"16px" }}>
                                            <td className="text-start">{visitor.name}</td>
                                            <td>{visitor.phone}</td>
                                            <td>{visitor.date}</td>
                                            <td>
                                               <span className={styles.wingBackground}> {visitor.wing} </span>   {visitor.unit}
                                            </td>
                                            <td className="text-center"> <span className={styles.timeBackground}> {formatTime(visitor.time)}</span></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center security-pages-styling">
                                            No visitors found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalVisible && (
                <div className={`modal fade show d-block ${styles.modalBackdropShow}`} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className={`modal-content ${styles.modalContent}`}>
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ fontFamily: "poppins" , fontWeight: "600" }}>Add Visitor Details</h5>
                               
                            </div>
                            <form onSubmit={handleSaveVisitor}>
                                <div className="modal-body">

                                    <div className="mb-3">
                                        <label className="form-label security-pages-styling">Visitor Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            value={newVisitor.name}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label security-pages-styling">Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone"
                                            value={newVisitor.phone}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label security-pages-styling">Wing</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="wing"
                                                    value={newVisitor.wing}
                                                    onChange={handleInputChange}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label security-pages-styling">Unit</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="unit"
                                                    value={newVisitor.unit}
                                                    onChange={handleInputChange}
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label security-pages-styling">Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    name="date"
                                                    value={newVisitor.date}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="mb-3">
                                                <label className="form-label security-pages-styling">Time</label>
                                                <input
                                                    type="time"
                                                    className="form-control"
                                                    name="time"
                                                    value={newVisitor.time}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>



                                </div>
                                <div className="row mx-2 mb-3">
                                    <div className="col-6">
                                    <button type="button" className="btn btn-secondary w-100" onClick={() => setModalVisible(false)}>
                                        Cancel
                                    </button>
                                    </div>
                                  
                                  <div className="col-6">
                                  <button type="submit" className="btn btn-primary w-100">
                                        Save
                                    </button>
                                  </div>
                                  
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisitorTracking;
