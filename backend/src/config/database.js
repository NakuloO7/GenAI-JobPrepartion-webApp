//this file is used to connect the express server to the mongodb database
const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database")
    } catch (error) {
        console.log(error);   
    }
}
module.exports = connectDb;   //exports the function

// module.exports = connectDb();   exports the results of calling a function  