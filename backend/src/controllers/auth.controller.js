const { id } = require('zod/locales');
const userModel = require('../models/user.model')
const { registerUserSchema, loginUserSchema } = require('../zodSchemas/registerUser.schema');
const bcrpt = require('bcrypt');
const jwt= require('jsonwebtoken');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @route /api/auth/register/
 * @description register a new user, expects username, email and password
 */
const registerUserController = async(req ,res)=>{
    try {
        //zod validation implemented
        const parsed = registerUserSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message : "Invalid Inputs!",
                error : parsed.error.errors
            })
        }
        const {username, email, password} = parsed.data;

        const existingUser = await userModel.findOne({
            $or : [{username}, {email}]
        })

        if(existingUser){
            return res.status(400).json({
                message : "Account already exists with this username or email"
            })
        }
        const hashedPassword = await bcrpt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password : hashedPassword
        });

        //create a jwt token for this user
        const token = jwt.sign({
            id : user._id,
            username : user.username
        }, JWT_SECRET, {expiresIn : "1d"});

        //set this token into the cookie
        res.cookie("token", token, {
            httpOnly : true,
            samesite : "lax",
            secure : false
        })

        res.status(201).json({
            message : "User created Successfully",
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }
        })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal server error!", 
        })
    }
}


const loginController = async(req , res )=>{
    try {
        const parsed = loginUserSchema.safeParse(req.body);
        if(!parsed.success){
            return res.status(400).json({
                message : "Invalid Inputs!",
                error : parsed.error.errors
            })
        }
        const {email, password} = parsed.data;

        //find the user 

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message : "User does not exits! Invalid credentials."
            })
        }

        //check the password
        const validUser = await bcrpt.compare(password, user.password);
        if(!validUser){
            return res.status(400).json({
                message : "Invalid Credentials!"
            })
        }

        //create the token
        const token = jwt.sign({
            id : user._id,
            username : user.username
        }, JWT_SECRET, {expiresIn : "1d"});
        
        res.cookie("token", token, {
            httpOnly : true,
            samesite : "lax",
            secure : false
        })

        res.status(201).json({
            message : "user logged in successfully!",
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message : "Internal server error!", 
        })
        
    }
}

module.exports = {
    registerUserController,
    loginController
}