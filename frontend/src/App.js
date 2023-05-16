import React from 'react'

import './App.css';

import AddTask from './AddTask';
import TodoList from './TodoList';

import { useState, useEffect } from 'react';

// import todos from "./test.json"

function App() {

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




  return (
    <div>
      {/* <p>{todos}</p> */}
      {/* <div>
        <TodoList todos={todos}/>
      </div> */}
      {/* <div>
        <AddTask/>
      </div> */}
    </div>

    
  );
}

export default App;
