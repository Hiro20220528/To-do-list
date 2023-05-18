import React from 'react'

import './App.css';

import AddTask from './AddTask';
import TodoList from './TodoList';

import { useState, useEffect } from 'react';

// import todos from "./test.json"

function App() {

<<<<<<< HEAD
  const [todos, setTodos] = useState('');

  console.log("Hello");
  
  useEffect(() => {
    fetch('/todo', {method: 'GET'})
      .then((res) => {
        // console.log(res);
        return res.json();
      }).then((data) => {
        console.log(data);
      });
  },[]);
=======
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    fetch('/todo')
      .then((res) => res.json())
      .then((data) => setTodos(data));
  },[])
>>>>>>> develop




  return (
    <div>
<<<<<<< HEAD
      {/* <p>{todos}</p> */}
      {/* <div>
=======
      <div>
>>>>>>> develop
        <TodoList todos={todos}/>
      </div> */}
      {/* <div>
        <AddTask/>
      </div> */}
    </div>

    
  );
}

export default App;
