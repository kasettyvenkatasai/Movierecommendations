const express = require('express');
const router = express.Router();
const {createSignup,createlogin,logout} =require('../controller/controller')

router.use('/signup', createSignup);
router.use('/login', createlogin);
router.use('/logout',logout);

module.exports = router