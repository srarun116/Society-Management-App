const bcrypt = require("bcrypt");
const joi = require("joi");
const User = require("../models/userModel");


const register = async(req, res, next)=> {
  const {error : validationError} = validateUser(req.body);

  const {firstName, lastName , email , phoneNumber , country, state, city , society , password } = req.body 

  try {
      if(validationError){
        const error = new Error(validationError.details[0].message)
        error.statusCode = 400
        throw error;
      }

      const formattedFirstName = firstName.toLowerCase();
      const formattedLastName = lastName.toLowerCase();
      const formattedEmail = email.toLowerCase();
      const formattedCountry = country.toLowerCase();
      const formattedState = state.toLowerCase();
      const formattedCity = city.toLowerCase();
      const formattedSociety = society.toLowerCase();
      
     

      const findedUser = await User.findOne({email: formattedEmail});
      if(findedUser){
        const error = new Error("Email already exists");
        error.statusCode = 400
        throw error;
      }

      const hashedPassword = await bcrypt.hash(password,10)

      const newUser = new User({
        firstName: formattedFirstName,
        lastName: formattedLastName,
        email: formattedEmail,
        phoneNumber: phoneNumber,
        country: formattedCountry,
        state: formattedState,
        city: formattedCity,
        society: formattedSociety,
        password: hashedPassword,
      
      })

      const savedUser = await newUser.save();

      res.status(200).json({message: "User Registered SuccessFully", status: true})

  } catch (error) {
     next(error)
  }
}

module.exports = register;

function validateUser(data){
  const userSchema = joi.object({
    firstName: joi.string().min(2).required(),
    lastName: joi.string().min(2).required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().min(10).max(15).required(),
    country: joi.string().min(2).required(),
    state: joi.string().min(2).required(),
    city: joi.string().min(2).required(),
    society: joi.string().min(2).required(),
    password: joi.string().min(8).max(15).required(),
   
  })

  return userSchema.validate(data)
}