import React, { useState } from 'react'
import './SecurityProtocol.css'

const SecurityProtocols = () => {
    const[protocols, setProtocols]= useState([
        {
            id: 1,
            title: "Evelyn Harper",
            description: "Event and recreational activities.",
          date:"2022/01/01",
         
            time:  "10:00 AM",
            
         
          },
          {
            id: 2,
            title: "Evelyn Harper",
            description: "Event and recreational activities.",
          date:"2022/01/01",
         
            time:  "10:00 AM",
            
         
          }, {
            id: 3,
            title: "Evelyn Harper",
            description: "Event and recreational activities.",
          date:"2022/01/01",
         
            time:  "10:00 AM",
            
         
          }, {
            id: 4,
            title: "Evelyn Harper",
            description: "Event and recreational activities.",
          date:"2022/01/01",
         
            time:  "10:00 AM",
            
         
          }, {
            id: 5,
            title: "Evelyn Harper",
            description: "Event and recreational activities.",
          date:"2022/01/01",
         
            time:  "10:00 AM",
            
         
          }, {
            id: 6,
            title: "Evelyn Harper",
            description: "Event and recreational activities.",
          date:"2022/01/01",
         
            time:  "10:00 AM",
            
         
          },
    ]);
  return (
    <div className='container-fluid'>
        <div className='row justify-content-center'>
        <div className="container-fluid row bg-white">
  <div>
    <h4 className="mt-3">Security Protocol</h4>
  </div>
  <div className="eventtable" style={{ overflowX: "auto" }}>
    {/* Header Row */}
    <div
      className="row head   text-center align-items-center"
     
    >
      <div className="col-3 fw-bold text-start ">Title</div>
      <div className="col-3 fw-bold text-center">Description</div>
      <div className="col-3 fw-bold text-center">Date</div>
      <div className="col-3 fw-bold text-center">Time</div>
      
    </div>

    {/* Rows */}
    {protocols.map((protocol, index) => (
      <div
        className="row data border-bottom p-2 align-items-center"
        key={index}
       
      >
        {/* Participator Name */}
        <div className="col-3 d-flex align-items-center ">
          <img
            src="src/Images/profileimg.png"
            alt="avatar"
            className="  me-2"
          />
          <span className='text-center'>{protocol.title}</span>
        </div>

        {/* Description */}
        <div className="col-3 text-center ">
          <p>{protocol.description}</p>
        </div>

        {/* Time */}
        <div className="col-3 text-center">
          <p>{protocol.date}</p>
        </div>

        {/* Date */}
        <div className="col-3 text-center">
          <p>{protocol.time}</p>
        </div>

        {/* protocol Name */}
        
      </div>
    ))}
  </div>
</div> 
        </div>

      
    </div>
  )
}

export default SecurityProtocols
