
const express = require("express")
const app = express();

require("dotenv").config();
const port = process.env.PORT || 4000;

//middlerware to json parse
app.use(express.json());

require("./config/database").connect();

// router import and mount

const user = require("./routers/userRoutes");
app.use("/api/v1", user);

// activate server

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})


