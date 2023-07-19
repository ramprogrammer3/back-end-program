
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    tags: {
        type: String
    },

    email: {
        type: String
    }

})

fileSchema.post("save", async function (doc) {

    try {

        // transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })

        // mail send

        let info = await transporter.sendMail({
            from: `ramkumar`,
            to: doc.email,
            subject: "video uploaded on instagram by piku",
            html: `<h2> software engineer </h2> <p> patare kamariya </p> view here : <a href = ${doc.imageUrl} > Click here </a> `
        })

        console.log("info ", info);

    } catch (error) {
        console.error(error);
    }

})

const File = mongoose.model("File", fileSchema)
module.exports = File;