
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

// signup route handler

exports.signup = async (req, res) => {

    try {

        // get data
        const { name, email, password, role } = req.body;

        // check if user already exist
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already Exits"
            })
        }

        // secure password

        let hashedPassword;

        try {

            hashedPassword = await bcrypt.hash(password, 10);

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password"
            })
        }

        // create entry for user

        const user = await User.create({
            name, email, role, password: hashedPassword
        })

        return res.status(200).json({
            success: true,
            message: "User created successfully"
        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            message: "User can't be register ,plese try later"
        })

    }
}


// login router handler

exports.login = async (req, res) => {

    try {

        // fetch data
        const { email, password } = req.body;

        // validate on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully"
            })
        }

        // check register user 
        let user = await User.findOne({ email });

        // if not a registered user
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email"
            })
        }

        // payload

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }


        // verify passwor and generate token

        if (await bcrypt.compare(password, user.password)) {
            // password match
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User login successfully"
            })

        } else {

            // password do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect "
            })

        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error "
        })

    }

}

