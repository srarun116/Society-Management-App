
import React, { useState } from 'react';
import styles from './EmergencyManagement.module.css';

const EmergencyManagement = () => {
  const [formData, setFormData] = useState({
    alertType: 'Emergency',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description ) {
      alert('Description is required!');
      return;
    }
    console.log('Form submitted:', formData); // Logs alertType and description
    alert('Alert sent successfully!');
    setFormData({
      alertType: 'Emergency',
      description: '',
    });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{minHeight: "90vh"}}>
      <div className={`card p-4 shadow ${styles.card}`} style={{ width: '400px', borderRadius: '12px' }}>
        <h4 className="security-pages-styling mb-2">Alert</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-2">
            <label htmlFor="alertType" className='security-pages-styling'>
              Alert Type<span className="text-danger">*</span>
            </label>
            <select
              id="alertType"
              name="alertType"
              className="form-control"
              value={formData.alertType}
              onChange={handleInputChange}
              required
            >
             
              <option value="Emergency">Emergency</option>
              <option value="Warning">Warning</option>
              <option value="Fire Alarm">Fire Alarm</option>
              <option value="Hign Winds">Hign Winds</option>
              <option value="Thunder">Thunder</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className='security-pages-styling'>
              Description<span className="text-danger">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control text-secondary"
              placeholder="An emergency description typically refers to a detailed account or explanation of an emergency situation."
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ borderRadius: '8px' }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmergencyManagement;
