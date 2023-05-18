import React from 'react'

import { useRef } from 'react';



function AddTask() {

    const newTitleRef = useRef();
    const newMemoRef = useRef();
    // const newDLRef = useRef();
  
    const addClick = () =>{
        const newTask = {
            title:newTitleRef.current.value,
            memo:newMemoRef.current.value,
            deadline:document.getElementById('newDateInput').value,
        }
        fetch('/todo/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask),
        })
        .then(response => {
            if (response.ok) {
              window.location.replace('/todo');
            }
        })
        .catch(error => console.error('Error:', error));
    }
  
    return (
        
    <div>

        <div className="col-12 text-center">
            <button type="button" className="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                +New Task
            </button>
        </div>
        <div className="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary">
                        <h5 className="modal-title text-white">New Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor='newTitle'>Title</label>
                            <input id="newTitle" className="form-control" type="text" ref={newTitleRef}></input>
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" htmlFor='newMemo'>Memo</label>
                            <textarea id='newMemo' className="form-control" aria-label="With textarea" ref={newMemoRef}></textarea>
                        </div>
                        <div class="input-group date">
                            <label className="input-group-text">Deadline</label>
                            <input id="newDateInput" type="date" className="form-control"></input>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={addClick}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AddTask;
