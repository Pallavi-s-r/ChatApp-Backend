const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const userModel = new  mongoose.Schema({
   name:{type:String, required:true},
   email:{type:String, required:true, unique:true},
   password:{type:String, required:true},
   pic : {type:String, default:null},
},{timestamps:true});

userModel.methods.matchPassword = async function(enteredPassword){
   return bcrypt.compare(enteredPassword, this.password);
}
//will check if password is modified
userModel.pre('save', async function(next){
   if(!this.isModified){
      next();
   }

   //encrypt the password
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password,salt)
})
const User =  mongoose.model('User', userModel);
module.exports = User;