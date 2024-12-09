import React, { useState } from 'react'
import './ActivityParticipate.css'
import { Link } from 'react-router-dom'


const ActivityParticipaes = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      participantname: "Evelyn Harper",
      description: "Event and recreational activities.",
    time:"10:00 AM",
      date: "2022/01/01",
      activityname: "Holi Festival ",
   
    },
    {
      id: 2,
      participantname: "Esther Howard",
      description: "Securing critica government systems.",
    time:"1:45 AM",
      date: "2022/01/01",
      activityname: "Holi Festival ",
   
    },
    {
      id: 3,
      participantname: "Esther Howard",
      description: "Securing critica government systems.",
    time:"1:45 AM",
      date: "2022/01/01",
      activityname: "Holi Festival ",
   
    },
    {
      id: 4,
      participantname: "Esther Howard",
      description: "Securing critica government systems.",
    time:"1:45 AM",
      date: "2022/01/01",
      activityname: "Holi Festival ",
   
    }
  ]);
  

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center' >
<div>
  <div className='d-flex justify-content-start mt-3'>
    
<Link className='vorder-none ' to={"/resident/eventparticipation"}>  <button className="participatebtn hovermaincolor rounded-top bg-white text-dark btn border-bottom ">
  <span className='participatebtnspan admin-pages-styling'>Events Participate</span></button></Link> 
<Link className='border-none ' to="/resident/activityparticipate"><button  className="participatebtn text-white  mainColor2 hovermaincolor border-bottom text-dark bg-white rounded-top  btn">
 <span className='participatebtnspan admin-pages-styling'> Activity Participate</span></button></Link>
  </div>
  <div className='container-fluid'>
        <div className='row justify-content-center'>
        <div className="container-fluid row bg-white">
  <div className='mt-2'>
    <h5 className="mt-3 admin-pages-styling">Activity Participation</h5>
  </div>
  <div className="eventtable" style={{ overflowX: "auto" }}>
    {/* Header Row */}
    <div
      className="row head   text-center align-items-center"
     
    >
      <div className="col-3 fw-bold text-start ">Participator Name</div>
      <div className="col-3 fw-bold text-center">Description</div>
      <div className="col-2 fw-bold text-center">Activity Time</div>
      <div className="col-2 fw-bold text-center">Activity Date</div>
      <div className="col-2 fw-bold text-center">Activity Name</div>
      
    </div>

    {/* Rows */}
    {events.map((events, index) => (
      <div
        className="row data border-bottom p-2 align-items-center"
        key={index}
       
      >
        {/* Participator Name */}
        <div className="col-3 d-flex align-items-center ">
          <img
            src="../../Images/Profileimg.png"
            alt="avatar"
            className=" profileimg me-2"
          />
          <span className='text-center'>{events.participantname}</span>
        </div>

        {/* Description */}
        <div className="col-3 text-center ">
          <p>{events.description}</p>
        </div>

        {/* Time */}
        <div className="col-2 text-center">
        <p>{events.time}</p>
        </div>

        {/* Date */}
        <div className="col-2 text-center">
       <p>{events.date}</p>
        </div>
        <div className="col-2 text-center">
       <p>{events.activityname}</p>
        </div>

        {/* protocol Name */}
        
      </div>
    ))}
  </div>
</div> 
        </div>

      
    </div>

</div>
      </div>
    </div>
  )
}

export default ActivityParticipaes;
