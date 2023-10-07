import React from 'react';

interface TodoItemProps {
    key: number;
    todo: {
        id: number;
        title: string;
        completed: boolean;
    };
    onUpdateTodo: (id: number, newTitle: string) => void;
    onDeleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div>
      <h3>{todo.title}</h3>
      <p>{todo.completed ? 'Completed' : 'Incomplete'}</p>
    </div>
  );
};

export default TodoItem;