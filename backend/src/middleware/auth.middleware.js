const jwt =require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

const authUser = async(req, res, next)=>{
    const token = req.cookies.token;

    //check if the token is blacklisted
    const isTokenBlackListed = await tokenBlacklistModel.findOne({token});

    if(isTokenBlackListed){
        return res.status(401).json({
            message : "Token is invalid!"
        })
    }

    if(!token){
        return res.status(401).json({
            message : "Token not provided"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message : "Invalid Token!"
        })
    }

}

module.exports = authUser;