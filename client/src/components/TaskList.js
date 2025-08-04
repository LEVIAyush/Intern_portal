import React, { useState, useEffect } from 'react';
import '../styles/TaskList.css';

const TaskList = () => {
  const initialTasks = [
    { id: 1, text: 'Share your referral link', completed: false },
    { id: 2, text: 'Complete your profile', completed: false },
    { id: 3, text: 'Donate 100 points', completed: false },
  ];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span>{task.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;