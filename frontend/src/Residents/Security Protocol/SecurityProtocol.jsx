import React, { useState } from 'react'
import './SecurityProtocol.css'

const ResidentSecurityProtocols = () => {
  const [protocols, setProtocols] = useState([
    {
      id: 1,
      title: "Evelyn Harper",
      description: "Event and recreational activities.",
      date: "2022/01/01",

      time: "10:00 AM",


    },
    {
      id: 2,
      title: "Evelyn Harper",
      description: "Event and recreational activities.",
      date: "2022/01/01",

      time: "10:00 AM",


    }, {
      id: 3,
      title: "Evelyn Harper",
      description: "Event and recreational activities.",
      date: "2022/01/01",

      time: "10:00 AM",


    }, {
      id: 4,
      title: "Evelyn Harper",
      description: "Event and recreational activities.",
      date: "2022/01/01",

      time: "10:00 AM",


    }, {
      id: 5,
      title: "Evelyn Harper",
      description: "Event and recreational activities.",
      date: "2022/01/01",

      time: "10:00 AM",


    }, {
      id: 6,
      title: "Evelyn Harper",
      description: "Event and recreational activities.",
      date: "2022/01/01",

      time: "10:00 AM",


    },
  ]);
  return (
    <div className='container-fluid px-2 '>
      <div className='row justify-content-center'>
        <div className="container-fluid row bg-white ">
          <div>
            <h4 className="mt-3 admin-pages-styling">Security Protocol</h4>
          </div>
          <div className="eventtable" style={{ overflowX: "auto" }}>
            {/* Header Row */}
            <div
              className="row head   text-center align-items-center"

            >
              <div className="col-3 admin-pages-styling text-start ">Title</div>
              <div className="col-3 admin-pages-styling text-center">Description</div>
              <div className="col-3 admin-pages-styling text-center">Date</div>
              <div className="col-3 admin-pages-styling text-center">Time</div>

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
                    src="../../Images/Profileimg.png"
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
                <div className="col-3 text-center ">
                  <p className='badge1 Online1'>{protocol.time}</p>
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

export default ResidentSecurityProtocols;
