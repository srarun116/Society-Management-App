const SecurityGuard = require("../models/SecurityGuard");
const User = require("../models/userModel");
const otpMap = new Map();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.addGuard = async (req, res) => {
    const { name, email, shift, shiftDate, shiftTime, gender, userId} = req.body;

    try {
        // Generate a random password
        const randomPassword = crypto.randomBytes(6).toString('hex');

        // Create a new security guard
        const guard = new SecurityGuard({
            name,
            email,
            shift,
            shiftDate,
            shiftTime,
            gender,
            userId,
            password: randomPassword,
        });

        await guard.save();

        // Send email with password
        await sendEmail(
            email,
            `Hello ${name},\n\nYour account has been created. Use the following password to log in:\n\nPassword: ${randomPassword}`
        );

        res.status(201).json({
            message: 'Security Guard added successfully. Password sent to the email.',
            guard,
        });

        const user = await User.findById(userId);
        if (user) {
            user.GuardIds.push(guard._id);
            await user.save();
        }

    } catch (error) {
        console.error('Error adding guard:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

exports.sendOTP = async (req, res) => {
    const { emailorphone } = req.body; 

    try {
        const user = await User.findOne({
            $or: [{ email: emailorphone }, { phone: emailorphone }]
        });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const otp = crypto.randomInt(100000, 999999).toString();

        otpMap.set(emailorphone, { otp, expiresIn: Date.now() + 5 * 60 * 1000 });

        await sendEmail(user.email, otp); 

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.EMAIL_PASSWORD 
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'DashStack Password',
        text: `${otp}`
    };

    await transporter.sendMail(mailOptions);
};