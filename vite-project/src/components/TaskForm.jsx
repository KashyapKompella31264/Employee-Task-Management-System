import { useEffect, useState } from "react";

function TaskForm({ onSave, editingTask, onCancelEdit }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
    dueDate: ""
  });

  useEffect(() => {
    if (editingTask) {
      setTask({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        status: editingTask.status,
        dueDate: editingTask.dueDate
      });
    } else {
      setTask({
        title: "",
        description: "",
        priority: "low",
        status: "pending",
        dueDate: ""
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !task.title.trim() ||
      !task.description.trim() ||
      !task.dueDate
    ) {
      alert("Please fill all required fields");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (task.dueDate < today) {
      alert("Due date cannot be in the past");
      return;
    }

    onSave(task);

    if (!editingTask) {
      setTask({
        title: "",
        description: "",
        priority: "low",
        status: "pending",
        dueDate: ""
      });
    }
  };

  return (
    <div>
      <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          required
        />

        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskForm;