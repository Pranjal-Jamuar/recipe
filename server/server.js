import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import recipeRoutes from "./routes/recipes.js"
import { connectDB } from "./config/db.js"
import cors from "cors"

dotenv.config()
// console.log("Loaded PORT:", process.env.PORT)
const PORT = process.env.PORT || 3000

const app = express()
// console.log("PORT used by app.listen:", PORT)

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/recipes", recipeRoutes)

app.listen(PORT, () => {
  connectDB()
  console.log(`Server started at port ${PORT}`)
})
