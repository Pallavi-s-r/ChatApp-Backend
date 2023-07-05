const mongoose = require('mongoose');

const userModel = mongoose.Schema.get({
   name:{type:String, required:true},
   email:{type:String, required:true},
   password:{type:String, required:true},
   pic : {type:String, required:true, default:null},
},{timestamps:true});

const User =  mongoose.model('User', userModel);
module.exports = {User};