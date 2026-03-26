const express  = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin :'http://localhost:5173',
    credentials : true
}
app.use(cors(corsOptions));

const authRouter = require('./routes/auth.routes');

app.get('/', (req , res)=>{
    res.json({
        message : "Hello GenAI!"
    })
})
app.use('/api/auth/', authRouter);


module.exports = app;
