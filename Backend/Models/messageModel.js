const mongoose = require('mongoose');
//sender id , 
const msgModel = mongoose.Schema({
sender :{type:mongoose.Schema.Types.ObjectId,
ref:"User"},
content :{type:String, trim:true},
sender :{type:mongoose.Schema.Types.ObjectId,
ref:"Chat"},
},{timestamps:true});


const Message = mongoose.model("Mesaage", msgModel)
module.exports = Message;