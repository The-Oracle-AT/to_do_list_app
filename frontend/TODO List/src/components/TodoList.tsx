import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

interface Todo{
  id: number;
  title: string;
  completed: boolean;
}

const API_URL = 'http://127.0.0.1:5000/todo';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [IDs, setIDs] = useState<number[]>([]);
  const [titles, setTitles] = useState<string[]>([]);
  const [completeds, setCompleteds] = useState<boolean[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data.todo_items;
      //Unpack the json response
      try {
        const IDArray = data.map((item:any) => item.id);
        const titleArray = data.map((item:any) => item.title);
        const completedArray = data.map((item:any) => item.completed);
        setIDs(IDArray);
        setTitles(titleArray);
        setCompleteds(completedArray);
        
      } catch (error) {
        console.log('Failed to unpack json response', error);
        
      }
      setTodos(data); //save to UI

      // save to local storage
      localStorage.setItem('todo_list_data', JSON.stringify(data));//convert to json string

    } catch (error) {
      console.log('Failed to GET item', error);
    }

    const storedData = localStorage.getItem('todo_list_data');
    // If present in storage take that, if not fetch from server
    if(storedData){
      setTodos(JSON.parse(storedData));
    }
  };

  const handleAddTodo = async (newTodo: Todo) => {
    try {
      const response = await axios.post(API_URL, newTodo);

      setTodos([...todos, response.data]);
      localStorage.setItem('todo_list_data', JSON.stringify([...todos, response.data]));
      fetchTodos();
      
    } catch (error) {
      console.log('Failed to POST item', error);
    }
  };

  const handleUpdateTodo = async (id: number, newTitle: string) => {
    const oldTitleStatus = completeds[IDs.indexOf(id)]
    try {
      const response = await axios.put(`${API_URL}/${id}`, { title: newTitle, completed: oldTitleStatus});
      const updatedTodo = response.data;
      const newData = updatedTodo.map((todo:any) => (todo.id === updatedTodo.id ? updatedTodo : todo));
      
      setTodos(newData);
      localStorage.setItem('todo_list_data', JSON.stringify(newData));
      fetchTodos();//after updating fetch data

    } catch (error) {
      console.log('Failed to PUT item', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const newData = todos.filter((todo) => todo.id !== id);
      setTodos(newData);
      localStorage.setItem('todo_list_data', JSON.stringify(newData));
      fetchTodos()//after deleting fetch data
    } catch (error) {
      console.log('Failed to DELETE item', error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodo onAddTodo={(newTodo) => handleAddTodo(newTodo)} />
      <ul>
        {IDs.map((id_value, index) => (
          <li key={id_value}>
          <TodoItem
            todo={{
              id: id_value,
              title: titles[index],
              completed: completeds[index],
            }}

            onUpdateTodo={handleUpdateTodo}
            onDeleteTodo={handleDeleteTodo}
          />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;