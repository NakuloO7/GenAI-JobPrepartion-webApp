const app = require('./src/app');  //in TS we use : import app from './src/app'
require("dotenv").config();
const {resume, selfDescription, jobDescription} = require('./src/services/temp');

const connectDb = require('./src/config/database');
const generateInterviewReport = require('./src/services/ai.service');
connectDb(); // to establish the connect with the database

generateInterviewReport({resume, selfDescription, jobDescription})


app.listen(3000, ()=>{
    console.log("Server is running on port : 3000");
})