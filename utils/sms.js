const otpGenerator = require('otp-generator');
const twilio = require('twilio');
const mongoose = require('mongoose');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// const otpModel = require('../models/otpModel');

const generateOtp = () => {
    return otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
        digits: true
    });
};

const sendOTP = async (req, res) => {
    try {
        const { to } = req.body;

        if (!to) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        const otp = generateOtp();

        const message = await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: twilioPhoneNumber,
            to
        });

        // const savedOtp = await otpModel.create({
        //     phoneNumber: to,
        //     otp
        // });

        // console.log('OTP sent:', savedOtp);

        res.status(200).json({
            message: 'OTP sent successfully',
            otp: otp,
            sid: message.sid
        });

    } catch (err) {
        res.status(500).json({ message: 'Failed to send OTP', reason: err.message });
    }
};


const sendMessage = async (req, res) => {
    try {
        const { data, to } = req.body;

        if (!data || !to) {
            return res.status(400).json({ message: "Missing 'data' or 'phoneNumber' in request body" });
        }

        const message = await client.messages.create({
            body: data,
            from: twilioPhoneNumber,
            to
        });

        res.status(200).json({
            message: 'Message sent successfully',
            sid: message.sid
        });

    } catch (err) {
        res.status(500).json({ message: 'Failed to send message', reason: err.message });
    }
};

// const verifyOtp = async (otp, phoneNumber) => {
//     try {
//         const latestOTPs = await otpModel.find({ phoneNumber }).sort({ createdAt: -1 }).limit(1);
//         if (!latestOTPs || latestOTPs.length === 0) {
//             throw new Error("No OTP found for this phone number");
//         }
    
//         const latestOTP = latestOTPs[0];
    
//         if (otp !== latestOTP.otp) {
//             throw new Error("Please enter the correct OTP");
//         }
//     } catch (error) {
//         throw new Error(error.message)
//     }
// }

// module.exports = { generateOtp, sendOTP, verifyOtp ,sendMessage};
module.exports = { generateOtp, sendOTP, sendMessage};
