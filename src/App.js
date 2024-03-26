import React, { useState } from 'react';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoCount, setTodoCount] = useState(0);
  const [todoDelete, setTodoDelete] = useState(0);
  const filterOptions = ['All', 'Completed', 'Deleted'];

  function handleDeleteItem(id) {
    setTodos(items => items.filter(item => item.id !== id));
    setTodoDelete(prevCount => prevCount + 1);
    setTodoCount(prevCount => prevCount - 1); // Decrement todoCount by 1 when item is deleted
  }

  function handleAddItem(newTask) {
    setTodos(prevTodos => [...prevTodos, newTask]);
    setTodoCount(prevCount => prevCount + 1); // Increment todoCount by 1 when item is added
  }

  return (
    <div className="App">
      <TopBar onAddItem={handleAddItem} />
      <Menu todoCount={todoCount} todoDelete={todoDelete} filterOptions={filterOptions} />
      <TodoList todos={todos} onDelete={handleDeleteItem} />
    </div>
  );
}

function TopBar({ onAddItem }) {
  const [task, setTask] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!task.trim()) return; // Prevent adding empty task
    const newTask = {
      id: Math.floor(Math.random() * 10000),
      task,
      completed: false
    };
    onAddItem(newTask);
    setTask(''); // Clear input field after adding task
  }

  return (
    <div className='top-bar'>
      <h1 className='title'>What's the Plan ?</h1>
      <form className='todo-form' onSubmit={handleSubmit}>
        <input
          type='text'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='Add new Todo'
          className='user-input'
        />
        <button type="submit" className='add-btn'>ADD +</button>
      </form>
    </div>
  );
}

function Menu({ todoCount, todoDelete, filterOptions }) {
  return (
    <ul className='menu-list'>
      {filterOptions.map((item, index) => (
        <li className='menu-item' key={item}>
          {item + ' '}
          {index === 0 && <Count value={todoCount} />}
          {index === 2 && <Count value={todoDelete} />}
        </li>
      ))}
    </ul>
  );
}

function TodoList({ todos, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function Todo({ todo, onDelete }) {
  return (
    <li className="todo-item">
      <span>{todo.task}</span>
      <button onClick={() => onDelete(todo.id)}><img style={{ width: '25px', height: '25px' }} src='close-circle-line.svg' alt='delete' /></button>
    </li>
  );
}

function Count({ value }) {
  return <span className='counter'>{value}</span>;
}

export default App;
