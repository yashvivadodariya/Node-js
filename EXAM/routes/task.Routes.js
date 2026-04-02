const express = require("express");
const router = express.Router();

const auth = require("../middleware/User");

const {addTask,getTasks,updateTask,deleteTask} = require("../controller/task.Controller");

router.post("/add-task", auth, addTask);

router.get("/view-task", auth, getTasks);

router.put("/update-task/:id", auth, updateTask);

router.delete("/delete-task/:id", auth, deleteTask);

module.exports = router;