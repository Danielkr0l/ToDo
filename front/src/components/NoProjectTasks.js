import { useState } from "react"
import { useEffect } from "react"
import TaskRow from './TaskRow'
import AddTask from './AddTask'
import EditTask from './EditTask'
import { isAfter } from 'date-fns'

export default function Tasks(probs){
    const [tasks, setTasks] = useState([]);
    const [addTask, setAddTask] = useState(null);
    const [editTask, setEditTask] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    
    useEffect(() => {
        fetch(`http://localhost:8080/for-project?id=${0}`)
        .then(response => response.json())
        .then(data => {
            setTasks(data);
        }).catch(error => console.error('Błąd podczas pobierania zadań:', error));

    },[tasks])

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    const handleAddTask = () => {
        setAddTask(1);
    }

    const handleCancelAdd = () => {
        setAddTask(null);
    }

    const handleDeleteTask = (id, e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/delete-task?id=${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            setTasks(prevTask =>
                prevTask.filter(task => task.id !== id));
        })
        .catch(error => console.error("Błąd podczas usuwania: ", error));
    }

    const handleChangeStatus = (id, e) => {

        e.preventDefault();
        fetch(`http://localhost:8080/change-status?id=${id}`,{
            method: 'PUT',
        })
        .then(response => response.json())
        .then( updatedTask => {
            const currentTasks = [...tasks];
            const updatedTaskIndex = currentTasks.findIndex(task => task.id === updatedTask.id);
            currentTasks[updatedTaskIndex] = updatedTask;
            setTasks(currentTasks);
            probs.setCheckPoints(1);
        })
        
    }

    const handleEditTask = (id, e) => {
        e.preventDefault();
        
        setEditTask(prevEditTask => {

            console.log(prevEditTask);
            const taskToEdit = tasks.find(task => task.id === id);
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

    return(
        <>
            {editTask ? (
                <div className="project flexBox">
                    <EditTask
                        editingTask = {editingTask}
                        handleCancelEditTask = {handleCancelEditTask}
                        projects = {probs.projects}
                        setTasks = {setTasks}
                        setEditTask = {setEditTask}
                        setEditingTask = {setEditingTask}
                        thisProjectId = {0}
                    >                       
                    </EditTask>
                </div>

            ):(
        <>
        {addTask ? (''):(<h2>Zwykłe zadania:</h2>)}  

        <div className="project flexBox">
            {addTask ? (
                <AddTask
                    handleCancelAdd = {handleCancelAdd}
                    projects = {probs.projects}
                    defaultProject = {0}
                    setTasks = {setTasks}
                    setAddTask = {setAddTask}
                ></AddTask>
            ):(
                <>
                
                <div className="addTaskButton flexBox button2">
                <button onClick={() => handleAddTask()}><i className="icon-plus"></i></button>
                </div>
                
            
            {
                tasks.length > 0 ? (
                    <div className="tasks">
                    {
                        tasks.map( task => (
                        <TaskRow
                            key={task.id}
                            task = {task}
                            handleDeleteTask = {handleDeleteTask}
                            handleChangeStatus = {handleChangeStatus}
                            handleEditTask = {handleEditTask}
                            
                        ></TaskRow>))}

                    </div>
                ):(
                    <p>Brak zwykłych zadań</p>
                )
            }
                </>
            )}
            
            
        </div>
        </>

            )}
        </>
        
    )
}