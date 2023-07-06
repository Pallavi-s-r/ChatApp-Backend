const express = require('express');
// const Contrlr = require('../controllers/userController');
const {
  registerUser,
  authUser,
} = require("../controllers/userController");
const router = express.Router()

router.post('/', registerUser);
router.post('/login',authUser);

module.exports= router;