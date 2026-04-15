import express from "express"

const app = express()

// Middleware
app.use(express.json())

// POST route
app.post("/user", (req, res) => {
  console.log(req.body)

  res.json({
    success: true,
    message: "User added successfully",
    data: req.body
  })
})

app.listen(3000, () => {
  console.log("Server running")
})