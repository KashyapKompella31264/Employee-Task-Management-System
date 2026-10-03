const db = require("../config/db");

// GET all tasks
function getTasks(req, res) {
  const sql = "SELECT * FROM tasks";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to fetch tasks"
      });
    }

    res.json(results);
  });
}


// CREATE task
function createTask(req, res) {
  const {
    title,
    description,
    priority,
    status,
    dueDate
  } = req.body;

  // Required field validation
  if (
    !title ||
    !description ||
    !priority ||
    !status ||
    !dueDate
  ) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  // Validate priority
  const validPriorities = [
    "low",
    "medium",
    "high"
  ];

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      error: "Invalid priority"
    });
  }

  // Validate status
  const validStatuses = [
    "pending",
    "inprogress",
    "completed"
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      error: "Invalid status"
    });
  }

  const sql = `
    INSERT INTO tasks
    (title, description, priority, status, dueDate)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, priority, status, dueDate],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to create task"
        });
      }

      res.status(201).json({
        message: "Task created successfully",
        taskId: result.insertId
      });
    }
  );
}


// UPDATE task
function updateTask(req, res) {
  const { id } = req.params;

  const {
    title,
    description,
    priority,
    status,
    dueDate
  } = req.body;

  // Required field validation
  if (
    !title ||
    !description ||
    !priority ||
    !status ||
    !dueDate
  ) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  // Validate priority
  const validPriorities = [
    "low",
    "medium",
    "high"
  ];

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      error: "Invalid priority"
    });
  }

  // Validate status
  const validStatuses = [
    "pending",
    "inprogress",
    "completed"
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      error: "Invalid status"
    });
  }

  const sql = `
    UPDATE tasks
    SET title = ?,
        description = ?,
        priority = ?,
        status = ?,
        dueDate = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title,
      description,
      priority,
      status,
      dueDate,
      id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          error: "Failed to update task"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Task not found"
        });
      }

      res.json({
        message: "Task updated successfully"
      });
    }
  );
}


// DELETE task
function deleteTask(req, res) {
  const { id } = req.params;

  const sql = "DELETE FROM tasks WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to delete task"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.json({
      message: "Task deleted successfully"
    });
  });
}


// Export controllers
module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};