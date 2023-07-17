
const User = require("../models/user");
const bcrypt = require('bcrypt');

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

