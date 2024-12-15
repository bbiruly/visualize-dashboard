import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"


// Register a new user
export const register = async (req, res) => {
  try {
    // fetch data from body 
    const { name, email, password } = req.body;


    //validate the body
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message: "name, password and email are required."
        })
    }
    //check user is exist or not
    const isUserExist =  await User.findOne({email: email})

    if(isUserExist){
        return res.status(400).json({
            success: false,
            message: "user already registered. Please login"
        })
    }

    // save the user at db 
    const user = await User.create({ name, email, password });

    res.status(201).json({ success: true,user, message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Login user
export const login = async (req, res) => {
    try {
      // Validate input
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ 
          success: false, 
          message: 'Email and password are required' 
        });
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid credentials' 
        });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
      );
  
      // Set cookie with the token
      res.cookie('token', token, {
        httpOnly: true, // Helps prevent XSS attacks
        secure: process.env.NODE_ENV === 'production', // Use secure flag in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
  
      // Respond with success
      res.status(200).json({ 
        success: true, 
        user:user,
        message: 'Login successful' 
      });
    } catch (error) {
      // Handle server errors
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred during login', 
        error: error.message 
      });
    }
  };

// Generate OTP for email verification
export const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    await sendEmail(email, 'OTP Verification', `Your OTP is: ${otp}`);
    res.status(200).json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail(email, 'Reset Password OTP', `Your OTP is: ${otp}`);
    res.status(200).json({ success: true, message: 'Reset password OTP sent to email' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.password = newPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};



// Logout Controller
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", 
    });

    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during logout. Please try again later.",
    });
  }
};

