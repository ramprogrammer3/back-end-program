
const express = require("express")
const app = express();

require("dotenv").config();

const port = process.env.PORT || 8080;


// middleware
app.use(express.json());

// db connection
const dbConnection = require("./config/db");
dbConnection();


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})