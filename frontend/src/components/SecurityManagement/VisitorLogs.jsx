import React, { useState } from 'react'

const VisitorLogs = () => {

  const [visitor, setVisitor] = useState([
    {
      name: "Everlyn harper",
      phoneNumber: 9876543211,
      date: "10/01/2024",
      unitNumber: "A 1001",
      time: "2.45 PM"
    },
    {
      name: "Everlyn harper",
      phoneNumber: 9876543211,
      date: "10/01/2024",
      unitNumber: "A 1001",
      time: "2.45 PM"
    },
    {
      name: "Everlyn harper",
      phoneNumber: 9876543211,
      date: "10/01/2024",
      unitNumber: "A 1001",
      time: "2.45 PM"
    },
    {
      name: "Everlyn harper",
      phoneNumber: 9876543211,
      date: "10/01/2024",
      unitNumber: "A 1001",
      time: "2.45 PM"
    }
    , {
      name: "Everlyn harper",
      phoneNumber: 9876543211,
      date: "10/01/2024",
      unitNumber: "A 1001",
      time: "2.45 PM"
    },
    {
      name: "Everlyn harper",
      phoneNumber: 9876543211,
      date: "10/01/2024",
      unitNumber: "A 1001",
      time: "2.45 PM"
    },
    {
      name: "Everlyn harper",
      phoneNumber: 9876543211,
      date: "10/01/2024",
      unitNumber: "A 1001",
      time: "2.45 PM"
    }

  ])


  return (
    <>
      <div className="container-fluid border main-content-wrapper">
        <div className="row">
          <div className="col-12 mb-3">

            <div className="row mx-2 d-flex justify-content-between align-items-center mb-2">
              <div className="col-lg-2 pt-3 pb-3">
                <h4 className='fw-bold admin-pages-styling'>Visitor Logs</h4>
              </div>
            </div>
            <div className="row border mx-2 mb-2 add_expense_heading">
              <div className="col-3 py-2"><h6 className="text-start admin-pages-styling">Visitor Name</h6></div>
              <div className="col-3 py-2"><h6 className='admin-pages-styling'>Phone Number</h6></div>
              <div className="col-2 py-2"><h6 className="text-start admin-pages-styling">Date</h6></div>
              <div className="col-2 py-2"><h6 className='admin-pages-styling'>Unit Number</h6></div>
              <div className="col-2 py-2"><h6 className="text-center admin-pages-styling"> Time</h6></div>
            </div>

            {visitor.map((visitor, index) => {
              return (
                <div className="row border-bottom mx-2 mb-2 " key={index}>
                  <div className="col-3 py-2"><h6 className="text-start"> {visitor.name} </h6></div>
                  <div className="col-3 py-2"><h6 >  {visitor.phoneNumber} </h6></div>
                  <div className="col-2 py-2"><h6 className="text-start">  {visitor.date}  </h6></div>
                  <div className="col-2 py-2"><h6 >  {visitor.unitNumber} </h6></div>
                  <div className="col-2 py-2"><h6 className="text-center">  {visitor.time} </h6></div>
                </div>
              )
            })}


          </div>
        </div>
      </div>

    </>
  )
}

export default VisitorLogs