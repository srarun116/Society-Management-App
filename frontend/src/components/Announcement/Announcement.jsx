import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import "./Announcement.css";
import moment from 'moment';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaStarOfLife } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";


const Announcement = () => {

  const [boxes, setBoxes] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete modal
  const [newNote, setNewNote] = useState({ title: '', description: '', date: '', time: '' });
  const [editIndex, setEditIndex] = useState(null); // Track the index of the note being edited
  const [deleteIndex, setDeleteIndex] = useState(null); // Track index of the announcement to be deleted
  const [viewAnnouncement, setViewAnnouncement] = useState(null); // Track the announcement to view
  const [showViewModal, setShowViewModal] = useState(false); // Manage the modal visibility


  const API_URL = 'http://localhost:4000/api/announcements';


  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      setBoxes(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };


  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const isPM = hour >= 12;
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    const meridiem = isPM ? "PM" : "AM";
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${meridiem}`;
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  // Create or edit announcement
  const handleSaveNote = async (e) => {
    e.preventDefault();

    console.log('Saving announcement:', newNote);
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };

      if (editIndex !== null) {
        // Editing an announcement
        const response = await axios.put(`${API_URL}/${boxes[editIndex]._id}`, newNote , config);
        const updatedBoxes = [...boxes];
        updatedBoxes[editIndex] = response.data;
        setBoxes(updatedBoxes);
      } else {
        // Creating a new announcement
        const response = await axios.post(API_URL, newNote , config);
        setBoxes([...boxes, response.data]);
      }

      // Re-fetch data to ensure state sync
      await fetchAnnouncements();

      setShowModal(false);
      setNewNote({ title: '', description: '', date: '', time: '' });
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving announcement:", error);
    }
  };

  

  // Open create announcement modal
  const handleCreateBox = () => {
    setNewNote({ title: '', description: '', date: '', time: '' });
    setEditIndex(null);
    setShowModal(true);
  };

  // Open edit announcement modal
  const handleEditBox = (index) => {
    const selectedBox = boxes[index]; // Get the selected box from the boxes array
    setNewNote({
      ...selectedBox,
      date: moment(selectedBox.date).format('YYYY-MM-DD'), // Format date to YYYY-MM-DD
    });
    setEditIndex(index);
    setShowModal(true); // Open the modal
  };



  // Delete announcement
  const handleDeleteBox = (id) => {
    setDeleteIndex(id); // Set the index of the announcement to be deleted
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  const confirmDelete = async () => {
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
        },
      };

      const deleteId = boxes[deleteIndex]._id; // Use the correct box ID
      await axios.delete(`${API_URL}/${deleteId}` , config);
      setBoxes(boxes.filter((_, index) => index !== deleteIndex));

      // Re-fetch data to ensure state sync
      await fetchAnnouncements();

      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };


  // View announcement
  const handleViewBox = (index) => {
    setViewAnnouncement(boxes[index]); // Load the selected box data into viewAnnouncement
    setShowViewModal(true); // Show the view modal
  };




  return (
    <>
      <div className="container-fluid main-announcement-wrapper ">
        <div className="row">
          <div className="col-12 mb-3">

            {/* Header start */}
            <div className="row  d-flex justify-content-between align-items-cente">
              <div className="col-lg-2 pt-3 pb-3">
                <h4 className='fw-bold admin-pages-styling'>Announcement</h4>
              </div>
              <div className="col-lg-2 d-flex justify-content-end align-items-center">
                <button className="pt-2 pb-2 px-3 create_announcement_btn admin-pages-styling" onClick={handleCreateBox} >Create Announcement</button>
              </div>
            </div>

            {/* Header End */}

            {/* Body start */}
            <div className="row mt-0 mb-2">
              {boxes.map((box, index) => (
                <div className="col-3 mt-3" key={index}>
                  <div className="px-2 entire_box_data">
                    <div className="row d-flex align-items-center pt-2 pb-1 box-heading">
                      <p className='admin-pages-styling'>
                        {box.title}
                        <BsThreeDotsVertical
                          className="edit_icon_data"
                          onClick={() => toggleDropdown(index)}

                        />
                      </p>
                      {openDropdown === index && (
                        <div className="dropdown-menu show">
                          <button className="dropdown-item admin-pages-styling" onClick={() => handleEditBox(index)}>Edit</button>
                          <button className="dropdown-item admin-pages-styling" onClick={() => handleViewBox(index)}>View</button>
                          <button className="dropdown-item admin-pages-styling" onClick={() => handleDeleteBox(index)}>Delete</button>
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div className="row mt-2">
                      <div className="col-6">
                        <p className=" description_label_of_box">Announcement Date</p>
                      </div>

                      <div className="col-6 d-flex justify-content-end ">
                        <p>{moment(box.date).format('DD/MM/YYYY')}</p>
                      </div>
                    </div>
                    {/* Time */}
                    <div className="row ">
                      <div className="col-6">
                        <p className=" description_label_of_box">Announcement Time</p>
                      </div>

                      <div className="col-6 d-flex justify-content-end ">
                        <p>{formatTime(box.time)}</p>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="row">
                      <p className=" description_label_of_box">Description</p>
                      <p>{box.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Body end*/}
          </div>
        </div>
      </div>


      {/* Modal for adding or editing a note */}
      <Modal className='modal-container' show={showModal} onHide={() => setShowModal(false)} centered>

        <Modal.Header>
          <Modal.Title className='add_note_heading'><h4 className='fw-bold'> {editIndex !== null ? 'Edit Announcement' : 'Add Announcement'}  </h4></Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveNote}>
          <Modal.Body>

            <Form.Group className="mb-3" controlId="announcementTitle">
              <Form.Label>Title <FaStarOfLife className='required_icon' /></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={newNote.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="announcementDescription">
              <Form.Label>Description <FaStarOfLife className='required_icon' /></Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter Description"
                name="description"
                value={newNote.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <div className="row">
              <div className="col-6">
                <Form.Group className="mb-3" controlId="announcementDate">
                  <Form.Label>Announcement Date <FaStarOfLife className='required_icon' /></Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    placeholder='select date'
                    value={newNote.date}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>

              <div className="col-6">
                <Form.Group className="mb-3" controlId="announcementTime">
                  <Form.Label>Announcement Time <FaStarOfLife className='required_icon' /></Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    placeholder='select time'
                    value={newNote.time}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>


          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex w-100 justify-content-between">
              <Button variant="secondary" className="btn cancel_btn modal_btn w-50 me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="btn modal_btn save_btn w-50 ms-2" type='submit'>
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Form>

      </Modal>

      {/* Delete Modal */}
      <Modal className="custom-delete-modal" show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header>
          <Modal.Title>Delete Announcement?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="no-border delete-para">Are you sure you want to delete this security?</Modal.Body>
        <Modal.Footer >
          <div className="d-flex w-100 justify-content-between">
            <Button className="btn btn-outline-secondary w-50 ms-2 cancel_announcement_btn" variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button className="btn btn-danger w-50 ms-2" variant="danger" onClick={confirmDelete}>Delete</Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}


      <Modal className="custom-view-modal" show={showViewModal} onHide={() => setShowViewModal(false)} centered>
        <Modal.Header className='d-flex justify-content-between'>
          <Modal.Title>View Security Protocol</Modal.Title>
          {/* Close Icon */}
          <AiOutlineClose
            className="close-icon"
            onClick={() => setShowViewModal(false)} // Close the modal on click
            style={{ cursor: 'pointer' }}
          />
        </Modal.Header>
        <Modal.Body>
          {viewAnnouncement && (
            <>
              <div className="row">
                <div className="col-12">
                  <p className="view_button_titles m-0">Title</p>
                  <p className="p-0">{viewAnnouncement.title}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <p className="view_button_titles m-0">Description</p>
                  <p>{viewAnnouncement.description}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <p className="view_button_titles m-0">Date</p>
                  <p>{moment(viewAnnouncement.date).format('DD/MM/YYYY')}</p>
                </div>

                <div className="col-6">
                  <p className="view_button_titles m-0">Time</p>
                  <p>{viewAnnouncement.time}</p>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

    </>
  )
}

export default Announcement


