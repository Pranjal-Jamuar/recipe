import express from "express"
import dotenv from "dotenv"

dotenv.config()
// console.log("Loaded PORT:", process.env.PORT)

const app = express()
const PORT = process.env.PORT || 3000
// console.log("PORT used by app.listen:", PORT)

app.get("/", (req, res) => {
  // console.log("Received GET request at /")
  res.send("Server is running properly now!")
})

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})
