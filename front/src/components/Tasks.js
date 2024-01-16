import React from 'react';
import TaskRow from './TaskRow';
import {useState} from 'react';
import AddTask from './AddTask';
import EditTask from './EditTask';
import { isAfter } from 'date-fns';

export default function Tasks(probs) {
    const [addTask, setAddTask] = useState(null);
    const [editTask, setEditTask] = useState(null);
    const [editingTask, setEditingTask] = useState(null);

    const handleDeleteTask = (id, e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/delete-task?id=${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            probs.setTask(prevTask =>
                prevTask.filter(task => task.id !== id));
        })
        .catch(error => console.error("Błąd podczas usuwania: ", error));
    }

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    const handleChangeStatus = (id, e) => {

        e.preventDefault();
        fetch(`http://localhost:8080/change-status?id=${id}`,{
            method: 'PUT',
        })
        .then(response => response.json())
        .then( updatedTask => {
            const currentTasks = [...probs.tasks];
            const updatedTaskIndex = currentTasks.findIndex(task => task.id === updatedTask.id);
            currentTasks[updatedTaskIndex] = updatedTask;
            probs.setTasks(currentTasks);
            probs.setCheckPoints(1);
        })
        
    }

    const handleAddTask = () => {
        setAddTask(1);
    }

    const handleCancelAdd = () => {
        setAddTask(null);
    }

    const handleEditTask = (id, e) => {
        e.preventDefault();
        setEditTask(prevEditTask => {

            console.log(prevEditTask);
            const taskToEdit = probs.tasks.find(task => task.id === id);
            setEditingTask(taskToEdit);
            if(isAfter(getTodayDate(), taskToEdit.dueDate)){
                alert('Nie można edytować zadań po dacie ważności!');
                setEditTask(null);
                setEditingTask(null);
                return;
            }
            return id;
        });
    }

    const handleCancelEditTask = () => {
        setEditTask(null);
        setEditingTask(null);
    }
    
    return (
        <>
            {editTask ? (
                <>
                    <EditTask
                        editingTask = {editingTask}
                        handleCancelEditTask = {handleCancelEditTask}
                        projects = {probs.projects}
                        setTasks = {probs.setTasks}
                        setEditTask = {setEditTask}
                        setEditingTask = {setEditingTask}
                        thisProjectId = {editingTask.project.id}
                    >                       
                    </EditTask>
                </>
            ):(
                <>
        {addTask ? (
                <AddTask
                    handleCancelAdd = {handleCancelAdd}
                    projects = {probs.projects}
                    defaultProject = {probs.selectedProjectId}
                    setTasks = {probs.setTasks}
                    setAddTask = {setAddTask}
                ></AddTask>
            ):(
                <>
            {probs.visibleTasks[probs.id] && probs.selectedProjectId === probs.id && (
                <div className='tasks'>
                    {probs.tasks.map( task => (
                        <TaskRow
                            key={task.id}
                            task = {task}
                            handleDeleteTask = {handleDeleteTask}
                            handleChangeStatus = {handleChangeStatus}
                            handleEditTask = {handleEditTask}
                        ></TaskRow>
                    ))}
                    <div className='addTaskButton flexBox'>
                        <button>
                            <i className='icon-plus' onClick={() => handleAddTask()}></i>
                        </button> 
                    </div>
                     
                </div>
            )} 
        </>
            )

        }
        
        </>
            )}
        </>
        
        
    );
}