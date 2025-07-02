import React, { useEffect, useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const user = "anabelvm91";

  // Cargar tareas al iniciar
  useEffect(() => {
    fetch(`https://playground.4geeks.com/todo/users/${user}`)
      .then((res) => res.json())
      .then((data) => setTasks(data.todos))
      .catch((err) => console.error("Error al cargar tareas:", err));
  }, []);

  // Agregar nueva tarea
  const addTask = () => {
    if (!newTask.trim()) return;

    fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: newTask, is_done: false }),
    })
      .then(() => {
        setNewTask("");
        return fetch(`https://playground.4geeks.com/todo/users/${user}`);
      })
      .then((res) => res.json())
      .then((data) => setTasks(data.todos))
      .catch((err) => console.error("Error al agregar tarea:", err));
  };

  return (
    <div className="todo-container">
      <h1>Lista de Tareas</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.label}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nueva tarea"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Agregar</button>
    </div>
  );
};

export default TodoList;

