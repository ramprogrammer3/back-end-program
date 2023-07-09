
const express = require("express")
const app = express();

require("dotenv").config();

const port = process.env.PORT || 8080;


// express middleware
app.use(express.json())

// db connection
const dbConnection = require("./config/db");
dbConnection();

// mounting router
const blog = require("./routers/blog")
app.use("/api/v1", blog);


app.listen(port, () => {
    console.log(`server is runnin on port ${port}`);
})

