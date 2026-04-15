import express from "express"

const app = express()

// Route add karo
app.get("/", (req, res) => {
  res.send("Hello Bhai Server Chal Raha Hai ggg 🚀")
})
app.get("/about",(req,res)=>{
  res.send("hiii aj")
})
app.get("/user",(req,res)=>{
  res.json ({
    name:"aman",
    id:22,
    age:25
  })
})
app.get("/student/:id",(req,res)=>{
  res.send("student id is:" + req.params.id )
})
app.get("/student/:ids/:name",(req,res)=>{
  res.send(`id is: ${req.params.ids}, name is:${req.params.name}`)
})
app.get("/king",(req,res)=>{
  res.send("name:"+ req.query.names)
})

app.listen(3400, () => {
  console.log("Server running on port 3400")
})