import React, { useState } from 'react';

//Defining interface todo
interface AddTodoProps {
  onAddTodo: (todo: Todo) => void;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.trim()) {
      const newTodo: Todo = { id: Date.now(), title, completed: false };
      onAddTodo(newTodo);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;