import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    { id: 2, title: 'Learn TypeScript', completed: false },
    { id: 3, title: 'Learn Node', completed: false },
  ]);
  const API_URL = 'http://127.0.0.1:5000/todo';

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_URL}/get`);
        setTodos(response.data);
      }
      catch (error) { console.log('Failed to GET item', error); }
    };
    fetchTodos();
  }, []);

  // function to add a todo item
  const handleAddTodo = async (newTodo: Todo) => {
    try{
      const response = await axios.post(`${API_URL}/create`, newTodo);
      setTodos((prevTodos) => {
        if (Array.isArray(prevTodos)) {
          return [...prevTodos, response.data];
        } else {
          return [response.data];
        }
    });
  } catch (error) { console.log('Failed to POST item', error); }
  }

  // function to update a todo item
  const handleUpdateTodo = async (id: number, newTitle: string) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, { title: newTitle });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, title: response.data } : todo))
      );
    } catch (error) { console.log('Failed to PUT item', error);}
  };

  // function to delete a todo item
  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
    catch (error) { console.log('Failed to DELETE item', error);}
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodo onAddTodo={(newTodo) => handleAddTodo(newTodo)} />
      <ul>
        {Array.isArray(todos) && todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdateTodo={(id, newTitle ) => handleUpdateTodo(id, newTitle)}
            onDeleteTodo={(id) => handleDeleteTodo(id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;