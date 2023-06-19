const User=require('../models/User')
const {StatusCodes}=require('http-status-codes')
const {BadRequestError,UnauthenticatedError}=require('../errors')
const bcrypt=require('bcryptjs')
var nodemailer = require("nodemailer")

const register = async (req, res) => {

  const user=await User.create({...req.body})
  const token=user.generateJWT()
 
  res.status(StatusCodes.CREATED).json({user:{name:user.fname,role:user.role},token})
}

const login = async (req, res) => {
  const {email,password}=req.body

  if(!email || !password){
    throw new BadRequestError('Please provide email and password')
  }

  const user=await User.findOne({email})

  if(!user){
    throw new UnauthenticatedError('Invalid email')
  }

  const isPasswordCorrect=await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Wrong password")
  }

  const token=user.generateJWT()
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.fname, role: user.role }, token })



}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const token = user.generateJWT()
    user.token=token
    await user.save()
    const resetLink = `http://localhost:5000/api/v1/reset_password/${user._id}/${token}`
    console.log(resetLink);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tamizhwork@gmail.com",
        pass: "hjavmehlknhvlgmj",
      },
    })

    var mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "Password reset ",
      text: resetLink,
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log("Email sent: " + info.response)
      }
    })

    res.send(resetLink)
  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  register,
  login,
  forgotPassword
}
