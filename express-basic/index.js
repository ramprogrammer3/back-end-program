
const express = require("express")
const app = express();

const port = 8080;

app.get("/", (req, res) => {
    res.send("<h1> Hello baby this is home page  </h1>")
})


//middlleware 
app.use(express.json())


app.post("/api/school", (req, res) => {
    console.log(req.body)
    const { name, roll } = req.body;
    console.log(name)
    console.log(roll)
    res.send("Data submitted successfully")
})

// connecting mongodb compass

const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/myDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connection successful")
}).catch((error) => {
    console.log("Database connection failed")
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

