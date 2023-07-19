

const File = require("../model/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {

    try {

        // fetch file
        const file = req.files.file;
        console.log("File aa gayi ", file)

        // create path where file need to be store on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        console.log("Path ", path);

        // add path to move function
        file.mv(path, (err) => {
            console.log(err);
        })

        // create a successful response
        res.json({
            success: true,
            message: "Local file uploaded successfully"
        })

    } catch (error) {
        console.log(error);
    }
}


function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const option = { folder };
    console.log("temp file path ", file.tempFilePath);
    if (quality) {
        option.quality = quality;
    }
    option.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, option);
}


// image upload ka handler

exports.imageUpload = async (req, res) => {

    try {

        // data fetch
        const { name, email, tags } = req.body;
        console.log(name, email, tags);


        // fetch files
        const file = req.files.imageFile;
        console.log(file);

        // validation or supported type
        const supportedType = ["jpeg", "jpg", "png"];

        // checking file type
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType)

        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "File formate not supportd",
            })
        }


        // file formate supported hai

        const response = await uploadFileToCloudinary(file, "home");
        console.log(response);

        // db me entry save
        const fileData = await File.create({
            name, tags, email, imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully uploaded",
        })


    } catch (error) {

        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }

}

// video uploap

exports.videoUpload = async (req, res) => {

    try {

        // data fetch
        const { name, email, tags } = req.body;
        console.log(name, email, tags);

        const file = req.files.videoFile;

        // validation or supported type
        const supportedType = ["mp4", "mov"];

        // checking file type
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType)

        // add a upper limit of 5mb video 
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "File formate not supportd",
            })
        }

        // file formate supported hai

        const response = await uploadFileToCloudinary(file, "home");
        console.log(response);

        // db me entry save
        const fileData = await File.create({
            name, tags, email, imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video Successfully uploaded",
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}


// image Size Reducer

exports.imageSizeReducer = async (req, res) => {

    try {

        // data fetch
        const { name, email, tags } = req.body;
        console.log(name, email, tags);


        // fetch files
        const file = req.files.imageFile;
        console.log(file);

        // validation or supported type
        const supportedType = ["jpeg", "jpg", "png"];

        // checking file type
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType)

        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "File formate not supportd",
            })
        }


        // file formate supported hai

        const response = await uploadFileToCloudinary(file, "home", 30);
        console.log(response);

        // db me entry save
        const fileData = await File.create({
            name, tags, email, imageUrl: response.secure_url
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Successfully uploaded",
        })

    } catch (error) {

        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }


}
