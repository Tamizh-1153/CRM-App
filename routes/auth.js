const express=require('express')
const router=express.Router()


const {login,register,forgotPassword,resetPassword}=require('../controllers/auth')

router.post('/register',register)
router.post('/login',login)
router.post('/forgotPassword',forgotPassword)
router.post('/resetPassword/:id/:token',resetPassword)

module.exports=router
