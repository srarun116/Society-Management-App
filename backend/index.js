const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT || 7000;

// MongoDb
mongoose.connect(process.env.MONGO_URL).then(()=> {
  console.log("MongoDb Connected");
}).catch((error)=> {
  console.log("MongoDb Not Connected" , error);
})

// Routes
app.use("/user", userRoutes);

// Error
app.use((error, req, res, next)=> {
  const message = error.message || "server error";
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({message: message});
})



app.listen(PORT, ()=> {
  console.log(`Server is running on port : ${PORT}`)
})
