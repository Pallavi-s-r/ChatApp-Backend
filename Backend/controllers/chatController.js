const asyncHandler = require("express-async-handler");
const Chat = require("../Models/chatModel");
const { request } = require("express");
const User = require("../Models/userModel");
const mongoose = require("mongoose");
const accessChat = asyncHandler(async(req,res)=>{
   const {userId}= req.body;

   if(!userId){
    console.log("userId param not sent with request");
    return res.sendStatus(400);
   }
 //shouldn't be group chat and finding loggedin user as well as user id requested
 //here var is suitable because we cannot reassign values to constant variable
   var isChat = await Chat.find({
    isGroupChat : false,
    $and:[{users:{$elemMatch:{$eq:req.user._id}}},
        {users:{$elemMatch:{$eq:User._id}}}
    ]
   }).populate('users','-password').populate('latestMessage');

   //populating sender from msg model also and getting all chat
   isChat = await User.populate(isChat , {
    path:'latestMessage.sender',
    select:"name pic email"
   });

   //if chat exists
   if(isChat.length > 0){
    res.send(isChat[0]);
   }
   //create chat
   else{
    const chatData = {
        chatName : "sender",
        isGroupChat:false,
        users:[req.user._id, userId]
    };
    try{
        const createdChat = await Chat.create(chatData);

        //sending the recent created chat to user
        const FullChat = await Chat.findOne({_id:createdChat._id}).populate("users","-password");

        res.status(200).send(FullChat);
    }catch(err){
        res.status(400);
        throw new Error(err.message)
    }
   }
})
//fetching chat fro particular
const fetchChats = asyncHandler(async (req, res) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user._id);
    let results = await Chat.findOne({
      users: { $elemMatch: { $eq: userId } }
    })
    .populate("users","-password")
    .populate("groupAdmin","-password")
    .populate("latestMessage")
    .sort({updatedAt:-1})

      results = await User.populate(results, {
      path: 'latestMessage.sender',
      select: 'name pic email'
    });

    res.status(200).send(results);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//create group cgat  -- name of group and users (requirements)
const createGroupChat = asyncHandler(async (req,res)=>{
  if(!req.body.users || !req.body.name){
    return res.status(404).send({message:"Please enter all fields"});
  }

  //cant send array directly so we are strinfy it into objects

  var users = JSON.parse(req.body.users);

  if(users.length<2){
    return res.status(404).send({message:"Please enter more than 2 people"});
  }

  users.push(req.user);

  //groupcha creation
  try{
const groupChat = await Chat.create({
  chatName : req.body.name,
  users : users,
  isGroupChat :true,
  groupAdmin :req.user,
})
//fetching grup chat from db and send to user
const fullGroupChat = await Chat.findOne({_id:groupChat._id}).populate("users","-password")
.populate("groupAdmin","-password");

res.status(200).json(fullGroupChat)
  }catch(e){
    res.status(400)
    throw new Error(e.message)
  }
})
;
//chat id and chta name
const renameGroupChat = asyncHandler(async(req,res)=>{
const{chatId , chatName} = req.body;
const updateChat = await Chat.findByIdAndUpdate(chatId,{chatName},{new:true}).populate("users","-password").populate("groupAdmin","-password");

if(!updateChat){
  res.status(400)
  throw new Error("Chat not found");
}
else{
  res.json(updateChat);
}
});

const addToGroup = asyncHandler (async (req,res)=>{
  const {chatId , userId} = req.body
  const added = await Chat.findByIdAndUpdate(chatId,{$push:{users:userId}},{new:true}).populate("users","-password").populate("groupAdmin","-password");

if(!added){
res.status(400)
throw new Error("chat not found");
}
else{
  res.json(added);
}
})
const removeFromGroup = asyncHandler (async (req,res)=>{
  const {chatId , userId} = req.body
  const removed = await Chat.findByIdAndUpdate(chatId,{$pull:{users:userId}},{new:true}).populate("users","-password").populate("groupAdmin","-password");

if(!removed){
res.status(400)
throw new Error("chat not found");
}
else{
  res.json(removed);
}
})
module.exports = { accessChat, fetchChats, createGroupChat,renameGroupChat ,addToGroup ,removeFromGroup};

