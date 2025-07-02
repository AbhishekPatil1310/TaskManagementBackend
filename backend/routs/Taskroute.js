const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask
} = require("../controller/controller.js");

// Create
router.post("/", createTask);

// Read all
router.get("/", getAllTasks);

// Update
router.put("/:id", updateTask);

// Delete
router.delete("/:id", deleteTask);

module.exports = router;
