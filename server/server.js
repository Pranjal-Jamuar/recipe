import express from "express"

const app = express()

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.listen(3000, () => {
  console.log(`Server started at port 3000`)
})
