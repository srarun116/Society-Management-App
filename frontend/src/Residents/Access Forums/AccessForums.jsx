import React, { useState } from "react";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import "./AccessForums.css";

const AccessForums = () => {
  const [chats] = useState([
    {
      id: 1,
      name: "Jenny Willson",
      time: "7:00",
      lastMessage: "Hello there!",
      totalchat:"../../Images/chatnumber.png",
      avatar: "../../Images/Profileimg.png",
      messages: [
        { sender: "Elizabeth", text: "Thanks for your help!", time: "9:20" },
      ],
    },
    {
      id: 2,
      name: "Michael John",
      time: "10:27",
      lastMessage: "Hi, John! How are you doing?",
      avatar: "../../Images/Profileimg.png",
      messages: [
        { sender: "Michael", text: "Hi there, how are you?", time: "9:20" },
        { sender: "You", text: "I am good, thank you!", time: "9:22" },
      ],
    },
    {
      id: 3,
      name: "Elizabeth Sarah",
      time: "10:27",
      lastMessage: "Thank you for your order!",
      done:"../../Images/done.png",
      avatar: "../../Images/Profileimg.png",
      messages: [
        { sender: "Elizabeth", text: "Thanks for your help!", time: "9:20" },
      ],
    },
    {
      id: 4,
      name: "Jenny Willson",
      time: "7:00",
      lastMessage: "Hello there!",
      totalchat:"../../Images/chatnumber.png",
      avatar: "../../Images/Profileimg.png",
      messages: [
        { sender: "Elizabeth", text: "Thanks for your help!", time: "9:20" },
      ],
    },
    {
      id: 5,
      name: "Jenny Willson",
      time: "7:00",
      lastMessage: "Hello there!",
      totalchat:"../../Images/chatnumber.png",
      avatar: "../../Images/Profileimg.png",
      messages: [
        { sender: "Elizabeth", text: "Thanks for your help!", time: "9:20" },
      ],
    },
 
  ]);

  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [forwardMode, setForwardMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const [sidebarVisible, setSidebarVisible] = useState(false);

const toggleSidebar = () => {
  setSidebarVisible(!sidebarVisible);
};

  const handleFileUpload = (file) => {
    if (!file) return;
  
    // Create a temporary URL for the file
    const fileURL = URL.createObjectURL(file);
  
    // Check if the file is an image
    const isImage = file.type.startsWith("image/");
  
    const updatedChat = {
      ...selectedChat,
      messages: [
        ...selectedChat.messages,
        {
          sender: "You",
          text: isImage ? null : `📎 ${file.name}`,
          fileURL: fileURL, // Add the file URL
          isImage: isImage, // Indicate if it's an image
          time: new Date().toLocaleTimeString(),
        },
      ],
    };
    setSelectedChat(updatedChat);
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
  
      recorder.ondataavailable = (event) => {
        const audioURL = URL.createObjectURL(event.data);
        const updatedChat = {
          ...selectedChat,
          messages: [
            ...selectedChat.messages,
            { sender: "You", text: "🎤 Voice Message", audio: audioURL, time: new Date().toLocaleTimeString() },
          ],
        };
        setSelectedChat(updatedChat);
      };
  
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };
  


  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const updatedChat = {
      ...selectedChat,
      messages: [
        ...selectedChat.messages,
        { sender: "You", text: newMessage, time: new Date().toLocaleTimeString() },
      ],
    };
    setSelectedChat(updatedChat);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((prev) => prev + emoji.emoji);
  };

  window.onresize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  return (
    <div className="chat-app container-fluid rounded">
  {/* Top Bar (only on mobile) */}
  <div className="top-bar d-block d-sm-none">
    <div className="menu-icon" onClick={toggleSidebar}>
     <FaArrowLeft/>
    </div>
   
  </div>

  {/* Sidebar */}
  <div onClick={toggleSidebar} className={`chat-sidebar p-3 ${sidebarVisible ? "show" : ""}`}>
    <h5 className="text-dark">Chat</h5>
    <div className="search-bar-container">
      <img src="../../Images/search.png" className="search-icon text-dark" alt="Search" />
      <input type="text" placeholder="Search Here" className="search-bar border-0" />
    </div>
    <ul className="chat-list">
      {chats.map((chat) => (
        <li
          key={chat.id}
          className={`chat-item ${selectedChat.id === chat.id ? "active" : ""}`}
          onClick={() => handleChatClick(chat)}
        >
          <img src={chat.avatar} alt={chat.name} role="button" className="avatar" />
          <div className="chat-info">
            <h5>{chat.name}</h5>
            <p>{chat.lastMessage}</p>
          </div>
          <div>
            <p className="time">{chat.time}</p>
            <span>{chat.done && <img src={chat.done} alt="Done" className="done" />} </span>
            <span>{chat.totalchat && <img src={chat.totalchat} alt="Unread" className="unread" />}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>

  {/* Chat Window */}
  <div className="chat-window expanded  col-12  ">
    <div className="chat-header d-flex align-items-center">
      <div className="chat-info d-flex align-items-center">
        <img src={selectedChat.avatar} alt={selectedChat.name} className="avatar" />
        <div>
          <h5>{selectedChat.name}</h5>
          <span>{selectedChat.time}</span>
        </div>
      </div>
      <div className="chat-options  d-flex gap-2 align-items-center justify-content-end">
        <img src="../../Images/video.png" className="imginput" role="button" alt="Video Call" />
        <img src="../../Images/call.png" className="imginput" role="button" alt="Audio Call" />
        <img
          src="../../Images/more.png"
          role="button"
          alt="More Options"
          onClick={() => setShowPopover(!showPopover)}
        />
        {showPopover && (
          <div className="popover">
            <button
              onClick={() =>
                navigator.clipboard.writeText(
                  selectedChat.messages.map((msg) => msg.text).join("\n")
                )
              }
            >
              Copy
            </button>
            <button onClick={() => setForwardMode(true)}>Forward</button>
          </div>
        )}
      </div>
    </div>

    {/* Chat Messages */}
    <div className="messages">
  {selectedChat.messages.map((msg, index) => (
    <div key={index} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
      {msg.isImage ? (
        <img src={msg.fileURL} alt="Uploaded" className="chat-image" />
      ) : msg.audio ? ( // Check if the message contains an audio URL
        <audio controls>
          <source src={msg.audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : msg.fileURL ? (
        <a href={msg.fileURL} download={msg.text}>
          {msg.text}
        </a>
      ) : (
        <p className="m-0">{msg.text}</p>
      )}
      <span className="time">{msg.time}</span>
    </div>
  ))}
</div>


    {/* Message Input */}
    <div className="bg-white d-flex align-items-center">
      <div className="message-input mb-2 shadow d-flex gap-2">
        <img
          src="../../Images/Smiley.png"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          alt="Emoji Picker"
        />
        {showEmojiPicker && (
          <div className="emoji-picker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <input 
          className="border-0 msginput"
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />
        <img
          src="../../Images/Paperclip.png"
          role="button"
          alt=""
          onClick={() => document.getElementById("fileInput").click()}
        />
        <img src="../../Images/camera.png" role="button" alt="Camera" />
      </div>
      <img
        src="../../Images/voice.png"
        role="button"
        style={{ width: "60px", height: "60px" }}
        alt="Voice Message"
        onClick={() => (isRecording ? stopRecording() : startRecording())}
      />
    </div>
  </div>
</div>

  );
};

export default AccessForums;
