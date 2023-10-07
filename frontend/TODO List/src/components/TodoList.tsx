import React, { useState } from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Learn React', completed: false },
    { id: 2, title: 'Build a to-do list', completed: true },
  ]);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = (id: number, newTitle: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodo onAddTodo={handleAddTodo} />
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;