
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const updatePassword = async(req, res, next)=> {

  const {password,confirmPassword , token} = req.body

  try {
     
    const findedUser = await User.findOne({"otp.token" : token})

    if(!findedUser){
      const error = new Error("Something Went Wrong");
      error.statusCode = 400;
      throw error;
    }

    if(new Date(findedUser.otp.sendTime).getTime()+5*60*1000 < new Date().getTime()){
      const error = new Error("Something Went Wrong");
      error.statusCode = 400;
      throw error;
    }

    if(password !== confirmPassword){
      const error = new Error("Password does not match");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password,10)

    findedUser.password = hashedPassword
    findedUser.otp.sendTime = null
    findedUser.otp.token = null
    await findedUser.save()

    res.status(200).json({message:"password updated successfully", status:true});


  } catch (error) {
     next(error)
  }
}

module.exports = updatePassword