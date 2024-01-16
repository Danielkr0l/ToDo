import React, { useState } from "react"
import { isAfter } from 'date-fns';

export default function AddTask(probs) {
    const [newTaskName, setNewTaskName] = useState('');
    const [newPoints, setNewPoints] = useState(null);
    const [newDescription, setNewDescription] = useState('');
    const [newDate, setNewDate] = useState('');
    const [projectId, setNewProjectId] = useState(probs.defaultProject)

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }


    const handleSaveTask = () => {
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
        
          fetch('http://localhost:8080/add-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            probs.setTasks([]);
            probs.setAddTask(null);
            setNewDate('');
            setNewDescription('');
            setNewPoints(null)
            setNewProjectId(probs.defaultProject);
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
                    <input type="text" onChange={(e) => setNewTaskName(e.target.value)}></input>
                </label>
                <label>
                    Punkty: 
                    <input type="number" min={1} max={10} onChange={(e) => setNewPoints(e.target.value)}></input>
                </label>
            </div>
            <div className="description flexbox">
                <label>Opis:<br></br>
                <textarea rows="4" cols="75" onChange={(e) => setNewDescription(e.target.value)}></textarea>
                </label>
                
            </div>  
            <div className="projectAndDate flexbox">
                <label>
                    Project: 
                    <select onChange={(e) => setNewProjectId(e.target.value)}>
                        <option value={0} {...(probs.defaultProject === 0 && { selected: true })}>Brak</option>
                        {probs.projects.map(project => (
                            <option value={project.id} {...(probs.defaultProject === project.id && { selected: true })}>{project.name} </option>
                        ))}
                    </select>
                </label>
                <label>
                    Data:
                    <input type="date" onChange={(e) => setNewDate(e.target.value)}>

                    </input>
                </label>
            </div>
            <div className="edit flexBox">
                <button onClick={() => handleSaveTask()}>Zapisz</button>
                <button onClick={() => probs.handleCancelAdd()}>Anuluj</button>
            </div>
            
        </div>
    )
}