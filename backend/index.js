const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const announcementRoutes = require('./routes/announcementRoutes');
const securityGuardRoutes = require('./routes/securityGuardRoutes');
const securityProtocolsRoutes = require('./routes/securityProtocols');
const complaintRoutes = require('./routes/complaintRoutes');
const requestRoutes = require('./routes/requestRoutes');
const facilityRoutes = require('./routes/facilityRoutes');
const noteRoutes = require("./routes/noteRoutes");
const expenseRoutes = require('./routes/expenses');
const otherIncomeRoutes = require('./routes/otherIncomeRoutes');
const residentRoutes = require('./routes/residentManagement');
const importantNumberRoutes = require('./routes/importantNumberRoutes');
const profileRoutes = require('./routes/profile');
const alertRoutes = require('./routes/alertRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const visitorLogsRoutes = require('./routes/visitorLogs');
const http = require("http")
const path = require('path');
const { Server } = require("socket.io");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const server = http.createServer(app);
const io = new Server(server);


const PORT = process.env.PORT || 7000;

// MongoDb
mongoose.connect(process.env.MONGO_URL).then(()=> {
  console.log("MongoDb Connected");
}).catch((error)=> {
  console.log("MongoDb Not Connected" , error);
})

// Routes
app.use("/user", userRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/security-guards',securityGuardRoutes);
app.use('/api/security-protocols', securityProtocolsRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/facilities', facilityRoutes);
app.use("/api/notes", noteRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/other-income', otherIncomeRoutes);
app.use('/api/resident-management', residentRoutes);
app.use('/api/important-number', importantNumberRoutes);
app.use('/api/userProfile', profileRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/visitor-logs', visitorLogsRoutes);

// Socket.IO Integration
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Real-time messaging
  socket.on("send-message", (data) => {
    const { from, to, message, type } = data;
    io.to(to).emit("receive-message", { from, message, type });
  });

  // WebRTC signaling
  socket.on("offer", (data) => io.to(data.to).emit("offer", data));
  socket.on("answer", (data) => io.to(data.to).emit("answer", data));
  socket.on("ice-candidate", (data) => io.to(data.to).emit("ice-candidate", data));

  // Join specific room
  socket.on("join-room", (roomId) => socket.join(roomId));
});

// Error
app.use((error, req, res, next)=> {
  const message = error.message || "server error";
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({message: message});
})



app.listen(PORT, ()=> {
  console.log(`Server is running on port : ${PORT}`)
})
