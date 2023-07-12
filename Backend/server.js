const express = require("express");
const dotenv = require("dotenv");
var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
const connectDB= require('./config/db')
const {chats} = require("./data/data")
dotenv.config();
const colors = require('colors');
connectDB();
const route = require('./Routes/route');
const { notFound, errorHandler}= require('./Middleware/errorMiddleware');

app.use(express.json());
app.get('/', (req,res)=>{
    res.send("Hii this server");
})
app.use('/api',route);


app.use(notFound)
 app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT || 3000,console.log("server started on port ",PORT||3000));