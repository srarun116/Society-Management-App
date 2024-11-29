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
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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

// Error
app.use((error, req, res, next)=> {
  const message = error.message || "server error";
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({message: message});
})



app.listen(PORT, ()=> {
  console.log(`Server is running on port : ${PORT}`)
})
