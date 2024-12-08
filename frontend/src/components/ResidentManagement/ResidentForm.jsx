import React, { useRef, useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ResidentForm.css"; // Additional styling
import "./FormUI.css"; // Main CSS
import { FaSortDown } from "react-icons/fa6";

const ResidentForm = () => {
  const fileInputRefs = useRef({});
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNo: "",
    email: "",
    age: "",
    gender: "",
    wing: "",
    unit: "",
    relation: "",
    aadharFront: null,
    aadharBack: null,
    addressProof: null,
    rentAgreement: null,
    members: Array(3).fill({
      fullName: "",
      phoneNo: "",
      email: "",
      age: "",
      gender: "",
      relation: "",
    }),
  });

  const [members, setMembers] = useState([
    {
      fullName: "",
      phone: "",
      email: "",
      age: "",
      gender: "Male",
      relation: "",
    },
  ]);

  const [vehicles, setVehicles] = useState([
    { type: "Two Wheelers", name: "", number: "" },
  ]);

  const handleMemberChange = (index, event) => {
    const { name, value } = event.target;
    const updatedMembers = [...members];
    updatedMembers[index][name] = value;
    setMembers(updatedMembers);
    console.log("Members Data:", updatedMembers);
  };

  const handleAddMember = () => {
    setMembers([
      ...members,
      {
        fullName: "",
        phone: "",
        email: "",
        age: "",
        gender: "Male",
        relation: "",
      },
    ]);
  };

  const handleVehicleChange = (index, name, value) => {
    const updatedVehicles = [...vehicles];
    updatedVehicles[index][name] = value;
    setVehicles(updatedVehicles);
    console.log("Vehicles Data:", updatedVehicles);
  };

  const handleAddVehicle = () => {
    setVehicles([...vehicles, { type: "Two Wheelers", name: "", number: "" }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Final Members Data:", members);
    console.log("Final Vehicles Data:", vehicles);
  };

  const [vehicleData, setVehicleData] = useState([
    { type: "Two Wheelers", name: "", number: "" },
  ]);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (name, file) => {
    setFormData({ ...formData, [name]: file });
  };

  // Trigger file upload click
  const handleFileUploadClick = (field) => {
    if (fileInputRefs.current[field]) {
      fileInputRefs.current[field].click();
    }
  };

  return (
    <div className=" form-container" style={{ backgroundColor: "#eff4f9" }}>
      <div className="row justify-content-center container-fluid">
        <div>
          <Link to="/OwnerForm">
            <button
              style={{
                width: "135px",
                height: "49px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "500",
              }}
              className="mainColor2   text-white hovermaincolor rounded-top text-dark bg-white border-top-only btn"
            >
              Owner
            </button>
          </Link>
          <Link to="/admin/TenantForm">
            <button
              style={{
                width: "135px",
                height: "49px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "500",
              }}
              className="hovermaincolor   bg-white  rounded-top border-top-only text-dark btn"
            >
              Tenant
            </button>
          </Link>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded shadow bg-white"
        >
          <div className="row">
            {/* Left Image */}
            <div className="col-lg-2 d-flex flex-column align-items-center">
              <div
                className="image"
                onClick={() => handleFileUploadClick("profilePhoto")}
              >
                <img
                  src="/src/Images/Frame.png"
                  className="img-thumbnail rounded-circle"
                  alt="Profile"
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={(ref) => (fileInputRefs.current["profilePhoto"] = ref)}
                  style={{ display: "none" }}
                  onChange={(e) =>
                    handleFileChange("profilePhoto", e.target.files[0])
                  }
                />
                <h5 className="text-primary mt-2">Add Photo</h5>
              </div>
            </div>

            {/* Right Form */}
            <div className="col-lg-10">
              <div className="row mb-3">
                <div className="col-md-4">
                  <label>
                    Full Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border-dark"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label>
                    Phone No<span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control border-dark"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label>
                    Email Address<span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control border-dark"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <label>
                    Age<span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control border-dark"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label>
                    Gender<span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control border-dark"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label>
                    Wing<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border-dark"
                    name="wing"
                    value={formData.wing}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label>
                    Unit<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border-dark"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* File Upload Section */}
          <div className="row mb-3 mx-auto">
            {[
              { label: "Upload AadharCard (Front)", name: "aadharFront" },
              { label: "Upload AadharCard (Back)", name: "aadharBack" },
              { label: "Address Proof", name: "addressProof" },
              { label: "Rent Agreement", name: "rentAgreement" },
            ].map(({ label, name }) => (
              <div className="col-md-3" key={name}>
                <label>{label}</label>
                <div
                  className="upload text-center"
                  onClick={() => handleFileUploadClick(name)}
                >
                  <img
                    src="/src/Images/image1.png"
                    alt="Upload"
                    className="upload-image"
                  />
                  <h6 className="text-primary mt-2">
                    Upload a file or drag and drop
                  </h6>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={(ref) => (fileInputRefs.current[name] = ref)}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(name, e.target.files[0])}
                />
              </div>
            ))}
          </div>
        </form>

        {/* Member Details */}
        <div  className=" bg-white mt-4 border container-fluid form-container ">
          <form   onSubmit={handleSubmit}>
            <div className="form-container container-fluid p-4 bg-white">
              <div className="d-flex justify-content-between">
                <div className="d-flex ">
                  <h4>Member Counting:</h4>{" "}
                  <h6 className="text-muted mt-4 ms-2">(Other Members)</h6>
                </div>
                <button
                  type="button"
                  className="text-dark border-0 bg-transparent mb-3 d-flex align-items-center"
                  onClick={handleAddMember}
                >
                  Add Member <FaSortDown />
                </button>
              </div>
              {members.map((member, index) => (
                <div className="row mb-3" key={index}>
                  <div className="col-md-2">
                    <label>Full Name</label>
                    <input
                      type="text"
                      className="form-control border-dark"
                      name="fullName"
                      value={member.fullName}
                      onChange={(e) => handleMemberChange(index, e)}
                      placeholder="Enter Full Name"
                    />
                  </div>
                  <div className="col-md-2">
                    <label>Phone No</label>
                    <input
                      type="text"
                      className="form-control border-dark"
                      name="phone"
                      value={member.phone}
                      onChange={(e) => handleMemberChange(index, e)}
                      placeholder="Enter Phone No"
                    />
                  </div>
                  <div className="col-md-2">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control border-dark"
                      name="email"
                      value={member.email}
                      onChange={(e) => handleMemberChange(index, e)}
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="col-md-2">
                    <label>Age</label>
                    <input
                      type="number"
                      className="form-control border-dark"
                      name="age"
                      value={member.age}
                      onChange={(e) => handleMemberChange(index, e)}
                      placeholder="Enter Age"
                    />
                  </div>
                  <div className="col-md-2">
                    <label>Gender</label>
                    <select
                      className="form-control border-dark"
                      name="gender"
                      value={member.gender}
                      onChange={(e) => handleMemberChange(index, e)}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <label>Relation</label>
                    <input
                      type="text"
                      className="form-control border-dark"
                      name="relation"
                      value={member.relation}
                      onChange={(e) => handleMemberChange(index, e)}
                      placeholder="Enter Relation"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div  className="form-container bg-white mt-4">
              <div  className=" d-flex justify-content-between">
                <h4>Vehicle Counting:</h4>
                <button
                  type="button"
                  className="bg-white border-0 text-dark mb-3 d-flex align-items-center"
                  onClick={handleAddVehicle}
                >
                  Add Vehicle <FaSortDown />
                </button>
              </div>
              {vehicles.map((vehicle, index)  => (
                <div className="row mb-3 col-md-12" key={index}>
                  <div className="col-4 ">
                    <label>Vehicle Type</label>
                    <select
                      className="form-control border-dark"
                      value={vehicle.type}
                      onChange={(e) =>
                        handleVehicleChange(index, "type", e.target.value)
                      }
                    >
                      <option>Two Wheelers</option>
                      <option>Four Wheelers</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <label>Vehicle Name</label>
                    <input
                      type="text"
                      className="form-control border-dark"
                      placeholder="Enter Vehicle Name"
                      value={vehicle.name}
                      onChange={(e) =>
                        handleVehicleChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-4">
                    <label>Vehicle Number</label>
                    <input
                      type="text"
                      className="form-control   border-dark"
                      placeholder="Enter Vehicle Number"
                      value={vehicle.number}
                      onChange={(e) =>
                        handleVehicleChange(index, "number", e.target.value)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
        <div className='d-flex justify-content-end gap-3'>
    <button className='  btn1 text-dark '>Cancel</button>
    <button  type="submit" style={{fontSize:"18px", padding:"10px 60px"}} onClick={handleSubmit} className="mainColor2 text-white border-0" >
    Create
</button>
    </div>
      </div>
    </div>
  );
};

export default ResidentForm;
