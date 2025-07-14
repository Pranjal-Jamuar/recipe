import User from "../models/User.js"
import jwt from "jsonwebtoken"

export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select("-password")

      return next()
    } catch (error) {
      console.error("Token Verification Failed!", error.message)
      return res.status(401).json({ messgae: "Not Authorized, Token Failed!" })
    }
  }
  return res.status(401).json({ messgae: "Not Authorized, Token Failed!" })
}
