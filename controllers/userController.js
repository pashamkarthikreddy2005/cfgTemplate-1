const userModel = require('../models/userModel');
const jwt=require('jsonwebtoken')

const findUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: 'USER' });
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const findAdmins = async (req, res) => {
  try {
    const admins = await userModel.find({ role: 'ADMIN' });
    res.status(200).json({ success: true, admins });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const findCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token found, please login", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findOne({ _id: decoded.id }).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "Current user fetched successfully",
      success: true,
      user
    });

  } catch (err) {
    res.status(401).json({
      message: "Invalid token or session expired",
      reason: err.message,
      success: false
    });
  }
};

module.exports = { findUsers, findAdmins , findCurrentUser};
