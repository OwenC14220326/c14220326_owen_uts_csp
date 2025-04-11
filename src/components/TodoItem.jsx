import { useState } from "react";
import "../App.css";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing && editText.trim() !== "") {
        onEdit(todo.id, editText.trim());
        }
        setIsEditing(!isEditing);
    };

    return (
        <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
        />
        {isEditing ? (
            <input
            className="edit-input todo-text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            />
        ) : (
            <span className="todo-text">{todo.text}</span>
        )}
        <div>
            <button className="button_edit" onClick={handleEdit}>
            {isEditing ? "Simpan" : "Edit"}
            </button>
            <button className="button_delete" onClick={() => onDelete(todo.id)}>
            Hapus
            </button>
        </div>
        </li>
    );
}

export default TodoItem;
