
const mongoose = require("mongoose")

require("dotenv").config();

const url = process.env.DATABASE_URL;

const dbConnection = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { console.log("Database connection successful") })
        .catch((error) => {
            console.log("Database connection failed")
            console.log(error)
            process.exit(1);
        })
}

module.exports = dbConnection;