import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ResidentManagement.css";
import {
  FaUser,
  FaHome,
  FaTag,
  FaEye,
  FaEdit,
  FaPlusSquare,
  FaTrash,
  FaXRay,
} from "react-icons/fa"; // Using react-icons as placeholders
import { FaX } from "react-icons/fa6";
import { FiArrowLeft } from "react-icons/fi";

export default function Rm() {
  const [residents, setResidents] = useState([
    {
      id: 1,
      name: "Evelyn Harper",
      unit: "A",
      Number: "1001",
      unitStatus: "Occupied",
      residentStatus: "Tenant",
      phoneNumber: "97587 85828",
      members: 1,
      vehicles: 2,
    },
    {
      id: 2,
      name: "-",
      unit: "B",
      Number: "1002",
      unitStatus: "Vacate",
      residentStatus: "Owner",
      phoneNumber: "--",
      members: "-",
      vehicles: "-",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleOpenDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);


  const [showVacateModal, setShowVacateModal] = useState(false);
  const handleCloseVacateModal = () => setShowVacateModal(false);


  const [showCreateModal, setShowCreateModal] = useState(false); // New modal state for create modal
  const handleCloseCreateModal = () => setShowCreateModal(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [agreeChecked, setAgreeChecked] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const navigate = useNavigate();


  const [showViewModal, setViewShowModal] = useState(false);
  const handleOpenViewModal = () => setViewShowModal(true);
  const handleCloseViewModal = () => setViewShowModal(false);
  // Close create modal

  const handleSave = () => {
    if (selectedStatus === "Occupied" && agreeChecked) {
      navigate("/admin/addresidents");
    } else if (selectedStatus === "Vacate") {
      setShowVacateModal(true);
    }
    handleCloseModal();
  };

  const handleCreateClick = () => {
    setShowVacateModal(false); // Close the vacate modal
    setShowCreateModal(true); // Open the create modal
  };

  const handleDelete = () => {
    if (idToDelete) {
      console.log("Deleting ID:", idToDelete); // Perform the delete action here (e.g., API call or state update)
      // Reset the ID after deletion
      setIdToDelete(null);
    }
    handleCloseCreateModal();
  };

  const badgeStyle = (residentStatus) => {
    const baseStyle = {
      color: "white",
      width: "100px",
      height: "31px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5px",
    };
    if (residentStatus === "Tenant")
      return {
        ...baseStyle,
        color: "rgba(236, 72, 153, 1)",
        backgroundColor: "rgba(255, 241, 248, 1)",
      };
    if (residentStatus === "Owner")
      return {
        ...baseStyle,
        color: "rgba(79, 70, 229, 1)",
        backgroundColor: "rgba(241, 240, 255, 1)",
      };
    return { ...baseStyle, color: "black" };
  };
  const UnitbadgeStyle = (unitStatus) => {
    const baseStyle = {
      color: "white",
      width: "100px",
      height: "31px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5px",
    };
    if (unitStatus === "Occupied")
      return {
        ...baseStyle,
        color: "rgba(20, 184, 166, 1)",
        backgroundColor: "rgba(236, 255, 255, 1)",
      };
    if (unitStatus === "Vacate")
      return {
        ...baseStyle,
        color: "rgba(147, 51, 234, 1)",
        backgroundColor: "rgba(255, 246, 255, 1)",
      };
    return { ...baseStyle, color: "black" };
  };

  return (
    <div className=" d-flex flex-column flex-md-row main-content">
      <div className="flex-grow-1 p-2">
        <div className="container-fluid">
          <div className="bg-white residentmng">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="admin-pages-styling">Resident Tenant and Owner Details</h4>

              <button
                className="mainColor2 admin-pages-styling addresidentbtn text-white ms-3 flex-end d-flex align-items-center p-2 border-0"
                onClick={handleOpenModal}
              >
                <FaPlusSquare className="me-2" />
                Add New Resident Details
              </button>
            </div>

            <div className="table-responsive residentmngtable">
              {/* Header Row */}
              <div
                className="row p-2 text-center  text-dark "
                style={{
                  backgroundColor: "#eef1fd",
                  borderRadius: "10px 10px ",
                }}
              >
                <div className="col-2 fw-bold">Full Name</div>
                <div className="col-1 fw-bold text-center">UnitNumber</div>
                <div className="col-2 fw-bold text-center">Unit Status</div>
                <div className="col-2 fw-bold text-center">Resident Status</div>
                <div className="col-2 fw-bold text-center">Phone Number</div>
                <div className="col-1 fw-bold text-center">Members</div>
                <div className="col-1 fw-bold text-center">Vehicle</div>
                <div className="col-1 fw-bold text-center">Action</div>
              </div>

              {/* Rows */}
              {residents.map((resident, index) => (
                <div
                  className="row border-bottom p-2 align-items-center"
                  key={index}
                >
                  {/* Full Name */}
                  <div className="col-2 d-flex align-items-center">
                    <img
                      src="/Images/Profileimg.png"
                      alt="avatar"
                      className="rounded-circle profileimg me-2"
                    />
                    <span>{resident.name}</span>
                  </div>

                  {/* Unit Number */}
                  <div className="col-1  text-center">
                    <span className="unitnumberspan">{resident.unit}</span>
                    <span>{resident.Number}</span>
                  </div>

                  {/* Unit Status */}
                  <div className="col-2 text-center">
                    <span
                      className="badge rounded-pill "
                      style={UnitbadgeStyle(resident.unitStatus)}
                    >
                      {resident.unitStatus === "Occupied" && (
                        <img
                          className="me-2"
                          src="src/Images/buildings-2.png"
                          alt=""
                        />
                      )}
                      {resident.unitStatus === "Vacate" && (
                        <FaTag className="me-2" />
                      )}
                      {resident.unitStatus}
                    </span>
                  </div>

                  {/* Resident Status */}
                  <div className="col-2 text-center">
                    <span
                      className="badge rounded-pill"
                      style={badgeStyle(resident.residentStatus)}
                    >
                      {resident.residentStatus === "Tenant" && (
                        <FaUser className="me-2 Fauser" />
                      )}
                      {resident.residentStatus === "Owner" && (
                        <FaHome className="me-2 Fahome" />
                      )}
                      {resident.residentStatus}
                    </span>
                  </div>

                  {/* Phone Number */}
                  <div className="col-2 text-center">
                    {resident.phoneNumber}
                  </div>

                  {/* Members */}
                  <div className="col-1 text-center">{resident.members}</div>

                  {/* Vehicles */}
                  <div className="col-1 text-center">{resident.vehicles}</div>

                  {/* Action */}
                  <div className="col-1 text-center">
                    <div className="d-flex align-items-center justify-content-between">
                     
                       <img src="/Images/Edit_btn.png"  height={30}/>
                      
                       <img src="/Images/View_btn.png"  onClick={handleOpenViewModal}  height={30}/>
                     
                      <img src="/Images/Delete_btn.png"  onClick={handleOpenDeleteModal}  height={30} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Modal
              className=""
              show={showModal}
              onHide={handleCloseModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Residence Status</Modal.Title>
              </Modal.Header>
              <Modal.Body className="">

                <Form>
                  <div
                    className="radio-group d-flex justify-content-between"
                    style={{ gap: "12px" }}
                  >
                    <Form.Check
                      className="formcheck border "
                      type="radio"
                      label="Occupied"
                      name="residenceStatus"
                      value="Occupied"
                      checked={selectedStatus === "Occupied"}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                    <Form.Check
                      className="formcheck border"
                      type="radio"
                      label="Vacate"
                      name="residenceStatus"
                      value="Vacate"
                      checked={selectedStatus === "Vacate"}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                  </div>
                  <Form.Group className="agreement-checkbox">
                    <Form.Check
                      type="checkbox"
                      label={`By submitting, you agree to select ${selectedStatus}.`}
                      checked={agreeChecked}
                      onChange={(e) => setAgreeChecked(e.target.checked)}
                      className=" mt-2"
                      id="custom-checkbox"
                    />
                  </Form.Group>
                </Form>

              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between ">
                <button
                  className="btn1  bg-white border  align-items-center"
                  variant="secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="mainColor2 border-0 createresidencebtn text-white font-weight-bold"
                  onClick={handleSave}
                  disabled={!agreeChecked}
                >
                  Save
                </button>
              </Modal.Footer>
            </Modal>

            <Modal
              className="square-modal"
              show={showVacateModal}
              onHide={handleCloseVacateModal}
              centered
            >
              <Modal.Header>
                <Modal.Title>Residence Status</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="d-flex align-items-center gap-4">
                  <Form.Group controlId="wingSelect" className="flex-grow-1">
                    <Form.Label>
                      Wing<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control as="select">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                      <option>E</option>
                      <option>F</option>
                      <option>G</option>
                      <option>H</option>
                      <option>I</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="unitSelect" className="flex-grow-1">
                    <Form.Label>
                      Unit<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control as="select">
                      <option>1001</option>
                      <option>1002</option>
                      <option>1003</option>
                      <option>1004</option>
                      <option>2001</option>
                      <option>2002</option>
                      <option>2003</option>
                      <option>2004</option>
                      <option>3001</option>
                      <option>3002</option>
                      <option>3003</option>
                      <option>3004</option>
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between">
                <button
                  className="btn-secondary  font-weight-bold btn1"
                  onClick={handleCloseVacateModal}
                >
                  Cancel
                </button>
                <button
                  className="mainColor2 createresidencebtn text-white font-weight-bold"
                  onClick={handleCloseVacateModal}
                >
                  Create
                </button>
              </Modal.Footer>
            </Modal>

            {/* New Create Modal */}
            <Modal
              className="Round-modal"
              show={showCreateModal}
              onHide={handleCloseCreateModal}
              centered
            >
              <Modal.Header>
                <Modal.Title>
                  <strong>Do you want to vacate the finlay flat?</strong>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delate all details?</p>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between">
                <button
                  className=""
                  variant="secondary"
                  onClick={handleCloseCreateModal}
                >
                  Cancel
                </button>
                <button
                  className="confirmbtn"
                  variant="secondary"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
              </Modal.Footer>
            </Modal>


            {/* view Modal */}

            <Modal className="viewowner" show={showViewModal} onHide={handleCloseViewModal} centered>
              <Modal.Header className="col-12 d-flex justify-content-between">
                <h5 className=" mb-0"> <FiArrowLeft onClick={handleCloseViewModal} /> View Owner Details</h5>

              </Modal.Header>
              <Modal.Body className="">
                {/* Profile Section */}
                <div className="row text-center mb-2">
                  <div className="col-12">
                    <img
                      src="src/Images/ProfileiMG.png" // Replace with the image URL
                      alt="Profile"
                      className="rounded-circle img-thumbnail"
                      style={{ width: '100px', height: '100px' }}
                    />
                    <h6 className="mt-2 mb-0">Roger Lubin</h6>
                    <p className="text-muted">RogerLubin@gmail.com</p>

                  </div>
                </div>

                {/* Basic Details Section */}
                <div className="container-fluid bg-light row mb-4 ms-1 ">
                  <div className="col-12 d-flex justify-content-between border-bottom">
                    <p className="fw-bold mb-0">Wing</p>
                    <p className="text-muted">A</p>
                  </div>

                  <div className="col-12 d-flex justify-content-between  border-bottom">
                    <p className="fw-bold mb-0">Unit</p>
                    <p className="text-muted">101</p>
                  </div>
                  <div className="col-12 d-flex justify-content-between  border-bottom">
                    <p className="fw-bold mb-0">Age</p>
                    <p className="text-muted">20</p>
                  </div>
                  <div className="col-12 d-flex justify-content-between  border-bottom">
                    <p className="fw-bold mb-0">Gender</p>
                    <p className="text-muted">Male</p>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="container-fluid bg-light mb-4">
                  <p className="fw-bold">Document</p>
                  <div className="d-flex justify-content-between align-items-center border p-2 rounded mb-2">
                    <div className="d-flex">
                      <div>

                        <img src="src/Images/Image2.png" alt="" />
                      </div>
                      <div>
                        <p className="mb-0">Aadharcard Front Side.JPG</p>
                        <p className="text-muted mb-0">3.5 MB</p>
                      </div>
                    </div>
                    <FaEye style={{ fontSize: "20px" }} className="text-muted " />{/* Use Bootstrap Icons */}
                  </div>
                  <div className="d-flex justify-content-between align-items-center border p-2 rounded mb-2">
                    <div className="d-flex">
                      <div>

                        <img src="src/Images/Group1.png" alt="" />
                      </div>
                      <div>
                        <p className="mb-0">Aadharcard Front Side.JPG</p>
                        <p className="text-muted mb-0">3.5 MB</p>
                      </div>
                    </div>
                    <FaEye style={{ fontSize: "20px" }} className="text-muted " />{/* Use Bootstrap Icons */}
                  </div>
                </div>

                {/* Member Counting Section */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center bg-primary text-white px-3 py-2 rounded">
                    <p className="mb-0">Member Counting</p>
                    <p className="mb-0">02</p>
                  </div>
                  <div className="border rounded p-3 ">
                    <div className="row mb-2 p-3">
                      <div className="col-12 d-flex justify-content-between border-bottom p-2">
                        <p className="fw-bold mb-0">First Name</p>
                        <p className="text-muted mb-0">Roger Lubin</p>
                      </div>
                      <div className="col-12 d-flex justify-content-between border-bottom p-2">
                        <p className="fw-bold mb-0">Phone No</p>
                        <p className="text-muted mb-0">9123455555</p>
                      </div>

                      <div className="col-12 d-flex justify-content-between border-bottom p-2">
                        <p className="fw-bold mb-0">Age</p>
                        <p className="text-muted mb-0">20</p>
                      </div>
                      <div className="col-12 d-flex justify-content-between border-bottom   p-2">
                        <p className="fw-bold mb-0">Relation</p>
                        <p className="text-muted mb-0">Brother</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>

            {/* Delete Modal */}
            <Modal
              className="Round-modal"
              show={showDeleteModal}
              onHide={handleCloseDeleteModal}
              centered
            >
              <Modal.Header>
                <Modal.Title>
                  <p>Do you want to delate?</p>
                </Modal.Title>
                <FaX onClick={handleCloseDeleteModal} style={{ fontSize: "20px" }} className="text-muted " />{/* Use Bootstrap Icons */}

              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delate  details?</p>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between">
                <button
                  className="btn1"
                  variant="secondary"
                  onClick={handleCloseDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="confirmbtn"
                  variant="secondary"
                  onClick={handleCloseDeleteModal}
                >
                  Confirm
                </button>
              </Modal.Footer>
            </Modal>


          </div>
        </div>
      </div>

    </div>
  );
}

