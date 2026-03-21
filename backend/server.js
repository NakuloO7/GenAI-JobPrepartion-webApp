const app = require('./src/app');  //in TS we use : import app from './src/app'
require("dotenv").config();

const connectDb = require('./src/config/database')
connectDb(); // to establish the connect with the database

app.listen(3000, ()=>{
    console.log("Server is running on port : 3000");
})