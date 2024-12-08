import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./PollApp.css";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const PollApp = () => {
  const [polls, setPolls] = useState([
    {
      type: "Multichoice polls",
      question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
      options: ["Yes", "No"],
      votes: [{ yes: 75, no: 40 }],
      createdAt: "01/07/2024, 10:00 AM",
      user: {
        name: "Arlene McCoy",
        score: 20,
        avatar: "https://shorturl.at/sPaTn",
      }, // Ensure this exists
    },
    {
      type: "Multichoice polls",
      question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
      options: ["Yes", "No"],
      votes: [{ yes: 75, no: 40 }],
      createdAt: "01/07/2024, 10:00 AM",
      user: {
        name: "Arlene McCoy",
        score: 20,
        avatar: "https://shorturl.at/sPaTn",
      }, // Ensure this exists
    },
    {
      type: "Multichoice polls",
      question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
      options: ["Yes", "No"],
      votes: [{ yes: 75, no: 40 }],
      createdAt: "01/07/2024, 10:00 AM",
      user: {
        name: "Arlene McCoy",
        score: 20,
        avatar: "https://shorturl.at/sPaTn",
      }, // Ensure this exists
    },
    {
      type: "Multichoice polls",
      question: "Sales Deal with Toyota - Azure HF - AMS Amplify?",
      options: ["Yes", "No"],
      votes: [{ yes: 75, no: 40 }],
      createdAt: "01/07/2024, 10:00 AM",
      user: {
        name: "Arlene McCoy",
        score: 20,
        avatar: "https://shorturl.at/sPaTn",
      }, // Ensure this exists
    },
  ]);

  const [newPoll, setNewPoll] = useState({
    type: "",
    question: "",
    options: ["", ""],
  });

  const predefinedPolls = [
    {
      type: "Multichoice Poll",
      question: "",
      options: ["", ""],
    },
    {
      type: "Ranking Poll",
      question: "",
      options: ["", ""],
    },
    {
      type: "Rating Poll",
      question: "",
      options: ["", ""],
    },
    {
      type: "Numeric Polls",
      question: "",
      options: ["", ""],
    },
    {
      type: "Text Poll",
      image: "src/Images/text.png",
      question: "",
      options: ["", ""],
    },
  ];
  predefinedPolls.forEach((poll) => {
    if (!poll.user) {
      poll.user = {
        name: "Default User",
        score: 0,
        avatar: "https://shorturl.at/sPaTn",
      };
    }
  });

  // Add a new poll to the list
  const addPoll = () => {
    const selectedPredefinedPoll = predefinedPolls.find(
      (poll) => poll.type === newPoll.type
    );

    const newPollToAdd = selectedPredefinedPoll
      ? {
        ...selectedPredefinedPoll,
        question: newPoll.question,
        options: newPoll.options,
        votes: Array(selectedPredefinedPoll.options.length).fill({
          yes: 0,
          no: 0,
        }),
        user: {
          name: "Default User",
          score: 0,
          avatar: "https://shorturl.at/sPaTn",
        }, // Add default user
        createdAt: new Date().toLocaleString(),
      }
      : {
        type: newPoll.type || "Custom Poll",
        question: newPoll.question,
        options: newPoll.options,
        votes: Array(newPoll.options.length).fill({ yes: 0, no: 0 }),
        user: {
          name: "Default User",
          score: 0,
          avatar: "https://shorturl.at/sPaTn",
        }, // Add default user
        createdAt: new Date().toLocaleString(),
      };

    setPolls([...polls, newPollToAdd]);
    setNewPoll({ type: "", question: "", options: ["", ""] });
  };

  // Update new poll option text
  const updateOption = (index, value) => {
    const updatedOptions = [...newPoll.options];
    updatedOptions[index] = value;
    setNewPoll({ ...newPoll, options: updatedOptions });
  };

  // Handle voting
  const handleVote = (pollIndex, voteType) => {
    const updatedPolls = polls.map((poll, pIndex) => {
      if (pIndex === pollIndex) {
        const updatedVotes = poll.votes.map((vote) => ({
          ...vote,
          [voteType]: vote[voteType] + 1,
        }));
        return { ...poll, votes: updatedVotes };
      }
      return poll;
    });
    setPolls(updatedPolls);
  };

  return (
    <div className="container-fluid mt-3">
      <div>

        <div className=" d-flex  ">
          <div className="border-bottom  border-2 border-danger ">
            <Link to="#" className="">
              <button

                className=" poll3btn   rounded-top bg-white  btn pollPageStyle"
              >
                Own Poll
              </button>
            </Link>
          </div>
          <div className="border-bottom border-2 border-danger">
            <Link to="#">
              <button

                className=" poll3btn  hovermaincolor rounded-top bg-white  btn pollPageStyle"
              >
                New Poll
              </button>
            </Link>
          </div>
          <div className="border-bottom border-2 border-danger">
            <Link to="#" >
              <button

                className="   poll3btn hovermaincolor rounded-top  bg-white  btn pollPageStyle"
              >
                Previous Poll
              </button>
            </Link>
          </div>
        </div>

        <div className=" justify-content-between bg-white   align-items-center ">

          <div className="d-flex justify-content-between  mx-2">

            <h4 className="semibold mt-3 mx-2 pollPageStyle">Polls</h4>
            <button
              className="btn  mainColor2  mt-3 text-white   me-2"
              data-bs-toggle="modal"
              data-bs-target="#createPollModal"
              onClick={() =>
                document.getElementById("createPollModal").classList.add("show")
              }
            >
             <p className="pollPageStyle mb-0"> Create Poll </p> 
            </button>
          </div>
          <div className="container-fluid bg-white my-4">
            <div className="row">
              {polls.map((poll, pollIndex) => {
                const totalYes = poll.votes[0].yes;
                const totalNo = poll.votes[0].no;
                const totalVotes = totalYes + totalNo;
                const yesPercent = totalVotes ? (totalYes / totalVotes) * 100 : 0;
                const noPercent = totalVotes ? (totalNo / totalVotes) * 100 : 0;

                return (
                  <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-3 mb-4 mb-3" key={pollIndex}>
                    <div className="card poll-card">
                      <div className="card-header d-flex align-items-center">
                        <img
                          src="../../Images/Profileimg.png"
                          alt="Avatar"
                          className=" me-3"
                        />
                        <div>
                          <h6 className="username mb-0">
                            {poll.user?.name || "Unknown User"}
                          </h6>
                          <small>{poll.type}</small>
                        </div>
                        <span className="badge  ms-auto">
                          <FaEye className="me-1" />
                          {poll.user?.score || 0}
                        </span>
                      </div>

                      <div className="card-body">
                        <p className="poll-question">{poll.question}</p>
                        <small className="text-muted d-block mb-3">
                          <img src="src/Images/tworadio.png" alt="" /> Select one or
                          more options
                        </small>

                        <div className="d-flex justify-content-between align-items-center">
                          <label className="d-flex align-items-center">
                            <input
                              type="radio"
                              name={poll - `${pollIndex}`}
                              value="yes"
                              className="me-2"
                              onChange={() => handleVote(pollIndex, "yes")}
                            />
                            Yes
                          </label>
                          <div>
                            <img src="src/Images/totaluser.png" alt="" /> {totalYes}
                          </div>
                        </div>
                        {/* Separate progress bars for Yes and No */}
                        <div className="progress mb-3">
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: `${yesPercent}% ` }}
                          ></div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <label className="d-flex align-items-center">
                            <input
                              type="radio"
                              name={poll - `${pollIndex}`}
                              value="no"
                              className="me-2"
                              onChange={() => handleVote(pollIndex, "no")}
                            />
                            No
                          </label>
                          <div>
                            <img src="src/Images/totaluser.png" alt="" /> {totalNo}
                          </div>
                        </div>
                        <div className="progress mb-3">
                          <div
                            className="progress-bar progressbarno"
                            role="progressbar"
                            style={{ width: ` ${noPercent}% ` }}
                          ></div>
                        </div>

                        {/* Radio buttons for Yes and No */}
                        <div className="d-flex justify-content-between align-items-center"></div>
                        <div className="d-flex justify-content-end">
                          <small className="text-muted text-end">
                            {poll.createdAt}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>


      </div>

      {/* Poll  */}

      <div
        className="modal fade "
        id="createPollModal"
        tabIndex="-1"
        aria-labelledby="createPollModalLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div style={{ maxWidth: "410px" }} className="modal-content  ">
            <div className="modal-header">
              <h5 className="modal-title semibold pollPageStyle" id="createPollModalLabel">
                Create Poll
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <div className="mb-3">
                <label className="form-label pollPageStyle">
                  Polls <span className="text-danger">*</span>
                </label>


                <div className="dropdown radio-group">
                  <button
                    className="btn polltype text-start border col-12 dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {newPoll.type || "Select Polls"}
                  </button>

                  <ul style={{ width: "390px" }} className="bg-white dropdown-menu bg-white " aria-labelledby="dropdownMenuButton"
                  >
                    {predefinedPolls.map((poll, index) => (
                      <li className="bg-white" style={{ width: "390px" }} key={index}>
                        <button
                          className="dropdown-item bg-white   d-flex align-items-center"
                          onClick={() =>
                            setNewPoll({ ...newPoll, type: poll.type })
                          }
                        >
                          <input
                            className="radio-group bg-white"
                            type="radio"
                            name="poll"
                            id=""
                            required />
                          <img
                            name="poll"
                            src={
                              poll.type === "Multichoice Poll"
                                ? "../../Images/Multichoice.png"
                                : poll.type === "Ranking Poll"
                                  ? " ../../Images/ranking.png"
                                  : poll.type === "Rating Poll"
                                    ? "../../Images/rating.png"
                                    : poll.type === "Numeric Poll"
                                      ? "../../Images/numeric.png"
                                      : poll.type === "Text Poll"
                                        ? "../../Images/text.png"
                                        : "../../Images/Vector.png"
                            }
                            alt={`${poll.type} Icon`}
                            className="me-2 ms-2"
                            style={{ color: "black" }}
                          />
                          <span className="polltype"> {poll.type}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <div className="mb-3">
                <label className="form-label pollPageStyle">
                  Question <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ask a question"
                  className="form-control polltype"
                  value={newPoll.question}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, question: e.target.value })
                  }
                  required />
              </div>
              {newPoll.options.map((option, index) => (
                <div className="mb-3" key={index}>
                  <label className="form-label pollPageStyle">Option{index + 1}</label>
                  <span className="text-danger">*</span>
                  <input required
                    type="text"
                    placeholder="Add"
                    className="form-control polltype "
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="modal-footer gap-2">
              <button
                type="button"
                className="btn btn1 bg-white text-black btn-secondary"
                data-bs-dismiss="modal"
              >
               <h6 className="pollPageStyle mb-0"> Cancel </h6>  
              </button>
              <button
                type="button"
                className="btn btn1 mainColor2 text-white"
                onClick={addPoll}
                data-bs-dismiss="modal"
              >
               <h6 className="pollPageStyle mb-0">  Create </h6>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollApp;