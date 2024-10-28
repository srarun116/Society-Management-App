const User = require("../models/userModel");


const getOtpTime = async(req, res, next)=> {

  const {token} = req.body

  // console.log("Token Received", token);


  try {
    const findedUser = await User.findOne({"otp.token": token}).select( "otp" );

    // console.log("findedUser",findedUser);


    if(!findedUser){
      const error = new Error("Something Went Wrong");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({message: "success", status: true, sendTime: findedUser.otp.sendTime});

  } catch (error) {
     next(error);
  }
}

module.exports = getOtpTime