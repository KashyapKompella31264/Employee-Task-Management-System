import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./api/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSave = async (task) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, task);
        alert("Task updated successfully");
        setEditingTask(null);
      } else {
        await createTask(task);
        alert("Task added successfully");
      }

      loadTasks();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.log(error);
      alert("Failed to delete task");
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div>
      <h1>Employee Task Management System</h1>

      <Dashboard tasks={tasks} />

      <TaskForm
        onSave={handleSave}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />

      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;