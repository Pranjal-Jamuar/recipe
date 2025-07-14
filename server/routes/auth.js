import express from "express"
import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// Register User
router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body

  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields!" })
    }

    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: "User already exists!" })

    const user = await User.create({ userName, email, password })
    const token = generateToken(user._id)
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      token,
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

    const token = generateToken(user._id)
    res.json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      token,
    })
  } catch (err) {
    res.status(500).json({ message: "Bad Request. Server Error!" })
  }
})

router.get("/me", protect, async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JSON Web Token
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

export default router
