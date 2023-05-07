import React from 'react'
import { useRef } from 'react'


const Todo = ({ todo }) => {

  const reTitleRef = useRef();
  const reMemoRef = useRef();
  const reDLRef = useRef();

  const changeClick = () => {
    const reTask = {
      id:todo.id,
      title:reTitleRef.current.value,
      memo:reMemoRef.current.value,
      deadline:reDLRef.current.value,
    } 
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reTask)
    })
      .then(res => res.json())
  };

  const deleteClick = () => {
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
      .then(res => res.json())
  };

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
                  <span className="fw-bold">{todo.deadline.year}</span>
                </header>
                <div className="d-flex justify-content-around mt-2">
                  <span className="align-self-center">by</span>
                  <div className="">
                    <span className="fs-2">{todo.deadline.month}</span>
                    <span className="fs-2">/</span>
                    <span className="fs-2">{todo.deadline.day}</span>
                  </div>
                </div>
              </div>
              <div className="col-8 border-end">
                {todo.memo}
              </div>
              <div className="col-2 d-grid gap-2">
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#changeModal">change</button>
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#deleteModal">delete</button>
              </div>
            </div>
          </div>
        </li>

        <div className="modal fade" id="changeModal" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-success">
                        <h5 className="modal-title text-white">Change the Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <p><label className="input-group-text" htmlFor='reTitle'>Title</label></p>
                            <input id="reTitle" className="form-control" type="text" ref={reTitleRef}/>
                        </div>
                        <div className="input-group mb-3">
                        <p><label className="input-group-text" htmlFor='reMemo'>Memo</label></p>
                            <textarea id='reMemo' className="form-control" aria-label="With textarea" ref={reMemoRef}></textarea>
                        </div>
                        <div className="input-group mb-3">
                            <p><label className="input-group-text" htmlFor='reDL'>Deadline</label></p>
                            <input id='reDL' type="date" className="form-control" ref={reDLRef}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-success" onClick={changeClick}>Change</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
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
                              <span className="form-control">{todo.deadline.year}/{todo.deadline.month}/{todo.deadline.day}</span>
                          </div>
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <input type="button" className="btn btn-danger" onClick={deleteClick} value="Delete"/>
                      </div>
                  </div>
              </div>
          </div>

    </div>

  )
}

export default Todo 