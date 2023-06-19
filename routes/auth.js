const express=require('express')
const router=express.Router()


const {login,register,forgotPassword}=require('../controllers/auth')

router.post('/register',register)
router.post('/login',login)
router.post('/forgotPassword',forgotPassword)

module.exports=router