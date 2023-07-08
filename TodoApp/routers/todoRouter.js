

const express = require("express")
const router = express.Router();

const { createTodo } = require("../controllers/createTodo");

const {getTodo, getTodoById} = require("../controllers/getTodo")

router.post("/createTodo", createTodo);
router.get("/getTodos",getTodo);
router.get("/getTodo/:id",getTodoById);


module.exports = router;