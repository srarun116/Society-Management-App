


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import "./FinancialExpense.css";
import moment from 'moment';
import axios from 'axios';
import { FaPlusSquare, FaStarOfLife } from 'react-icons/fa';
import { RiEditBoxFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { GrView } from 'react-icons/gr';

const FinancialExpense = () => {

  const API_URL = 'http://localhost:4000/api/expenses';

  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', date: '', amount: '', billFormat: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentExpenseIndex, setCurrentExpenseIndex] = useState(null);
  const [viewExpense, setViewExpense] = useState(null); // State for the selected expense to view
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Function to fetch Expenses
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching Expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Fetch data on component mount
  }, []);



  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "billFormat" && files[0]) {
      const file = files[0];
      setForm({ ...form, billFormat: file });  // Store the file object, not the extension
    } else {
      setForm({ ...form, [name]: value });
    }

  };




  const handleSave = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.title || !form.description || !form.date || !form.amount) {
      alert("Please fill in all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("date", form.date); // Ensure correct format
    formData.append("amount", form.amount);

    if (form.billFormat) {
      formData.append("billFormat", form.billFormat); // Add the file if provided
    }

    try {
      if (isEditing) {
        // Editing an existing Expense
        const response = await axios.put(
          `${API_URL}/update/${expenses[currentExpenseIndex]._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );

        // Update state directly with the edited expense
        const updatedExpenses = [...expenses];
        updatedExpenses[currentExpenseIndex] = response.data.expense;
        setExpenses(updatedExpenses);
      } else {
        // Creating a new Expense
        const response = await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        // Add new expense to the state
        setExpenses((prevExpenses) => [...prevExpenses, response.data.expense]);
      }

      // Clear the form after save
      setForm({ title: "", description: "", date: "", amount: "", billFormat: null });
      setIsEditing(false);
      setCurrentExpenseIndex(null);
    } catch (error) {
      console.error("Error saving Expense:", error);
    }
  };


  const handleCancel = () => {
    setForm({ title: '', description: '', date: '', amount: '', billFormat: '' });
    setIsEditing(false);
    setCurrentExpenseIndex(null);
  };

  const handleEdit = (index) => {
    const selectedExpense = expenses[index];
    // Format the date to 'YYYY-MM-DD' for the date input
    const formattedDate = moment(selectedExpense.date).format('YYYY-MM-DD');

    setForm({
      ...selectedExpense,
      date: formattedDate, // Set the formatted date
    });
    setIsEditing(true);
    setCurrentExpenseIndex(index);
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

  const handleView = (index) => {
    setViewExpense(expenses[index]); // Set the selected expense to view
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

      const deleteId = expenses[deleteIndex]._id; // Get the correct ID from the selected expense
      const response = await axios.delete(`${API_URL}/delete/${deleteId}`, config);

      // Log success
      console.log("Finacial Expense deleted successfully:", response.data);

      setExpenses(expenses.filter((_, index) => index !== deleteIndex));

      await fetchExpenses();

      // Close the modal and reset delete index
      setShowDeleteModal(false);
      setDeleteIndex(null);

    } catch (error) {
      console.error("Error deleting Expense:", error.response ? error.response.data : error.message);

      // Optionally, show a message to the user if deletion fails
      alert("Failed to delete Expense. Please check the console for details.");
    }
  };





  return (
    <>
      <div className="container-fluid border main-content-wrapper">
        <div className="row">
          <div className="col-12">

            <div className="row mx-2 d-flex justify-content-between align-items-center mb-2">
              <div className="col-lg-3 pt-3 pb-3">
                <h4 className='admin-pages-styling'>Add Expenses Details</h4>
              </div>

              <div className="col-lg-3 d-flex justify-content-end align-items-center pt-3">
                <button
                  className="pt-2 pb-2 px-3 add_expense_btn admin-pages-styling"
                  data-bs-toggle="modal"
                  data-bs-target="#addExpenseModal"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({ title: '', description: '', date: '', amount: '', billFormat: '' });
                  }}
                >
                  <FaPlusSquare className="add_expense_icon" />
                  Add New Expenses Details
                </button>
              </div>
            </div>

            <div className="row border mx-2 mb-2 add_expense_heading">
              <div className="col-2 py-2"><h6 className='text-start admin-pages-styling'>Title</h6></div>
              <div className="col-3 py-2"><h6 className='text-start admin-pages-styling'>Description</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling">Date</h6></div>
              <div className="col-1 py-2"><h6 className="text-center admin-pages-styling">Amount</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling">Bill Format</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling">Action</h6></div>
            </div>

            {expenses.map((expense, index) => (
              <div className="row mt-2 mx-2" key={index}>
                <div className="col-2 py-2"><p>{expense.title}</p></div>
                <div className="col-3 py-2"><p>{expense.description}</p></div>
                <div className="col-2 py-2"><p className="text-center">{moment(expense.date).format('DD/MM/YYYY')}</p></div>
                <div className="col-1 py-2"><p className="text-center amount-column">₹ {expense.amount}</p></div>
                <div className="col-2 py-2"><p className="text-center fs-6">   {expense.billFormat ? expense.billFormat : "N/A"}</p></div>
                <div className="col-2 py-2 d-flex gap-3 justify-content-center action_btn_main">
                  

                  <img src="/Images/Edit_btn.png" onClick={() => handleEdit(index)} data-bs-toggle="modal" data-bs-target="#addExpenseModal" height={40} />

                  <img src="/Images/View_btn.png" onClick={() => handleView(index)} data-bs-toggle="modal" data-bs-target="#viewExpenseModal" height={40} />

                  <img src="/Images/Delete_btn.png" onClick={() => handleDeleteClick(index)} data-bs-toggle="modal" data-bs-target="#deleteExpenseModal"  height={40} />


                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Updated Add Expense Modal */}
      <div className="modal fade " id="addExpenseModal" tabIndex="-1" aria-labelledby="addExpenseModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal ">
            <div className="modal-header">
              <h5 className="modal-title admin-pages-styling" id="addExpenseModalLabel">
                {isEditing ? 'Edit Expenses Details' : 'Add Expenses Details'}
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSave}> {/* Add onSubmit here */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label admin-pages-styling">Title <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="title" placeholder="Enter Title" value={form.title} onChange={handleInputChange} autoComplete='off' required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label admin-pages-styling">Description <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <input type="text" className="form-control" name="description" placeholder="Enter Description" value={form.description} onChange={handleInputChange} autoComplete='off' required />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label htmlFor="date" className="form-label admin-pages-styling">Date <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                    <div className="input-group">
                      <input type="date" className="form-control" name="date" value={form.date} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <label htmlFor="amount" className="form-label admin-pages-styling">Amount <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                    <input type="number" className="form-control " name="amount" placeholder="₹ 0000" value={form.amount} onChange={handleInputChange} autoComplete='off' required />
                  </div>
                </div>
                <div className="mb-0">
                  <label htmlFor="billFormat" className="form-label admin-pages-styling">Upload Bill <FaStarOfLife className='star_icon_modal  mb-2' /></label>
                  <div className="file-upload-box file-upload-box-border">
                    <input
                      type="file"
                      className="form-control file-input"
                      name="billFormat"
                      onChange={handleInputChange}
                      accept="image/*"
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
                      className="btn btn-outline-secondary expense_cancel_btn_modal py-2 fw-bold me-2"
                      data-bs-dismiss="modal"
                      onClick={handleCancel}

                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6   ">

                    <button
                      type="submit" // Change button type to submit
                      className="btn  save_btn "
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




      {/* View Expense Modal */}
      <div className="modal fade" id="viewExpenseModal" tabIndex="-1" aria-labelledby="viewExpenseModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal">
            <div className="modal-header  mb-0">
              <h5 className="modal-title admin-pages-styling" id="viewExpenseModalLabel "> View Expense Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <hr className="no-margin-hr" />


            <div className="modal-body mt-0">
              {viewExpense && (
                <div>
                  <div className="col-12">
                    <p className='admin-pages-styling' ><strong className='viewPageLabel admin-pages-styling'>Title </strong><br /> {viewExpense.title}</p>
                  </div>

                  <p className='admin-pages-styling'><strong className='viewPageLabel admin-pages-styling'>Description</strong> <br />{viewExpense.description}</p>
                  <div className='d-flex '>
                    <div className="col-5">
                      <p className='admin-pages-styling'><strong className='viewPageLabel admin-pages-styling'>Date</strong><br /> {formatDate(viewExpense.date)}</p>
                    </div>
                    <div className="col-5">
                      <p className='admin-pages-styling'><strong className='viewPageLabel admin-pages-styling '>Amount</strong> <br /> <span className='amount-view-deatils' > ₹ {viewExpense.amount} </span></p>
                    </div>


                  </div>
                  <div className="col-12">
                    <p className='admin-pages-styling'><strong className='viewPageLabel admin-pages-styling'>Bill </strong><br /> {viewExpense.billFormat} </p>
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
        id="deleteExpenseModal"
        tabIndex="-1"
        aria-labelledby="deleteExpenseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content custom-modal ">
            <div className="modal-header delete_expense_border">
              <h5 className="modal-title delete_expense_title" id="deleteExpenseModalLabel">Delete Expense?</h5>
            </div>
            <hr className="no-margin-hr" />

            <div className="modal-body">
              <p className='delete_para'>Are you sure you want to delete this?</p>
            </div>
            <div className="modal-footer">
              <div className="d-flex w-100 justify-content-between">

                <button
                  type="button"
                  className="btn btn-outline-secondary w-50 ms-2 fw-bold"
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

export default FinancialExpense