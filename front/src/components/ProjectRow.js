import React from 'react';
import {useState, useEffect} from 'react';
import Tasks from './Tasks';


export default function ProjectRow(probs) {
    const [visibleTasks, setVisibleTasks] = useState({});
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [projectTasks, setProjectTasks] = useState([]);
    const [taskNumber, setTaskNumber] = useState(null);


      useEffect(() => {
        fetch(`http://localhost:8080/for-project?id=${probs.project.id}`)
        .then(response => response.json())
        .then(data => {
            setSelectedProjectId(probs.project.id);
            setProjectTasks(data);
            
            
        })
        .catch(error => console.error('Błąd podczas pobierania zadań projektu:', error));
      }, [projectTasks, probs.project.id])

      useEffect(() => {
        fetch(`http://localhost:8080/task-num?id=${probs.project.id}`)
          .then(response => response.json())
          .then(data => {
            setTaskNumber(data); 
          })
          .catch(error => console.error('Błąd podczas pobierania liczby zadań:', error));
      }, [probs.project.id, projectTasks]);
    

    const showTasks = (e) => {
        e.preventDefault();
        toggleVisibleTasks(probs.project.id);
    }

    const toggleVisibleTasks = (id) => {
        setVisibleTasks(prevVisibleTasks => ({ ...prevVisibleTasks, [id]: !prevVisibleTasks[id] }));
      };
    
    return (
        <div className="project flexBox">
            <div className='projectName flexBox'>
                <p>Do zrobienia: {taskNumber}</p>
                <p className='tittle'>{probs.project.name}</p>
                <div className='projectButtons'>
                    <button onClick={(event) => showTasks( event)} >
                        {visibleTasks[probs.project.id] ? <i className='icon-angle-circled-up'></i> : <i className='icon-angle-circled-down'></i>}
                    </button>
                    <button onClick={(event) => probs.handleDeleteProject(probs.project.id, event)}>
                        <i className='icon-trash'></i>
                    </button>
                    <button onClick={() => probs.handleEditClick(probs.project.id)}>
                        <i className='icon-pencil'></i>
                    </button>
                    
                </div>
                
            </div>
            {visibleTasks[probs.project.id] && selectedProjectId === probs.project.id && (
            <Tasks                
                visibleTasks = {visibleTasks}
                id = {probs.project.id}
                selectedProjectId = {selectedProjectId}
                tasks = {projectTasks}
                setTasks = {setProjectTasks}
                checkPoints = {probs.checkPoints}
                setCheckPoints = {probs.setCheckPoints}
                projects = {probs.projects}
            ></Tasks>
            )}
        </div>
    );
}