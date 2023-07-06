const asyncHandler = require("express-async-handler")
const User = require('../Models/userModel')
const generateToken = require('../config/generateToken');


const registerUser = asyncHandler(async (req,res)=>{
    const {name, email, password , pic} = req.body;

    if(!name || !email || !password){
       res.status(400);
        throw new Error("Please enter all fields");
    }

    const userExists =  await User.findOne({email});
     if(userExists){
        res.status(400);
        throw new Error("User already Exist");
    }

    const user = await User.create({name, email, password, pic});

    if(user){
        const token = generateToken(user._id);
    user.token = token;
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
    token:generateToken(user._id)});
    }else{
        res.status(404);
        throw new Error("Failed to create user");
    }
});



const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);

  const user = await User.findOne({ email });
  console.log('User:', user);

  if (user && ( user.matchPassword(password))) {
    console.log('Authentication successful');
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    console.log('Authentication failed');
    res.status(401).json({ msg: 'Invalid Credentials' });
  }
});

module.exports = {registerUser, authUser}


