import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks"
});

export function getTasks() {
  return API.get("/");
}

export function createTask(task) {
  return API.post("/", task);
}

export function updateTask(id, task) {
  return API.put(`/${id}`, task);
}

export function deleteTask(id) {
  return API.delete(`/${id}`);
}