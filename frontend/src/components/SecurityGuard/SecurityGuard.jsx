// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import React, { useState } from 'react';
// import "./SecurityGuard.css"
// import moment from 'moment';
// import { FaPlusSquare } from 'react-icons/fa'
// import { RiEditBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
// import { GrView } from 'react-icons/gr';
// import { FaStarOfLife } from 'react-icons/fa';
// import { IoIosSunny } from "react-icons/io";
// import { MdNightlight, MdPerson2 } from "react-icons/md";
// import { IoPersonSharp } from "react-icons/io5";

// const SecurityGuard = () => {

//   const [guard, setGuard] = useState([]);
//   const [form, setForm] = useState({
//     fullName: '', phoneNumber: '', selectShift: '', date: '', time: '', gender: '', aadharCard: '', image: null, imagePreview: ''
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentGuardIndex, setCurrentGuardIndex] = useState(null);
//   const [viewGuard, setViewGuard] = useState(null); // State for the selected expense to view
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setForm((prevForm) => ({
//           ...prevForm,
//           image: file,
//           imagePreview: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSave = (e) => {
//     e.preventDefault();

//     if (isEditing) {
//       const updatedGuard = [...guard];
//       updatedGuard[currentGuardIndex] = form;
//       setGuard(updatedGuard);
//     } else {
//       setGuard([...guard, form]);
//     }

//     // Reset the form and close modal
//     setForm({
//       fullName: '', phoneNumber: '', selectShift: '', date: '', time: '', gender: '', aadharCard: '', image: null,
//       imagePreview: '',
//     });
//     setIsEditing(false);
//     setCurrentGuardIndex(null);
//   };

//   const handleCancel = () => {
//     setForm({
//       fullName: '', phoneNumber: '', selectShift: '', date: '', time: '', gender: '', aadharCard: '', image: null,
//       imagePreview: '',
//     });
//     setIsEditing(false);
//     setCurrentGuardIndex(null);
//   };

//   const handleEdit = (index) => {
//     setForm(guard[index]);
//     setIsEditing(true);
//     setCurrentGuardIndex(index);
//   };

//   const handleView = (index) => {
//     setViewGuard(guard[index]); // Set the selected expense to view
//   };

//   const handleDeleteClick = (index) => {
//     setDeleteIndex(index);
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = () => {
//     const updatedGuard = guard.filter((_, i) => i !== deleteIndex);
//     setGuard(updatedGuard);
//     setShowDeleteModal(false);
//     setDeleteIndex(null);
//   };

//   return (
//     <>
//       <div className="container-fluid border main-content-wrapper">
//         <div className="row">
//           <div className="col-12">

//             <div className="row mx-2 d-flex justify-content-between align-items-center">
//               <div className="col-lg-2 pt-3 pb-3">
//                 <h5>Security Guard Details</h5>
//               </div>

//               <div className="col-lg-3 d-flex justify-content-end align-items-center pt-3">
//                 <button
//                   className="pt-2 pb-2 px-3 add_protocol_btn"
//                   data-bs-toggle="modal"
//                   data-bs-target="#addGuardModal"
//                   onClick={() => {
//                     setIsEditing(false);
//                     setForm({
//                       fullName: '', phoneNumber: '', selectShift: '', date: '', time: '', gender: '', aadharCard: '', image: null,
//                       imagePreview: '',
//                     });
//                   }}
//                 >
//                   <FaPlusSquare className="add_expense_icon" />
//                   Add Security
//                 </button>
//               </div>
//             </div>

//             <div className="row border mx-2 mb-2 add_expense_heading">
//               <div className="col-2 py-2"><h6 className="text-start">Security Guard Name</h6></div>
//               <div className="col-2 py-2"><h6 className="text-center">Phone Number</h6></div>
//               <div className="col-2 py-2"><h6 className="text-center">Select Shift</h6></div>
//               <div className="col-2 py-2"><h6 >Shift Date</h6></div>
//               <div className="col-1 py-2"><h6 >Shift Time</h6></div>
//               <div className="col-1 py-2"><h6 className="text-center">Gender</h6></div>
//               <div className="col-2 py-2"><h6 className="text-center">Action</h6></div>
//             </div>

//             {guard.map((guard, index) => (
//               <div className="row mt-2 mx-2" key={index}>
//                 <div className="col-2 py-2"><p> <img src={guard.imagePreview} className='table_image_style' /> {guard.fullName}</p></div>
//                 <div className="col-2 py-2 my-2 "><p className="text-center">{guard.phoneNumber}</p></div>
//                 <div className="col-2 py-2 my-2 ">
//                   <p className={`text-center ${guard.selectShift === 'day' ? 'day-shift-color' : 'night-shift-color'}`}>
//                     {guard.selectShift === 'day' ? (<p> <IoIosSunny /> Day  </p>) : (<p><MdNightlight /> Night  </p>)}
//                   </p>
//                 </div>
//                 <div className="col-2 py-2 d-flex justify-content-start my-2 "><p>{moment(guard.date).format('DD/MM/YYYY')}</p></div>
//                 <div className="col-1 py-2 my-2"><p>{guard.time}</p></div>
//                 <div className="col-1 py-2 my-2">
//                   <p className={`text-center  ${guard.gender === 'male' ? 'gender-male-color' : 'gender-female-color'}`}>
//                     {guard.gender === 'male' ? (<p> <IoPersonSharp /> Male  </p>) : (<p><MdPerson2 /> Female  </p>)}
//                   </p>
//                 </div>

//                 <div className="col-2 py-2 d-flex gap-3 justify-content-center action_btn_main">
//                   <button
//                     className="px-2 action_btn"
//                     onClick={() => handleEdit(index)}
//                     data-bs-toggle="modal"
//                     data-bs-target="#addGuardModal"
//                   >
//                     <RiEditBoxFill className="action_icon edit_icon_size" />
//                   </button>
//                   <button
//                     className="px-2 action_btn"
//                     onClick={() => handleView(index)}
//                     data-bs-toggle="modal"
//                     data-bs-target="#viewGuardModal"
//                   >
//                     <GrView className="action_icon view_icon" />
//                   </button>

//                   {/* delete */}
//                   <button
//                     className="px-2 action_btn"
//                     onClick={() => handleDeleteClick(index)}
//                     data-bs-toggle="modal"
//                     data-bs-target="#deleteGuardModal"  // Add this line
//                   >
//                     <RiDeleteBin2Fill className="action_icon delete_icon" />
//                   </button>


//                 </div>
//               </div>
//             ))}



//           </div>
//         </div>
//       </div>


//       {/* Updated Add Security Guard Modal */}
//       <div className="modal fade" id="addGuardModal" tabIndex="-1" aria-labelledby="addGuardModalLabel" aria-hidden="true">
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content custom-modal">
//             <div className="modal-header">
//               <h5 className="modal-title" id="addGuardModalLabel">
//                 {isEditing ? 'Edit Security ' : 'Add Security '}
//               </h5>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleSave}> {/* Add onSubmit here */}
//                 <div className="row mb-3 ps-2">
//                   <div className="col-2 security_guard_image">
//                     <img
//                       src={form.imagePreview || 'logo.png'}
//                       alt="Preview"
//                       className="img-thumbnail default_image"
//                       style={{ maxWidth: '60px', height: '60px', borderRadius: "50%", cursor: 'pointer', padding: "0px", margin: "0px" }}
//                       onClick={() => document.getElementById('imageUpload').click()}
//                     />
//                   </div>
//                   <input
//                     id="imageUpload"
//                     type="file"
//                     className="d-none"
//                     onChange={handleImageUpload}
//                     accept="images/*"
//                   />
//                   <div className="col-4 security_guard_image">
//                     <p>Add Photo</p>
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="fullName" className="form-label">Full Number <FaStarOfLife className='star_icon_modal  mb-2' /></label>
//                   <input type="text" className="form-control" name="fullName" placeholder="Enter Name" value={form.fullName} onChange={handleInputChange} required />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="phoneNumber" className="form-label">Phone Number <FaStarOfLife className='star_icon_modal  mb-2' /></label>
//                   <input type="number" className="form-control" name="phoneNumber" placeholder="Enter Phone Number" value={form.phoneNumber} onChange={handleInputChange} required />
//                 </div>
//                 <div className="row">
//                   <div className="col-6 mb-3">
//                     <label htmlFor="gender" className="form-label">
//                       Gender <FaStarOfLife className="star_icon_modal mb-2" />
//                     </label>
//                     <div className="input-group">
//                       <select
//                         className="form-select"
//                         name="gender"
//                         value={form.gender}
//                         onChange={handleInputChange}
//                         required
//                       >
//                         <option value="" disabled>
//                           Select Gender
//                         </option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                       </select>
//                     </div>
//                   </div>


//                   <div className="col-6 mb-3">
//                     <label htmlFor="selectShift" className="form-label"> Shift <FaStarOfLife className='star_icon_modal  mb-2' /></label>
//                     <div className="input-group">
//                       {/* <input type="time" className="form-control" name="selectShift" value={form.selectShift} onChange={handleInputChange} required />
//                        */}
//                       <select
//                         className="form-select"
//                         name="selectShift"
//                         value={form.selectShift}
//                         onChange={handleInputChange}
//                         required
//                       >
//                         <option value="" disabled>
//                           Select Time
//                         </option>
//                         <option value="day">Day</option>
//                         <option value="night">Night</option>

//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-6 mb-3">
//                     <label htmlFor="date" className="form-label">Shift Date <FaStarOfLife className='star_icon_modal mb-2' /></label>
//                     <input type="date" className="form-control " name="date" value={form.date} onChange={handleInputChange} required />
//                   </div>
//                   <div className="col-6 mb-3">
//                     <label htmlFor="time" className="form-label">Shift Time <FaStarOfLife className='star_icon_modal mb-2' /></label>
//                     <input type="time" className="form-control " name="time" value={form.time} onChange={handleInputChange} required />
//                   </div>
//                 </div>

//                 <div className="mb-0">
//                   <label htmlFor="billFormat" className="form-label">Upload Aadhar Card <FaStarOfLife className='star_icon_modal  mb-2' /></label>
//                   <div className="file-upload-box file-upload-box-border">
//                     <input
//                       type="file"
//                       className="form-control file-input"
//                       name="aadharCard"
//                       onChange={(e) => setForm({ ...form, aadharCard: e.target.value.split('\\').pop() })}
//                       accept=".jpg,.jpeg,.png,.gif"
//                     />
//                     <div><span className="upload-instructions">Upload a file </span> or drag and drop</div>
//                     <small className="form-text text-muted">PNG, JPG, GIF up to 10MB</small>
//                   </div>
//                 </div>


//                 {/* Modal Footer */}

//                 <div className="row mt-4 px-0 ">
//                   <div className="col-6 ">
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary expense_cancel_btn_modal py-2  me-2"
//                       data-bs-dismiss="modal"
//                       onClick={handleCancel}

//                     >
//                       Cancel
//                     </button>
//                   </div>
//                   <div className="col-6   ">

//                     <button
//                       type="submit" // Change button type to submit
//                       className="btn  save_btn "
//                       data-bs-dismiss="modal"
//                     >
//                       {isEditing ? 'Update' : 'Save'}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* View Security Protocol Modal */}
//       <div className="modal fade" id="viewGuardModal" tabIndex="-1" aria-labelledby="viewGuardModalLabel" aria-hidden="true">
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content custom-modal">
//             <div className="modal-header  mb-0">
//               <h5 className="modal-title" id="viewGuardModalLabel "> View Security Guard Details</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <hr className="no-margin-hr" />


//             <div className="modal-body mt-0">
//               {viewGuard && (
//                 <div className='row'>
//                   <div className="col-12">

//                     <div className="row">
//                       <div className="col-4 ">
//                         <img src={viewGuard.imagePreview} className='viewPage_image' ></img>
//                       </div>

//                       <div className="col-4 d-flex align-items-center ps-4">
//                         <p className='text-secondary'><strong className='text-dark fw-bold'>{viewGuard.fullName} </strong><br /> {viewGuard.date}</p>
//                       </div>
//                     </div>

//                     <div className="row mt-3">
//                       <div className="col-4 ">
//                         <p className='mb-1 text-secondary ps-2'>Select Shift</p>
//                         <p className={`ps-1  ${viewGuard.selectShift === 'day' ? 'day-shift-color' : 'night-shift-color'}`}>
//                           {viewGuard.selectShift === 'day' ? (<p> <IoIosSunny /> Day  </p>) : (<p><MdNightlight /> Night  </p>)}
//                         </p>
//                       </div>
//                       <div className="col-4">
//                         <p className='mb-1 text-secondary ps-2'> Shift Time</p>
//                         <p className='viewPage_time ps-1'>{viewGuard.time}</p>
//                       </div>
//                       <div className="col-4">
//                         <p className='mb-1 text-secondary ps-2'>Gender</p>
//                         <p className={` ps-1 ${viewGuard.gender === 'male' ? 'gender-male-color' : 'gender-female-color'}`}>
//                           {viewGuard.gender === 'male' ? (<p> <IoPersonSharp /> Male  </p>) : (<p><MdPerson2 /> Female  </p>)}
//                         </p>
//                       </div>
//                     </div>



//                   </div>

//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       <div
//         className="modal fade"
//         id="deleteGuardModal"
//         tabIndex="-1"
//         aria-labelledby="deleteGuardModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content custom-modal ">
//             <div className="modal-header delete_expense_border">
//               <h5 className="modal-title delete_expense_title" id="deleteGuardModalLabel">Delete Security?</h5>
//             </div>
//             <hr className="no-margin-hr" />

//             <div className="modal-body">
//               <p className='delete_para'>Are you sure you want to delete this?</p>
//             </div>
//             <div className="modal-footer">
//               <div className="d-flex w-100 justify-content-between">

//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary w-50 ms-2"
//                   data-bs-dismiss="modal" // Add this attribute to close the modal on cancel
//                   onClick={() => setShowDeleteModal(false)}
//                 >
//                   Cancel
//                 </button>


//                 <button
//                   type="button"
//                   className="btn btn-danger w-50 ms-2"
//                   data-bs-dismiss="modal" // Add this attribute to close the modal on delete
//                   onClick={handleDeleteConfirm}
//                 >
//                   Delete
//                 </button>
//               </div>



//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   )
// }

// export default SecurityGuard



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState ,useEffect  } from 'react';
import axios from 'axios';
import "./SecurityGuard.css"
import moment from 'moment';
import { FaPlusSquare } from 'react-icons/fa'
import { RiEditBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { GrView } from 'react-icons/gr';
import { FaStarOfLife } from 'react-icons/fa';
import { IoIosSunny } from "react-icons/io";
import { MdNightlight, MdPerson2 } from "react-icons/md";
import { IoPersonSharp } from "react-icons/io5";




const SecurityGuard = () => {

  const API_URL = 'http://localhost:4000/api/security-guards';

  const [guard, setGuard] = useState([]);
  const [form, setForm] = useState({  fullName: '', phoneNumber: '', selectShift: '', date: '', time: '', gender: '',  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentGuardIndex, setCurrentGuardIndex] = useState(null);
  const [viewGuard, setViewGuard] = useState(null); // State for the selected expense to view
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);


  // Function to fetch security guards
  const fetchSecurityGuard = async () => {
    try {
        const response = await axios.get(API_URL , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setGuard(response.data);
    } catch (error) {
        console.error("Error fetching Security Guard:", error);
    }
};

useEffect(() => {
    fetchSecurityGuard(); // Fetch data on component mount
}, []);

   

    function formatTime(time) {
      if (!time || typeof time !== "string") {
        console.error("Invalid time input:", time);
        return "Invalid time"; // or handle it appropriately
      }
      
      // Proceed if time is a valid string
      const parts = time.split(":"); 
      if (parts.length < 2) {
        return "Invalid time"; // Handle invalid formats
      }
    
      const [hours, minutes] = parts;
      const formattedHours = parseInt(hours, 10) % 12 || 12; // Convert to 12-hour format
      const period = parseInt(hours, 10) >= 12 ? "PM" : "AM";
    
      return `${formattedHours}:${minutes} ${period}`;
    }
    

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleSave = async(e) => {
    e.preventDefault();

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };


      if (isEditing) {
         // Editing an Security Guard
         const response = await axios.put(`${API_URL}/${guard[currentGuardIndex]._id}`, form , config);
        const updatedGuard = [...guard];
        updatedGuard[currentGuardIndex] = response.data;
        setGuard(updatedGuard);
      } else {
         // Creating a new Security Guard
         const response = await axios.post(API_URL, form , config);
         setGuard(prevGuard => [...prevGuard, response.data]);
      }

        // Re-fetch data to ensure state sync
        await fetchSecurityGuard();

      // Reset the form and close modal
    setForm({
      fullName: '', phoneNumber: '', selectShift: '', date: '', time: '', gender: '',
     
    });
    setIsEditing(false);
    setCurrentGuardIndex(null);
    } catch (error) {
      console.error("Error saving securityGuard:", error);
    }

  };


  const handleCancel = () => {
    setForm({
      fullName: '', phoneNumber: '', selectShift: '', date: '', time: '', gender: '',  
    });
    setIsEditing(false);
    setCurrentGuardIndex(null);
  };


  //  Edit data value in input field
  const handleEdit = (index) => {
    const selectedGuard = guard[index];
  
    // Format the date to 'YYYY-MM-DD' for the date input
    const formattedDate = moment(selectedGuard.date).format('YYYY-MM-DD');
  
    setForm({
      ...selectedGuard,
      date: formattedDate, // Set the formatted date
    });
  
    setIsEditing(true);
    setCurrentGuardIndex(index);
  };

  // Function to format date in MM/DD/YY format
const formatDate = (dateString) => {
  const date = new Date(dateString); // Parse the database date
  return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
  });
};

// Function to format date in "Day, Date Year" format
const formatDateYear = (dateString) => {
  const date = new Date(dateString); // Parse the database date
  const options = {
    weekday: 'short', // "Mon", "Tue", etc.
    day: '2-digit',   // "26"
    year: '2-digit',  // "24"
  };
  return date.toLocaleDateString('en-US', options); // e.g., "Mon, 26  24"
};

  const handleView = (index) => {
    setViewGuard(guard[index]); // Set the selected expense to view
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };


  const handleDeleteConfirm = async () => {
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
        },
      };

        const deleteId = guard[deleteIndex]._id; // Get the correct ID from the selected guard
        const response = await axios.delete(`${API_URL}/${deleteId}` , config);

        // Log success
        console.log("Security Guard deleted successfully:", response.data);

        // Update the UI by removing the deleted guard from the list
        setGuard(guard.filter((_, index) => index !== deleteIndex));

        // Re-fetch data to ensure state sync
        await fetchSecurityGuard();

        // Close the modal and reset delete index
        setShowDeleteModal(false);
        setDeleteIndex(null);

    } catch (error) {
        // Log the error details
        console.error("Error deleting security guard:", error.response ? error.response.data : error.message);
        
        // Optionally, show a message to the user if deletion fails
        alert("Failed to delete Security Guard. Please check the console for details.");
    }
};




  return (
    <>
      <div className="container-fluid border main-content-wrapper">
        <div className="row">
          <div className="col-12">

            <div className="row mx-2 d-flex justify-content-between align-items-center mb-2">
              <div className="col-lg-3 pt-3 fw-bold pb-3">
                <h4 className='fw-bold admin-pages-styling'>Security Guard Details</h4>
              </div>

              <div className="col-lg-3 d-flex justify-content-end align-items-center pt-3">
                <button
                  className="pt-2 pb-2 px-3 add_protocol_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#addGuardModal"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({
                      fullName: '', phoneNumber: '', selectShift: '', date: '', time: '', gender: '', 
                     
                    });
                  }}
                >
                  <FaPlusSquare className="add_expense_icon" />
                  Add Security
                </button>
              </div>
            </div>

            <div className="row border mx-2 mb-2 add_expense_heading">
              <div className="col-2 py-2"><h6 className="text-start  admin-pages-styling">Security Guard Name</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling">Phone Number</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling">Select Shift</h6></div>
              <div className="col-2 py-2"><h6 className="text-start admin-pages-styling">Shift Date</h6></div>
              <div className="col-1 py-2"><h6 className="text-start admin-pages-styling">Shift Time</h6></div>
              <div className="col-1 py-2"><h6 className="text-center admin-pages-styling">Gender</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling">Action</h6></div>
            </div>

            {guard.map((guard, index) => (
              <div className="row mt-2 mx-2" key={index}>
                <div className="col-2 py-2"><p>  {guard.fullName}</p></div>
                <div className="col-2 py-2 my-2 "><p className="text-center">{guard.phoneNumber}</p></div>
                <div className="col-2 py-2 my-2 ">
                  <p className={`text-center ${guard.selectShift === 'day' ? 'day-shift-color' : 'night-shift-color'}`}>
                    {guard.selectShift === 'day' ? (<span> <IoIosSunny /> Day  </span>) : (<span><MdNightlight /> Night  </span>)}
                  </p>
                </div>
                <div className="col-2 py-2 d-flex justify-content-start my-2 "><p>{moment(guard.date).format('DD/MM/YYYY')}</p></div>
                <div className="col-1 py-2 my-2"><p> {guard.time ? formatTime(guard.time) : "No time available"}</p></div>
                <div className="col-1 py-2 my-2">
                  <p className={`text-center  ${guard.gender === 'male' ? 'gender-male-color' : 'gender-female-color'}`}>
                    {guard.gender === 'male' ? (<span className='gender-item-size'> <IoPersonSharp /> Male  </span>) : (<span className='gender-item-size'><MdPerson2 /> Female  </span>)}
                  </p>
                </div>

                <div className="col-2 py-1 d-flex gap-3 justify-content-center action_btn_main ">
                 
                  <img src="/Images/Edit_btn.png" onClick={() => handleEdit(index)}   data-bs-toggle="modal"  data-bs-target="#addGuardModal" height={40}/>
                
                  <img src="/Images/View_btn.png"  onClick={() => handleView(index)}   data-bs-toggle="modal"  data-bs-target="#viewGuardModal" height={40}/>

                  <img src="/Images/Delete_btn.png"  onClick={() => handleDeleteClick(index)}  data-bs-toggle="modal" data-bs-target="#deleteGuardModal" height={40} />


                </div>
              </div>
            ))}



          </div>
        </div>
      </div>


      {/* Updated Add Security Guard Modal */}
      <div className="modal fade" id="addGuardModal" tabIndex="-1" aria-labelledby="addGuardModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header">
              <h5 className="modal-title admin-pages-styling" id="addGuardModalLabel">
                {isEditing ? 'Edit Security ' : 'Add Security '}
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSave}   encType="multipart/form-data"> {/* Add onSubmit here */}
                <div className="row mb-3 ps-2">
                  <div className="col-2 security_guard_image">
                    <img
                      src={form.imagePreview || 'logo.png'}
                      alt="Preview"
                      className="img-thumbnail default_image"
                      style={{ maxWidth: '60px', height: '60px', borderRadius: "50%", cursor: 'pointer', padding: "0px", margin: "0px" }}
                   
                    />
                  </div>
                  <input
                    id="imageUpload"
                    type="file"
                    className="d-none"  
                   
                    accept="images/*"
                  />
                  <div className="col-4 security_guard_image">
                    <p>Add Photo</p>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label admin-pages-styling">Full Name <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="fullName" placeholder="Enter Name" value={form.fullName} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label admin-pages-styling">Phone Number <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="number" className="form-control" name="phoneNumber" placeholder="Enter Phone Number" value={form.phoneNumber} onChange={handleInputChange} required />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="gender" className="form-label admin-pages-styling">
                      Gender <FaStarOfLife className="star_icon_modal mb-2" />
                    </label>
                    <div className="input-group">
                      <select
                        className="form-select"
                        name="gender"
                        value={form.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>


                  <div className="col-6 mb-3">
                    <label htmlFor="selectShift" className="form-label admin-pages-styling"> Shift <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                    <div className="input-group">
                      {/* <input type="time" className="form-control" name="selectShift" value={form.selectShift} onChange={handleInputChange} required />
                       */}
                      <select
                        className="form-select"
                        name="selectShift"
                        value={form.selectShift}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="" disabled>
                          Select Time
                        </option>
                        <option value="day">Day</option>
                        <option value="night">Night</option>

                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="date" className="form-label admin-pages-styling">Shift Date <FaStarOfLife className='star_icon_modal mb-2' /></label>
                    <input type="date" className="form-control " name="date" value={form.date} onChange={handleInputChange} required />
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="time" className="form-label admin-pages-styling">Shift Time <FaStarOfLife className='star_icon_modal mb-2' /></label>
                    <input type="time" className="form-control " name="time" value={form.time} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="mb-0">
                  <label htmlFor="billFormat" className="form-label admin-pages-styling">Upload Aadhar Card <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <div className="file-upload-box file-upload-box-border">
                    <input
                      type="file"
                      className="form-control file-input"
                      name="aadhaarCard"
                      onChange={(e) => setForm({ ...form, aadhaarCard: e.target.value.split('\\').pop() })}
                      accept=".jpg,.jpeg,.png,.gif"
                    />
                    <div><span className="upload-instructions">Upload a file </span> or drag and drop</div>
                    <small className="form-text text-muted">PNG, JPG, GIF up to 10MB</small>
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
                     <h6 className='admin-pages-styling mb-0 py-1'> Cancel </h6> 
                    </button>
                  </div>
                  <div className="col-6   ">

                    <button
                      type="submit" // Change button type to submit
                      className="btn  save_btn admin-pages-styling"
                      data-bs-dismiss="modal"
                    >
                      {isEditing ? 'Update' : 'Save'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* View Security Protocol Modal */}
      <div className="modal fade" id="viewGuardModal" tabIndex="-1" aria-labelledby="viewGuardModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header  mb-0">
              <h5 className="modal-title admin-pages-styling" id="viewGuardModalLabel "> View Security Guard Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <hr className="no-margin-hr" />


            <div className="modal-body mt-0">
              {viewGuard && (
                <div className='row'>
                  <div className="col-12">

                    <div className="row">
                      <div className="col-4 ">
                        <img src={viewGuard.imagePreview} className='viewPage_image' ></img>
                      </div>

                      <div className="col-4 d-flex align-items-center ps-4">
                        <p className='text-secondary admin-pages-styling'><strong className='text-dark fw-bold admin-pages-styling'>{viewGuard.fullName} </strong><br /> {formatDateYear(viewGuard.date)}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-4 ">
                        <p className='mb-1 text-secondary ps-2 admin-pages-styling'>Select Shift</p>
                        <p className={`ps-3  admin-pages-styling ${viewGuard.selectShift === 'day' ? 'day-shift-color' : 'night-shift-color'}`}>
                          {viewGuard.selectShift === 'day' ? (<p> <IoIosSunny /> Day  </p>) : (<p><MdNightlight /> Night  </p>)}
                        </p>
                      </div>
                      <div className="col-4">
                        <p className='mb-1 text-secondary ps-2 admin-pages-styling'> Shift Time</p>
                        <p className='viewPage_time ps-3 admin-pages-styling'>{viewGuard.time}</p>
                      </div>
                      <div className="col-4">
                        <p className='mb-1 text-secondary ps-2 admin-pages-styling'>Gender</p>
                        <p className={` ps-3 admin-pages-styling ${viewGuard.gender === 'male' ? 'gender-male-color' : 'gender-female-color'}`}>
                          {viewGuard.gender === 'male' ? (<p className='admin-pages-styling'> <IoPersonSharp /> Male  </p>) : (<p className='admin-pages-styling'><MdPerson2 /> Female  </p>)}
                        </p>
                      </div>
                    </div>



                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteGuardModal"
        tabIndex="-1"
        aria-labelledby="deleteGuardModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal ">
            <div className="modal-header delete_expense_border">
              <h5 className="modal-title delete_expense_title" id="deleteGuardModalLabel">Delete Security?</h5>
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

    </>
  )
}

export default SecurityGuard