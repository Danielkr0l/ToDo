import React, { useState } from 'react';

export default function AddProjectBox(probs) {

    const [newProjectName, setNewProjectName] = useState('');

    const handleAddProject = () => {
        if(newProjectName.trim() === ''){
            alert('Nazwa projektu nie może być pusta!');
            return;
        }
        const newProject = {name: newProjectName};
        probs.setProjects(prevProjects => [...prevProjects, newProject]);
        setNewProjectName("");

        fetch('http://localhost:8080/add-project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newProjectName }),
        })
        .then(response => response.json())
        .then(data => {
            probs.setProjects(prevProjects =>
                prevProjects.map(project =>
                project.id === newProject.id ? { ...project, ...data } : project
                ));
        })
        .catch(error => console.error("Błąd podczas dodawania: ", error))
        
    }

    return(
        <div className="addProject project flexBox">
            <h2>Dodaj Projekt:</h2>
            <div className='inputAdd flexBox'>
                <input
                 value={newProjectName}
                 onChange={e => setNewProjectName(e.target.value)}
                ></input>
                <button onClick={() => handleAddProject()}>Dodaj</button>
            </div>
            
        </div>
    )
}