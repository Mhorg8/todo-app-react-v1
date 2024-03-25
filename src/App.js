import React, { useState } from 'react';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);

  function handleAddItem(newTask) {
    setTodos(prevTodos => [...prevTodos, newTask]);
  }

  return (
    <div className="App">
      <TopBar onAddItem={handleAddItem} />
      <Menu />
      <TodoList todos={todos} />
    </div>
  );
}

function TopBar({ onAddItem }) {
  const [task, setTask] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!task.trim()) return; // Prevent adding empty task
    const newTask = {
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

function Menu() {
  const filterOptions = ['All', 'Completed', 'Deleted'];

  return (
    <ul className='menu-list'>
      {filterOptions.map(item => (
        <li className='menu-item' key={item}>{item}</li>
      ))}
    </ul>
  );
}

function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} />
      ))}
    </ul>
  );
}

function Todo({ todo }) {
  return (
    <li className="todo-item">
      <span> {todo.task}</span>
      <button><img style={{ width: '25px', height: '25px' }} src='close-circle-line.svg' alt='delete' /></button>
    </li>
  );
}

export default App;
