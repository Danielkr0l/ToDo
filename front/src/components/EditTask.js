import React from 'react';
import { useState } from "react"
import { isAfter } from 'date-fns';

export default function EditTask(probs){
    const [newTaskName, setNewTaskName] = useState(probs.editingTask.name);
    const [newPoints, setNewPoints] = useState(probs.editingTask.points);
    const [newDescription, setNewDescription] = useState(probs.editingTask.description);
    const [newDate, setNewDate] = useState(probs.editingTask.dueDate);
    const [projectId, setNewProjectId] = useState(probs.thisProjectId);


    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }


    const handleSaveTask = (id) => {
        if(newTaskName.length === 0){
            alert('Nazwa zadania nie może być pusta!');
            return;
        }
        if(newTaskName.length > 255){
            alert('Nazwa zadania nie może przekroczyć 255 znaków!');
            return;
        }
        if(newPoints <=0 || newPoints > 10){
            alert('Punkty w przedziale 1-10!');
            return;
        }
        if(newDescription.length === 0){
            alert('Opis zadania nie może być pusty!');
            return;
        }
        if(newDescription.length > 255){
            alert('Opis zadania nie może przekroczyć 255 znaków!');
            return;
        }
        if(isAfter(getTodayDate(), newDate)){
            alert('Zła data!');
            return;
        }
        if(newDate.length === 0){
            alert('Zbyt krótka data data!');
            return;
        }

        const taskData = {
            name: newTaskName,
            description: newDescription,
            points: newPoints,
            dueDate: newDate,
            project: projectId
          };
        
          fetch(`http://localhost:8080/update-task?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            probs.setEditTask(null);
            probs.setEditingTask(null);
            setNewDate('');
            setNewDescription('');
            setNewPoints(null)
            setNewProjectId(0);
            setNewTaskName('');
          })
        
    }

    return(
        <div className="addTask flexBox">
            <h2>Nowe zadanie</h2>
            <span className="borderline"></span>
            <div className="tittleAndPoints flexBox">
                <label>
                    Tytuł: 
                    <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)}></input>
                </label>
                <label>
                    Punkty: 
                    <input type="number" value={newPoints} min={1} max={10} onChange={(e) => setNewPoints(e.target.value)}></input>
                </label>
            </div>
            <div className="description flexbox">
                <label>Opis:<br></br>
                <textarea value={newDescription} rows="4" cols="75" onChange={(e) => setNewDescription(e.target.value)}></textarea>
                </label>
                
            </div>  
            <div className="projectAndDate flexbox">
                <label>
                    Project: 
                    <select onChange={(e) => setNewProjectId(e.target.value)}>
                        <option value={0} {...(projectId === 0 && { selected: true })}>Brak</option>
                        {probs.projects.map(project => (
                            <option value={project.id} {...(projectId === project.id && { selected: true })}>{project.name} </option>
                        ))}
                    </select>
                </label>
                <label>
                    Data:
                    <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}>

                    </input>
                </label>
            </div>
            <div className="edit flexBox">
                <button onClick={()=>handleSaveTask(probs.editingTask.id)}>Zapisz</button>
                <button onClick={() => probs.handleCancelEditTask()}>Anuluj</button>
            </div>
            
        </div>
    )
}