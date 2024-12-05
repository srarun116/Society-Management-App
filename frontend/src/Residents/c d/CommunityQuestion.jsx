import React, { useState } from 'react';

import ChatSidebar from './ChatSidebar';

import { Button } from 'react-bootstrap';


import { Link, useNavigate } from 'react-router-dom';

const CommunityQuestion = () => {
    const [newQuestion, setNewQuestion] = useState("");
    const navigate = useNavigate();

    const handleAddQuestion = () => {
        if (newQuestion.trim()) {
            // Create new question object
            const questionData = {
                title: newQuestion,
                votes: 0,
                answers: 0,
                content: "This is a newly added question.",
                views: 0,
            };
            // Save question to localStorage
            localStorage.setItem('newQuestion', JSON.stringify(questionData));

            // Reset input field
            setNewQuestion("");

            // Navigate to the CommunitiesDiscussion page
            navigate('/resident/cd');
        }
    };

    return (
        <div className='dashboard-bg w-100'>
        
            <div className="container-fluid stickyHeader p-3" style={{width: "1590px" }}>
                <div className="row">
                    {/* Left Sidebar */}
                    <div className="col-md-3 chat-sidebar p-0">
                        <div className="sidebar-header p-3 border-bottom">
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
    <div>
        <img src="../../Images/more.png" alt="More Options" />
    </div>
</div>


                        {/* Good Question Tips Section */}
                        <div className='p-3'>
                            <div className="p-4 bg-light border rounded">
                                <h5 className="mb-3 good-question-title">Writing a good question
                                </h5>
                                <p className='good-question-p mb-0'>You're ready to <span className='text-primary'>ask</span>  a <span className='text-primary'>programming-related question</span> and this form will help guide you through the process.
                                </p>
                                <p className='good-question-p'>Looking to ask a non-programming question? See <span className='text-primary'>the topics here</span> to find a relevant site.
                                </p>
                                
                                <h5 className='mb-3 good-question-title text-dark' style={{fontSize:'18px'}}>Steps</h5>
                                <ul>
                                    <li className='good-question-p '>Summarize your problem in a one-line title.</li>
                                    <li className='good-question-p'>Describe your problem in more detail.</li>
                                    <li className='good-question-p'>Describe what you tried and what you expected to happen.</li>
                                    <li className='good-question-p'>Add "tags" which help surface your question to members of the community.</li>
                                    <li className='good-question-p'>Review your question and post it to the site.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Add Question Section */}
                        <div className='p-3 pt-0'>
                            <div className="p-4 bg-light border rounded mb-3">
                                <h5 className="mb-3">Title</h5>
                                <p >Be specific and imagine you're asking a question to another person.</p>
                                <input
                                    type="text"
                                    className="form-control community-que-input"
                                    placeholder="e.g., Is there an R function for finding the index of an element in a vector?"
                                    value={newQuestion}
                                    onChange={(e) => setNewQuestion(e.target.value)}
                                />
                                <Button onClick={handleAddQuestion} className="btn maintainance-income-btn-bg border-0" style={{ width: '70px', height: '51px', borderRadius: '10px' }}>Next</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityQuestion;
