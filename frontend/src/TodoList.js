import React from 'react'
import Todo from "./Todo"




const TodoList = ({ todos }) => {

  return (
    <div>
      <div className="container-sm mt-3">
        <div className="row">
          <ol className="list-unstyled">
            {todos.map((todo) => <Todo todo={todo} key={todo.id}/>)}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default TodoList 