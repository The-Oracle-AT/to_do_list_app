import React, { useState } from 'react';
interface TodoItemProps {
    todo: {
        id: number;
        title: string;
        completed: boolean;
    }
    onUpdateTodo: (id: number, title: string, completed: boolean) => void;
    onDeleteTodo: (id: number) => void;
}
 
const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const handleUpdate = () => {
    if (title.trim()) {
      onUpdateTodo(todo.id, title, todo.completed);
      setEditing(false);
    }
  };

  const handleDelete = () => {
    onDeleteTodo(todo.id);
  };

  const handleComplete = () => {
    setCompleted(todo.completed = true);
  }

  return (
    <>
    <input type='checkbox' checked={completed} onChange={handleComplete} />
      {editing ? (
        <>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </>
  );
};

export default TodoItem;
