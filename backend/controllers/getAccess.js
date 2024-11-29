const User = require("../models/userModel");



const getAccess = async(req, res,next)=> {

  const {token} = req.body;
  try {
    const findedUser = await User.findOne({"otp.token": token})

    if(findedUser.otp.token == null){
      const error = new Error("Something Went Wrong")
      error.statusCode = 400
      throw error
    }


    res.status(200).json({message: "Success" , status: true})
  } catch (error) {
    next(error);
  }
}


module.exports = getAccess