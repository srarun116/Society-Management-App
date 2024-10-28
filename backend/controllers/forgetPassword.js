const crypto = require("crypto");
const User = require("../models/userModel");
const sendMail = require("../utils/sendMail");


const forgetPassword = async(req, res, next)=> {

  const {email}  = req.body;

  try {
      
    const formattedEmail = email.toLowerCase();

    const findedUser = await User.findOne({email: formattedEmail});

    if(!findedUser){
      const error = new Error("No User Found");
      error.statusCode = 400;
      throw error;
    }

    // check user not sending multiple time request for otp in 1 min

    if(findedUser.otp.otp && new Date(findedUser.otp.sendTime).getTime() > new Date().getTime()){
      const error = new Error(`please wait until ${new Date(findedUser.otp.sendTime).toLocaleTimeString()}`);
      error.statusCode = 400;
      throw error;
    }

    const otp = Math.floor(Math.random()*90000) + 100000
    // console.log(otp);

    const token = crypto.randomBytes(32).toString("hex");

    findedUser.otp.otp = otp
    findedUser.otp.sendTime = new Date().getTime() + 1* 60* 1000;
    findedUser.otp.token = token 

    await findedUser.save();
    sendMail(otp, formattedEmail);

    res.status(200).json({message: "Plz check your email for otp", status:true, token})


  } catch (error) {
      next(error);
  }
} 

module.exports = forgetPassword;