
const mongoose = require("mongoose")
require('dotenv').config();

const url = process.env.URL;

exports.connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB connection successful");
    }).catch((err) => {
        console.log("DB connection failed");
        console.log(err)
        process.exit(1);
    })
}