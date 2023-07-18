
// app create
const express = require("express")
const app = express();

// find port
require("dotenv").config();
const port = process.env.PORT || 4000;

// middlewre add karna hai 

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));


// db connect
const dbConnection = require("./config/db");
dbConnection();

// cloud se connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mount
const Upload = require("./routers/fileUpload");
app.use("/api/v1/upload", Upload)

// activate server

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})