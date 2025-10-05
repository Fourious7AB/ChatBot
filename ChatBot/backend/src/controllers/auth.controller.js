import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import cloudinary from '../lib/cloudinary.js';



export const signup= async (req, res) => {
   const {fullName, email, password} = req.body || {};
   if (!fullName || !email || !password) {
       return res.status(400).json({ message: "All fields are required" });
   }
   try {
    if(password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
    });
    await newUser.save();
    generateToken(newUser._id, res);
    return res.status(201).json({
        message: "User created successfully",
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
    });
   } catch (error) {
    console.error('Error during signup:', error);       
    return res.status(500).json({ message: "Internal server error" });
   }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        generateToken(user._id, res);
        return res.status(200).json({
            message: "Login successful",
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout =  (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        return res.status(200).json({ message: "User logged out successfully" });
    }
    catch (error) {
        console.error('Error during signout:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
};

//update the user profile
export const updateProfile = async (req, res) => {
    try {
        const{profilePic}=req.body;
        const userId=req.user._id;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }   
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        const message = error.response?.data?.message || error.message || "Internal server error";
        res.status(500).json({ message });
    }
};

//refresh the user profile it get atometic connet in use of cookie
export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user);

    }
    catch (error) {
        console.error('Error checking authentication:', error);
        res.status(500).json({ message: "Internal server error" });
    }   
}

