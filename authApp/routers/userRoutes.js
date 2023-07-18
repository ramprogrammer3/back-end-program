const express = require("express")
const router = express.Router();

const { signup, login } = require("../controllers/Auth");

const { auth, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

// protected route

router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the procted route for TESt"
    })
})

router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the procted route for Students"
    })
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the procted route for Admin"
    })
})



module.exports = router;