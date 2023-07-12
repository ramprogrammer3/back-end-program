

const mongoosse = require("mongoose")
require("dotenv").config();
const url = process.env.DATABASE_URL;

const dbConnection = () => {
    mongoosse.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("DB connection successful")
    }).catch((error) => {
        console.log("DB Connetion failed")
        console.log(error)
        process.exit(1);
    })
}


module.exports = dbConnection;