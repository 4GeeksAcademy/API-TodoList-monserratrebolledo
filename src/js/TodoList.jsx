import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoList = () => {
const [task, setTask] = useState("");
const [todo, setTodo] = useState([]);
const username = "monse-2025"; 

useEffect(() => {
fetch(`https://playground.4geeks.com/todo/users/monse-2025`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify([]),
})
.then(() => getTodos()) 
.catch((error) => console.error("Error creando usuario:", error));
}, []);

const getTodos = () => {
fetch(`https://playground.4geeks.com/todo/users/monse-2025`)
.then((res) => res.json())
.then((data) => {
setTodo(data.todos || []);
})
.catch((err) => console.error("Error cargando tareas", err));
};


const handleKeyDown = (e) => {
if (e.key === "Enter" && task.trim() !== "") {
const newTask = {
label: task.trim(),
done: false,
};

fetch(`https://playground.4geeks.com/todo/todos/monse-2025`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(newTask),
})
.then(() => {
setTask("");
getTodos(); 
})
.catch((err) => console.error("Error agregando tarea", err));
}
};


const removeTask = (id) => {
fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
method: "DELETE",
})
.then(() => getTodos())
.catch((err) => console.error("Error eliminando tarea", err));
};

const clearAllTasks = () => {
fetch(`https://playground.4geeks.com/todo/users/monse-2025`, {
method: "DELETE",
})
.then(() => setTodo([]))
.catch((err) => console.error("Error limpiando tareas", err));
};

return (
  <div className="container mt-5 d-flex justify-content-center">
    <div className="todo-box p-4 shadow-sm bg-white rounded w-50 position-relative">
      <h1 className="text-muted text-center">todos</h1>

      <input
      type="text"
      className="form-control mb-3"
      placeholder="Añadir tarea"
      value={task}
      onChange={(e) => setTask(e.target.value)}
      onKeyDown={handleKeyDown}
      />

      <ul className="list-group mb-0">
      {todo.length === 0 ? (
      <li className="list-group-item text-muted">¡Aun no hay tareas! agregas una?</li>
      ) : (
      todo.map((t) => (
      <li
      key={t.id}
      className="list-group-item d-flex justify-content-between align-items-center todo-item"
      >
      <span>{t.label}</span>
      <span
      className="delete-icon text-danger"
      onClick={() => removeTask(t.id)}
      >
      ❌
      </span>
      </li>
      ))
      )}
      </ul>

      {todo.length > 0 && (
      <div className="todo-footer text-start text-muted small mt-3">
      {todo.length} item{todo.length > 1 ? "s" : ""} left
      </div>
      )}

      {todo.length > 0 && (
      <button className="btn btn-danger btn-sm mt-3" onClick={clearAllTasks}>
      Limpiar todas las tareas
      </button>
      )}
    </div>
  </div>
);
};

export default TodoList;