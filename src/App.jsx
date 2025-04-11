import "./App.css";
import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import Input from "./components/Input";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const trimmed = input.trim();
    if (trimmed === "") {
      setError("Todo tidak boleh kosong!");
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInput("");
    setError("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>Todo List</h1>

      <Input input={input} setInput={setInput} addTodo={addTodo} error={error} />

      <div className="filter">
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>Semua</button>
        <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>Aktif</button>
        <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>Selesai</button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onToggle={toggleComplete}
            onEdit={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
