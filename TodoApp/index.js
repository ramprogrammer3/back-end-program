
const express = require("express")
const app = express();

require("dotenv").config();

const port = process.env.PORT || 8080;


// middleware
app.use(express.json());

// db connection
const dbConnection = require("./config/db");
dbConnection();

// mounting router

const todoRouter = require("./routers/todoRouter");
app.use("/api/v1", todoRouter);


app.get("/", (req, res) => {
    res.send("<h1>This is home page baby </h1>")
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
}) 