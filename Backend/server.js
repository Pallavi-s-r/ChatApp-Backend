const express = require("express");
const dotenv = require("dotenv");
var cors = require('cors')
const app = express();
const connectDB= require('./config/db')
const {chats} = require("./data/data")
dotenv.config();
const colors = require('colors');
connectDB();


app.get('/', (req,res)=>{
    res.send("Hii this server");
})
app.get('/api/chats', (req,res)=>{
    res.send({chats});
})
app.get('/api/chats/:id', (req,res)=>{
    //console.log(req);
    const singleChat = chats.find((c)=>c._id === req.params.id);
    res.send(singleChat);
})

app.get('/')

const PORT = process.env.PORT
app.listen(PORT || 3000,console.log("server started on port ",PORT||3000));