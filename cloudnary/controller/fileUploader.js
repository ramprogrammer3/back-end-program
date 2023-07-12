

const File = require("../model/file");

exports.localFileUpload = async (req, res) => {

    try {
        const file = req.files.file;
        console.log("File aa gayi ", file)
    } catch (error) {
        console.log(error);
    }
}
