import React from 'react'
import { useState, useRef } from 'react'


const Todo = ({ todo }) => {


//YYYY-MM-DDから各要素を取り出す
  const year = parseInt(todo.deadline.substr(0, 4), 10);
  const month = parseInt(todo.deadline.substr(5, 2), 10);
  const day = parseInt(todo.deadline.substr(8, 2), 10);

//changeModalの中でvalueを書き換えられるようにする
  const [cuTitle, setCuTitle] = useState(todo.title);
  function changeTitle(event) {
    setCuTitle(event.target.value);
  }
  
  const [cuMemo, setCuMemo] = useState(todo.memo);
  function changeMemo(event) {
    setCuMemo(event.target.value);
  }
  
  const [cuDL, setCuDL] = useState(todo.deadline)
  function changeDL(event) {
    setCuDL(event.target.value);
  }


  const reTitleRef = useRef();
  const reMemoRef = useRef();

  const changeClick = () => {
    const reTask = {
      id:todo.id,
      title:reTitleRef.current.value,
      memo:reMemoRef.current.value,
      deadline:document.getElementById('reDL').value,
    } 
    fetch('/todo/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reTask)
    })
      .then(response => {
            if (response.ok) {
              window.location.replace('/');
            }
        })
        .catch(error => console.error('Error:', error));
    }

  const deleteClick = () => {
    fetch('/todo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({id:todo.id}) 
    })
      .then(response => {
            if (response.ok) {
              window.location.replace('/');
            }
        })
        .catch(error => console.error('Error:', error));
    }

  return (
    <div>
      <li className="container my-3">
          <div className="card">
            <div className="card-header">
              <div className="">
                <h3 className="mt-1">
                  {todo.title}
                </h3>
              </div>
            </div>
            <div className="row card-body">
              <div className="col-2 border-end">
                <header className="text-center border-bottom">
                  <span className="fw-bold">{year}</span>
                </header>
                <div className="d-flex justify-content-around mt-2">
                  <span className="align-self-center">by</span>
                  <div className="">
                    <span className="fs-2">{month}</span>
                    <span className="fs-2">/</span>
                    <span className="fs-2">{day}</span>
                  </div>
                </div>
              </div>
              <div className="col-8 border-end">
                {todo.memo}
              </div>
              <div className="col-2 d-grid gap-2">
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target={ '#changeModal' + todo.id }>change</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target={ '#deleteModal' + todo.id }>delete</button>
              </div>
            </div>
          </div>
        </li>

        <div className="modal fade" id={ 'changeModal' + todo.id } tabindex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-success">
                        <h5 className="modal-title text-white">Change the Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor='reTitle'>Title</label>
                            <textarea id="reTitle" className="form-control" type="text" ref={reTitleRef} value={cuTitle} onChange={changeTitle}></textarea>
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor='reMemo'>Memo</label>
                            <textarea id='reMemo' className="form-control" aria-label="With textarea" ref={reMemoRef} value={cuMemo} onChange={changeMemo}></textarea>
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor='reDL'>Deadline</label>
                            <input id='reDL' type="date" className="form-control" value={cuDL} onChange={changeDL}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-success" onClick={changeClick}>Change</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id={ 'deleteModal' + todo.id } tabindex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-danger">
                        <h5 className="modal-title text-white">Delete the Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                      <div className="modal-body">
                          <div className="input-group mb-3">
                              <label className="input-group-text">Title</label>
                              <span className="form-control">{todo.title}</span>
                          </div>
                              <div className="input-group mb-3">
                              <label className="input-group-text">Memo</label>
                              <span className="form-control">{todo.memo}</span>
                          </div>
                          <div className="input-group mb-3">
                              <label className="input-group-text">Deadline</label>
                              <span className="form-control">{year}/{month}/{day}</span>
                          </div>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-danger" onClick={deleteClick}>Delete</button>
                      </div>
                  </div>
              </div>
          </div>

    </div>
  )
}

export default Todo 