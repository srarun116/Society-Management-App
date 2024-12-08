
import { useState } from 'react';
import './ServiceAndComplaint.css';

function ServiceAndComplaint() {
    const [activeTab, setActiveTab] = useState('Complaint');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container-fluid   " >

            {/* Tabs Section */}
            <div className="rounded mt-3">
                <ul className="nav   d-flex   border-0">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'Complaint' ? 'active' : ''}`}
                            onClick={() => handleTabClick('Complaint')}
                            style={{
                                background: activeTab === 'Complaint' ? 'linear-gradient(90deg, #FF5722, #FF9800)' : 'white',
                                color: activeTab === 'Complaint' ? 'white' : 'black',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                                border: 'none',
                                padding: '10px',
                                fontSize: '14px',  fontWeight: '500',
                               
                            }}
                        >
                          <h6 > Complaint Submission </h6>  
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'Request' ? 'active' : ''}`}
                            onClick={() => handleTabClick('Request')}
                            style={{
                                background: activeTab === 'Request' ? 'linear-gradient(90deg, #FF5722, #FF9800)' : 'white',
                                color: activeTab === 'Request' ? 'white' : 'black',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                                border: 'none',
                                padding: '10px ',
                                fontSize: '14px',
                                fontWeight: '500',
                              
                            }}
                        >  
                        <h6 >  Request Submission </h6>
                        </button>
                    </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content border border-top-0 p-3 bg-white rounded-bottom">
                    {activeTab === 'Complaint' && <ComplaintSubmission />}
                    {activeTab === 'Request' && <RequestSubmission />}
                </div>
            </div>
        </div>
    );
}



const ComplaintSubmission = () => {
    const [showModal, setShowModal] = useState(false);
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            title: "Broken Window",
            requestDate: "2023-07-10",
            description: "The window in my apartment is broken.",
            status: "Open",
        }
    ]);
    const [formData, setFormData] = useState({
        title: "",
        requestDate: "",
        description: "",
        status: "Open",
    });

    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setComplaints([...complaints, { ...formData, id: Date.now() }]);
        setFormData({ title: "", requestDate: "", description: "", status: "Open" });
        setShowModal(false);
    };

    // Handle dropdown toggle
    const toggleDropdown = (id) => {
        setDropdownIndex(dropdownIndex === id ? null : id);
    };

    // Show delete modal
    const handleDeleteClick = (complaint) => {
        setSelectedComplaint(complaint);
        setShowDeleteModal(true);
    };

    // Confirm delete action
    const handleConfirmDelete = () => {
        setComplaints(complaints.filter((c) => c.id !== selectedComplaint.id));
        setShowDeleteModal(false);
        setSelectedComplaint(null);
    };

    // Close delete modal
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedComplaint(null);
    };

    return (
        <div className="container-fluid pt-3 mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className='complaint-header'>Complaint</h5>
                <button className="btn btn-primary  " style={{ fontSize: "16px" }} onClick={() => setShowModal(true)}>
                    Create Complaint
                </button>
            </div>

            {/* Complaint Cards */}
            <div className="row">
                {complaints.map((complaint) => (
                    <div  className=" col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4 mb-3" key={complaint.id}>
                        <div style={{minHeight:"220px"}} className="card shadow-sm  note-card bg-white">
                            <div
                                className="d-flex justify-content-between align-items-center p-2 rounded-top"
                                style={{ backgroundColor: "#5678e9", color: "#fff" }} >
                                <h5 className="card-title mb-0" style={{ fontSize: "14px" }}>
                                    {complaint.title}
                                </h5>
                                <img
                                    src="../../Images/menu.png"
                                    role="button"
                                    tabIndex="0"
                                    alt="Menu"
                                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                    onClick={() => toggleDropdown(complaint.id)}
                                />
                                {dropdownIndex === complaint.id && (
                                    <div className="dropdown-menu show"
                                        style={{
                                            position: "absolute", top: "40px", right: "10px",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                        }}>
                                        <button className="dropdown-item"
                                            onClick={() => handleDeleteClick(complaint)}  > Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="card-body" >
                                {/* Request Date */}
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted complaint-header" style={{ fontSize: "14px" }}>
                                        Request Date
                                    </span>
                                    <span
                                    className='complaint-header complaint-header'
                                        style={{ fontSize: "13px", fontWeight: "bold", }} >
                                            {complaint.requestDate}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted complaint-header" style={{ fontSize: "14px" }}>
                                        Status
                                    </span>{" "}
                                    <span
                                        className={`badge1 ${complaint.status === "Open"
                                            ? "open"
                                            : complaint.status === "Pending"
                                                ? "pending"
                                                : "solve"
                                            }`}
                                    >
                                        {complaint.status}
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <h5 className="text-muted mb-1 complaint-header" style={{ fontSize: "14px" }}  >
                                        Description
                                    </h5>
                                    <p className="text-normal mb-0 complaint-header complaint-header" style={{ fontSize: "14px" }}>{complaint.description} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Complaint Modal */}
            {showModal && (
                <>
                    <div className="modal-backdrop show"></div>
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content" style={{ maxWidth: "400px" }}>
                                <div className="modal-header">
                                    <h5 className="modal-title d-n complaint-header">Create Complaint</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        {/* Title */}
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label complaint-header">
                                                Title<span className="text-danger">*</span>
                                            </label>
                                            <input type="text" className="form-control" id="title" name="title" value={formData.title}
                                                onChange={handleChange} required />
                                        </div>

                                        {/* Request Date */}
                                        <div className="mb-3">
                                            <label htmlFor="requestDate" className="form-label complaint-header">
                                                Request Date<span className="text-danger">*</span>
                                            </label>
                                            <input type="date" className="form-control" id="requestDate" name="requestDate"
                                                value={formData.requestDate} onChange={handleChange} required/>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label complaint-header">
                                                Description<span className="text-danger">*</span>
                                            </label>
                                            <textarea className="form-control"
                                                id="description"
                                                name="description"
                                                rows="3"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        {/* Status */}
                                        <div className="mb-3">
                                            <label className="form-label complaint-header">Status</label>
                                            <div className="d-flex gap-2d-flex justify-content-evenly">
                                                <div className="col-4 form-check border p-2 me-1 rounded text-center">
                                                    <input
                                                        type="radio"
                                                        id="statusOpen"
                                                        name="status"
                                                        value="Open"
                                                        checked={formData.status === "Open"}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="statusOpen" className='complaint-header ms-1'>Open</label>
                                                </div>
                                                <div className="col-4 form-check border p-2 me-1 rounded text-center">
                                                    <input
                                                        type="radio"
                                                        id="statusPending"
                                                        name="status"
                                                        value="Pending"
                                                        checked={formData.status === "Pending"}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="statusPending" className='complaint-header ms-1'>Pending</label>
                                                </div>
                                                <div className="col-4 form-check border p-2 me-1 rounded text-center">
                                                    <input
                                                        type="radio"
                                                        id="statusSolved"
                                                        name="status"
                                                        value="Solved"
                                                        
                                                        checked={formData.status === "Solved"}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="statusSolved" className='complaint-header ms-1'>Solved</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowModal(false)}
                                                style={{ width: "49%" }}
                                            >
                                               <h6 className='complaint-header pt-1'> cancel </h6>
                                            </button>
                                            <button type="submit" className="btn  btn-primary" style={{ width: "49%" }}>
                                              <h6 className='complaint-header pt-1'> Create </h6>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <h5 className="modal-title mb-3">
                                    Delete {selectedComplaint?.title}?
                                </h5>
                                <p>Are you sure you want to delete this?</p>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className="btn  btn-outline-secondary me-2"
                                        onClick={handleCloseDeleteModal}
                                        style={{ width: "48%" }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={handleConfirmDelete}
                                        style={{ width: "48%" }}
                                    >
                                        Delete
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

const RequestSubmission = () => {
    const [showModal, setShowModal] = useState(false);
    const [complaints, setComplaints] = useState([
        {
            id: 1,
            title: "Complaint 1",
            requestDate: "2023-08-01",
            description: "Description of Complaint 1",
            status: "Open",
        },
        {
            id: 2,
            title: "Complaint 2",
            requestDate: "2023-08-02",
            description: "Description of Complaint 2",
            status: "Pending",
        },
        {
            id: 3,
            title: "Complaint 3",
            requestDate: "2023-08-03",
            description: "Description of Complaint 3",
            status: "Solved",
        },
        {
            id: 4,
            title: "Complaint 4",
            requestDate: "2023-08-04",
            description: "Description of Complaint 4",
            status: "Open",
        },      
            {
                id: 5,
                title: "Complaint 5",
                requestDate: "2023-08-05",
                description: "Description of Complaint 5",
                status: "Pending",
            }
            ,{
                id: 6,
                title: "Complaint 6",
                requestDate: "2023-08-06",
                description: "Description of Complaint 6",
                status: "Solved",
            }
    ]);
    const [formData, setFormData] = useState({
        id:1,

        title: "",
        requestDate: "",
        description: "",
        status: "Open",
        
    });

    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setComplaints([...complaints, { ...formData, id: Date.now() }]);
        setFormData({ title: "", requestDate: "", description: "", status: "Open" });
        setShowModal(false);
    };

    // Handle dropdown toggle
    const toggleDropdown = (id) => {
        setDropdownIndex(dropdownIndex === id ? null : id);
    };

    // Show delete modal
    const handleDeleteClick = (complaint) => {
        setSelectedComplaint(complaint);
        setShowDeleteModal(true);
    };

    // Confirm delete action
    const handleConfirmDelete = () => {
        setComplaints(complaints.filter((c) => c.id !== selectedComplaint.id));
        setShowDeleteModal(false);
        setSelectedComplaint(null);
    };

    // Close delete modal
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedComplaint(null);
    };
    return (
        <div className="container-fluid pt-3 mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className='complaint-header'>Request</h5>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Create Request
                </button>
            </div>

            {/* Complaint Cards */}
            <div className="row">
                {complaints.map((complaint) => (
                    <div className=" col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4 mb-3" key={complaint.id}>
                        <div style={{minHeight:"220px"}} className="card shadow-sm border-0 note-card bg-white">
                            <div
                                className="d-flex justify-content-between align-items-center p-2 rounded-top"
                                style={{ backgroundColor: "#5678e9", color: "#fff" }} >
                                <h5 className="card-title mb-0" style={{ fontSize: "14px" }}>
                                    {complaint.title}
                                </h5>
                                <img
                                    src="../../Images/menu.png"
                                    role="button"
                                    tabIndex="0"
                                    alt="Menu"
                                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                    onClick={() => toggleDropdown(complaint.id)}
                                />
                                {dropdownIndex === complaint.id && (
                                    <div className="dropdown-menu show"
                                        style={{
                                            position: "absolute", top: "40px", right: "10px",
                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                        }}>
                                        <button className="dropdown-item"
                                            onClick={() => handleDeleteClick(complaint)}  > Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="card-body">
                                {/* Request Date */}
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted complaint-header" style={{ fontSize: "14px" }}>
                                        Request Date
                                    </span>
                                    <span
                                    className='complaint-header'
                                        style={{ fontSize: "12px", fontWeight: "bold", }} >
                                            {complaint.requestDate}
                                    </span>
                                </div>

                                {/* Status */}
                                <div className="d-flex justify-content-between ">
                                    <span className="text-muted complaint-header" style={{ fontSize: "14px" }}>
                                        Status
                                    </span>{" "}
                                    <span
                                        className={`badge1 ${complaint.status === "Open"
                                            ? "open"
                                            : complaint.status === "Pending"
                                                ? "pending"
                                                : "solve"
                                            }`}
                                    >
                                        {complaint.status}
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <h5 className="text-muted mb-1 complaint-header" style={{ fontSize: "14px" }}  >
                                        Description
                                    </h5>
                                    <p className="text-normal mb-0 complaint-header" style={{ fontSize: "14px" }}>{complaint.description} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create  Request Modal */}
            {showModal && (
                <>
                    <div className="modal-backdrop show"></div>
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content" style={{ maxWidth: "400px" }}>
                                <div className="modal-header">
                                    <h5 className="modal-title complaint-header">Create  Request</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        {/* Title */}
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label complaint-header">
                                                Title<span className="text-danger">*</span>
                                            </label>
                                            <input type="text" className="form-control" id="title" name="title" value={formData.title}
                                                onChange={handleChange} required />
                                        </div>

                                        {/* Request Date */}
                                        <div className="mb-3">
                                            <label htmlFor="requestDate" className="form-label complaint-header">
                                                Request Date<span className="text-danger">*</span>
                                            </label>
                                            <input type="date" className="form-control" id="requestDate" name="requestDate"
                                                value={formData.requestDate} onChange={handleChange} required/>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label complaint-header">
                                                Description<span className="text-danger">*</span>
                                            </label>
                                            <textarea className="form-control"
                                                id="description"
                                                name="description"
                                                rows="3"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        {/* Status */}
                                        <div className="mb-3">
                                            <label className="form-label complaint-header">Status</label>
                                            <div className="d-flex gap-2d-flex justify-content-evenly">
                                                <div className="col-4 form-check border p-2 me-1 rounded text-center">
                                                    <input
                                                        type="radio"
                                                        id="statusOpen"
                                                        name="status"
                                                        value="Open"
                                                        checked={formData.status === "Open"}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="statusOpen " className='complaint-header ms-1'>Open</label>
                                                </div>
                                                <div className="col-4 form-check border p-2 me-1 rounded text-center">
                                                    <input
                                                        type="radio"
                                                        id="statusPending"
                                                        name="status"
                                                        value="Pending"
                                                        checked={formData.status === "Pending"}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="statusPending " className='complaint-header ms-1'>Pending</label>
                                                </div>
                                                <div className="col-4 form-check border p-2 me-1 rounded text-center">
                                                    <input
                                                        type="radio"
                                                        id="statusSolved"
                                                        name="status"
                                                        value="Solved"
                                                        checked={formData.status === "Solved"}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="statusSolved " className='complaint-header ms-1'>Solved</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowModal(false)}
                                                style={{ width: "49%" }}
                                            >
                                              <h6 className='complaint-header pt-1'> Cancel </h6>  
                                            
                                            </button>
                                            <button type="submit" className="btn  btn-primary" style={{ width: "49%" }}>
                                            <h6 className='complaint-header pt-1'> Create </h6>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <h5 className="modal-title mb-3">
                                    Delete {selectedComplaint?.title}?
                                </h5>
                                <p>Are you sure you want to delete this?</p>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className="btn  btn-outline-secondary me-2"
                                        onClick={handleCloseDeleteModal}
                                        style={{ width: "48%" }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={handleConfirmDelete}
                                        style={{ width: "48%" }}
                                    >
                                        Delete
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

// const NoteCard1 = ({ note, isOpen, onToggleDropdown, onDeleteClick }) => {
//     return (
//         <div className="col-md-3 mb-4">
//             <div className="card shadow-sm border-0 note-card bg-white">
//                 {/* Card Header */}
//                 <div
//                     className="d-flex justify-content-between align-items-center p-2 rounded-top"
//                     style={{ backgroundColor: "#5678e9", color: "#fff" }}
//                 >
//                     <h5
//                         className="card-title mb-0"
//                         style={{ fontSize: "14px" }}
//                     >
//                         {note.title}
//                     </h5>
//                     <img
//                         src="src/Images/menu.png"
//                         alt="Menu"
//                         style={{ width: "20px", height: "20px", cursor: "pointer" }}
//                         onClick={onToggleDropdown}
//                     />
//                     {isOpen && (
//                         <div
//                             className="dropdown-menu show"
//                             style={{
//                                 position: "absolute",
//                                 top: "40px",
//                                 right: "10px",
//                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                             }}
//                         >
//                             <button
//                                 className="dropdown-item"
//                                 onClick={() => onDeleteClick(note)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     )}
//                 </div>

//                 {/* Card Body */}
//                 <div className="card-body">
//                     {/* Request Date */}
//                     <div className="d-flex justify-content-between mb-2">
//                         <span className="text-muted" style={{ fontSize: "12px" }}>
//                             Request Date
//                         </span>
//                         <span
//                             style={{
//                                 fontSize: "12px",
//                                 fontWeight: "bold",
//                             }}
//                         >
//                             {note.Date}
//                         </span>
//                     </div>

//                     {/* Status */}
//                     <div className="d-flex justify-content-between mb-2">
//                         <span className="text-muted" style={{ fontSize: "12px" }}>
//                             Status
//                         </span>
//                         <span
//                             className="badge bg-light text-primary"
//                             style={{
//                                 fontSize: "12px",
//                                 padding: "5px 10px",
//                                 borderRadius: "20px",
//                                 fontWeight: "bold",
//                             }} > Open
//                         </span>
//                     </div>

//                     {/* Description */}
//                     <div>
//                         <h6 className="text-muted mb-1" style={{ fontSize: "12px" }}  >
//                             Description
//                         </h6>
//                         <p className="text-normal mb-0" style={{ fontSize: "12px" }}>{note.description} </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


export default ServiceAndComplaint;