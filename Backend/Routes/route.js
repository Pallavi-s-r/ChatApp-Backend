const express = require('express');
const {protect} = require('../Middleware/authMiddleware');
const {
  registerUser,
  authUser, allUsers
} = require("../controllers/userController");

const{accessChat,fetchChats,createGroupChat,renameGroupChat,addToGroup,removeFromGroup} = require('../controllers/chatController')
const router = express.Router()

router.get('/user', protect,allUsers);
router.post('/user', registerUser);
router.post('/user/login',authUser);

//chats apis

router.post('/chats',protect,accessChat);
 router.get('/chats',protect, fetchChats);
router.post('/chats/group',protect, createGroupChat);
router.put('/chats/rename',protect, renameGroupChat);
router.put('/chats/groupremove',protect, removeFromGroup);
 router.put('/chats/groupadd',protect, addToGroup);

module.exports= router;