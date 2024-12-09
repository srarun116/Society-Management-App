
import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaStarOfLife } from "react-icons/fa";
import "./FinancialNote.css";
import moment from 'moment';
import axios from 'axios';

const FinancialNote = () => {

  const API_URL = 'http://localhost:4000/api/notes';

  const [boxes, setBoxes] = useState([]);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for delete modal
  const [newNote, setNewNote] = useState({ title: '', description: '', date: '' });
  const [editIndex, setEditIndex] = useState(null); // Track the index of the note being edited
  const [deleteIndex, setDeleteIndex] = useState(null); // Track index of the announcement to be deleted

  // Function to fetch announcement
  const fetchNote = async () => {
    try {
      const response = await axios.get(API_URL , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setBoxes(response.data);
    } catch (error) {
      console.error("Error fetching Notes:", error);
    }
  };

  useEffect(() => { 
    fetchNote();
  }, []);


  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  // Open create Note modal
  const handleCreateBox = () => {
    setNewNote({ title: '', description: '', date: '' });
    setEditIndex(null); // Set editIndex to null for creating a new note
    setShowModal(true);
  };

  // Open edit Note modal
  const handleEditBox = (index) => {
    const selectedBox = boxes[index]; // Get the selected box from the boxes array
    setNewNote({
      ...selectedBox,
      date: moment(selectedBox.date).format('YYYY-MM-DD'), // Format date to YYYY-MM-DD
    });
    setEditIndex(index);
    setShowModal(true); // Open the modal
  };

    // Create or edit Note
  const handleSaveNote = async(e) => {
    e.preventDefault();

     try {
       
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      };

      if (editIndex !== null) {
        // Update the existing note
        const response = await axios.put(`${API_URL}/${boxes[editIndex]._id}`, newNote , config);
        const updatedBoxes = [...boxes];
        updatedBoxes[editIndex] = response.data;
        setBoxes(updatedBoxes);
      } else {
        // Add a new note
        const response = await axios.post(API_URL, newNote , config);
        setBoxes([...boxes, response.data]);
      }

      // Re-fetch data to ensure state sync
      await fetchNote();

      setShowModal(false);
      setNewNote({ title: '', description: '', date: '' });
      setEditIndex(null);
     } catch (error) {
      console.error("Error saving note:", error);
     }

  
  };

   // Delete Facility
   const handleDeleteBox = (id) => {
    setDeleteIndex(id); // Set the index of the Facility to be deleted
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
        await fetchNote();
        
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting Note:", error);
    }
  };


  return (
    <>
      <div className="container-fluid main-content-wrapper">
        <div className="row">
          <div className="col-12">
            <div className="row d-flex justify-content-between align-items-center px-2">
              <div className="col-lg-2 pt-3 pb-3">
                <h4 className='admin-pages-styling'>Note</h4>
              </div>
              <div className="col-lg-2 d-flex justify-content-end align-items-center">
                <button className="pt-2 pb-2 px-3 create_note_btn admin-pages-styling" onClick={handleCreateBox}>Create Note</button>
              </div>
            </div>

            <div className="row  mb-2 px-2">
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
                          <button className="dropdown-item admin-pages-styling" onClick={() => handleDeleteBox(index)}>Delete</button>
                        </div>
                      )}
                    </div>
                    <div className="row">
                      <p className="pt-2 description_label_of_box">Description</p>
                      <p>{box.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding or editing a note */}
      <Modal className='modal-container' show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header>
          <Modal.Title className='add_note_heading'><h4 className='admin-pages-styling'>  {editIndex !== null ? 'Edit Note' : 'Add Note'} </h4></Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveNote}>
          <Modal.Body>

            <Form.Group className="mb-3" controlId="noteTitle">
              <Form.Label  className='admin-pages-styling'>Title <FaStarOfLife className='required_icon' /></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                name="title"
                value={newNote.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="noteDescription">
              <Form.Label className='admin-pages-styling'>Description <FaStarOfLife className='required_icon' /></Form.Label>
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
            <Form.Group className="mb-3" controlId="noteDate">
              <Form.Label className='admin-pages-styling'>Date <FaStarOfLife className='required_icon' /></Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newNote.date}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

          </Modal.Body>

          <Modal.Footer>
            <div className="d-flex w-100 justify-content-between">
              <Button variant="secondary" className="btn cancel_btn modal_btn w-50 me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" className="btn modal_btn save_btn w-50 ms-2" type='submit' >
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal >

      {/* Delete Modal */}
      <Modal className="custom-delete-modal" show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header>
          <Modal.Title className='admin-pages-styling'>Delete Note?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="no-border delete-para fs-6">Are you sure you want to delete this note ?</Modal.Body>
        <Modal.Footer >
          <div className="d-flex w-100 justify-content-between">
            <Button className="btn btn-outline-secondary w-50 ms-2 cancel_announcement_btn" variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button className="btn btn-danger w-50 ms-2" variant="danger" onClick={confirmDelete}>Delete</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FinancialNote;
