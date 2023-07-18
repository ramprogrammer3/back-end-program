const express = require("express");
const router = express.Router();

const { localFileUpload } = require("../controller/fileUploader");

// api router
router.post("/localFileUpload", localFileUpload);






module.exports = router;