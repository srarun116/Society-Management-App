const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const login = async(req, res , next)=> {
 
   const {email, password} = req.body;

   try {
      const formattedEmail = email.toLowerCase();

      const findedUser = await User.findOne({ email: formattedEmail});

      if(!findedUser){
        const error = new Error("No User Found");
        error.statusCode = 400;
        throw error;
      }

      const isPasswordMatch = await bcrypt.compare(password , findedUser.password);

      if(!isPasswordMatch){
        const error = new Error("Invalid Password");
        error.statusCode = 400;
        throw error;
      }

      const accessToken = jwt.sign({email:formattedEmail, userId : findedUser._id},
        process.env.ACCESS_TOKEN_KEY,
        {expiresIn: "70d"});

     res.status(200).json({message: "login successFully", status: true , token : accessToken});
      


   } catch (error) {
      next(error);
   }

}

module.exports = login;