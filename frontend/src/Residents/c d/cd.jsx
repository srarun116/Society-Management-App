import React, { useState, useEffect } from 'react';
import "./cd1.css"



import { IoEyeSharp } from "react-icons/io5";

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ChatSidebar from './ChatSidebar';

const Community = () => {
    // Predefined questions (initial data)
    const initialCardData = [
        {
            title: "What is the capital of France?",
            votes: 0,
            answers: 0,
            content: "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
            views: 20,
        },
        {
            title: "What is the capital of Germany?",
            votes: 0,
            answers: 5,
            content: "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
            views: 15,
        },
        {
            title: "What is the capital of Italy?",
            votes: 5,
            answers: 0,
            content: "Feel free to let me know if you need more examples or if there's anything specific you'd like to include in your dummy content!",
            views: 30,
        },
    ];

    const [cardData, setCardData] = useState(initialCardData);

    useEffect(() => {   
        // Fetch the new question from localStorage if it exists
        const newQuestion = localStorage.getItem('newQuestion');
        if (newQuestion) {
            // Parse the new question from localStorage
            const parsedQuestion = JSON.parse(newQuestion);
            
            // Add the new question to the existing cardData
            setCardData(prevData => [...prevData, parsedQuestion]);

            // Remove the new question from localStorage after using it
            localStorage.removeItem('newQuestion');
        }
    }, []); // The useEffect will run only once when the component mounts

    return (
        <div className='dashboard-bg w-100'>
       
            <div className="container-fluid stickyHeader p-3" style={{width: "1590px" }}>
                <div className="row">
                    {/* Left Sidebar */}
                    <div className="col-md-3 chat-sidebar p-0">
                        <div className="sidebar-header p-2 ">
                            <h5 className="mb-0">Chat</h5>
                        </div>
                        <ChatSidebar />
                    </div>

                    {/* Chat Area */}
                    <div className="col-md-9 chat-area p-0">
                    <div className="chat-header d-flex justify-content-between align-items-center p-3 border-bottom">
    <div className="d-flex align-items-center">
        <div className="avatar">
            <img src="../../Images/Avatar.png" alt="Avatar" />
        </div>
        <div className="ps-3">
            <h6 className="mb-1">Community</h6>
            <h6 className="text-muted">9:00 PM</h6>
        </div>
    </div>
    <div className="d-flex align-items-center gap-2">
        <Link to={'/resident/Community-Question'} className="text-decoration-none">
            <Button className="ask-que-btn">Ask Question</Button>
        </Link>
        <img src="../../Images/more.png" alt="More Options" />
    </div>
</div>


                        {/* Cards Section */}
                        <div className='ps-4 pe-2 py-3'>
                            {cardData.map((val, index) => (
                                <div key={index} className='row community-card pt-4 pb-2 px-2 rounded mb-3'>
                                    <div className='col-lg-1 text-end'>
                                        {
                                            val.votes > 0 ? (
                                                <p className='community-votes mb-2 text-success'>{val.votes} votes</p>
                                            ) : (
                                                <p className='community-votes mb-2'>{val.votes} votes</p>
                                            )
                                        }
                                        {
                                            val.answers > 0 ? (
                                                <p className='community-votes text-primary'>{val.answers} answers</p>
                                            ) : (
                                                <p className='community-votes'>{val.answers} answers</p>
                                            )
                                        }
                                    </div>
                                    <div className='col-lg-10'>
                                        <h6 className='community-que'>{val.title}</h6>
                                        <p className='community-ans text-muted'>{val.content}</p>
                                    </div>
                                    <div className='col-lg-1'>
                                        <div className='community-view'>
                                            <p className='d-flex align-items-center bg-light justify-content-center rounded-pill' style={{ padding: "5px" }}>
                                                <IoEyeSharp className='community-icon' style={{ marginRight: "5px" }} />
                                                {val.views}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
