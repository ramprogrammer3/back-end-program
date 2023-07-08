
const Todo = require("../models/Todo");

exports.getTodo = async (req, res) => {

    try {
        const todos = await Todo.find({});

        res.status(200).json({
            success: true,
            data: todos,
            message: "Entire Todo Data is fetched"
        })
    } catch (error) {

        console.log(error)
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: error.message
        })
    }

}