const jwt = require("jsonwebtoken");
const User = require('../models/User');

exports.protect = async(req , res,next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message : "Not authorized, no token"});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({message: "User not found"});
        }

        req.user = {
            id: user._id,            
            email: user.email,
            name: user.name,
        };

        next();
    }catch(err){
        res.status(401).json({message : "Not authorized, token failed"});
    }
};
