import express from "express"
import User from "../models/User.js"

const router = express.Router()

// Register User
router.post("/", async (req, res) => {
  const { userName, email, password } = req.body

  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields!" })
    }

    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: "User already exists!" })

    const user = await User.create({ userName, email, password })
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    })
  } catch (err) {
    res.status(500).json({ message: "Bad Request. Server Error!" })
  }
})

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user || (await user.matchPassowrd(password)))
      return res.status(401).json({ message: "Invalid Credentials!" })

    res.json({
      id: user._id,
      userName: user.userName,
      email: user.email,
    })
  } catch (err) {
    res.status(500).json({ message: "Bad Request. Server Error!" })
  }
})

export default router
