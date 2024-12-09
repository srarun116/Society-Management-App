const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
      type: String,
      required: true
  },
   lastName: {
      type: String,
      required: true
   },
   email: {
    type: String,
    required: true,
   },
   phoneNumber:{
    type: Number,
    required: true
   },
   country: {
    type: String,
    required: true
   },
   state: {
    type: String,
    required: true
   },
   city: {
    type: String,
    required: true
   },
   society: {
    type: String,
    required: true
   },
   password: {
    type: String,
    required: true
   },
   GuardIds: { type: Array, ref: 'SecurityGuard'},
   ResidentIds: { type: Array, ref: 'Resident'},
   otp : {
      otp: {type:String},
      sendTime : {type:Number},
      token: {type:String}
    },
    

 
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

module.exports = User;