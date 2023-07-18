

const File = require("../model/file");

exports.localFileUpload = async (req, res) => {

    try {

        // fetch file
        const file = req.files.file;
        console.log("File aa gayi ", file)

        let path = __dirname + "/files/" + Date.now() +`.${file.name.split('.')[1]}`;

        console.log("Path " , path);

        file.mv(path, (err) => {
            console.log(err);
        })

        res.json({
            success: true,
            message: "Local file uploaded successfully"
        })

    } catch (error) {
        console.log(error);
    }
}
