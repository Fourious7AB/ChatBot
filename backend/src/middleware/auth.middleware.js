import jwt from 'jsonwebtoken';
import Usher from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try{
        const token=req.cookies.jwt;
        if(!token) {
            return res.status(401).json({ message: "Unauthorized access" });    
    }
    const decoded= jwt.verify(token, process.env.JWT_SECRET);

  if(!decoded) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    const user = await Usher.findById(decoded.id);
    if(!user) {
        return res.status(404).json({ message: "User not found" });
      req.user = user;
        next();
    }
    }    catch (error) {
        console.error('Error in protectRoute middleware:', error);  

        return res.status(500).json({ message: "Internal server error" });

    }
}