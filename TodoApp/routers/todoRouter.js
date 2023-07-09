

const express = require("express")
const router = express.Router();

const { createTodo } = require("../controllers/createTodo");

const {getTodo, getTodoById} = require("../controllers/getTodo")

const {updateTodo} = require("../controllers/updateTod")

const {deleteTodo}  = require("../controllers/deleteTod")

router.post("/createTodo", createTodo);

router.get("/getTodos",getTodo);

router.get("/getTodo/:id",getTodoById);

router.put("/updateTodo/:id",updateTodo);

router.delete("/deleteTodo/:id",deleteTodo)



module.exports = router;