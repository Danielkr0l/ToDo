import './App.css';
import React, { useState} from 'react';
import './fontello-172969c3/fontello-172969c3/css/fontello.css'
import PointsCounter from './components/PointsCounter.js';
import Projects from './components/Projects.js';
import NoProjectTasks from './components/NoProjectTasks.js'

function App() {
  const [points, setPoints] = useState(null);
  const [checkPoints, setCheckPoints] = useState(null);
  const [projectsOrTasks, setProjectsOrTasks] = useState('projects');
  const [projects, setProjects] = useState([]);

  const handleChooseProjects = (e) => {
    e.preventDefault();
    setProjectsOrTasks('projects');
  }

  const handleChooseTasks = (e) => {
    e.preventDefault();
    setProjectsOrTasks('tasks');
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          To Do List
        </p>
        <PointsCounter
        points = {points}
        setPoints = {setPoints}
        checkPoints = {checkPoints}
        setCheckPoints = {setCheckPoints}
        ></PointsCounter>
      </header>
      <div className='flexBox'>
        <button className={projectsOrTasks === 'projects' ? ("choose active"):("choose disactive")} onClick={(e) =>handleChooseProjects(e)}>Projekty</button>
        <button className={projectsOrTasks === 'tasks' ? ("choose active"):("choose disactive")} onClick={(e) => handleChooseTasks(e)}>Zwykłe zadania</button>
      </div>
      <div className='flexBox main'>
        {projectsOrTasks === 'projects' ? (
          <Projects
          checkPoints = {checkPoints}
          setCheckPoints = {setCheckPoints}
          projects = {projects}
          setProjects = {setProjects}
          ></Projects>
        ):(
          <NoProjectTasks
          checkPoints = {checkPoints}
          setCheckPoints = {setCheckPoints}
          projects = {projects}
          ></NoProjectTasks>
        )
        }  
      </div>
    
      
    </div>
  );
}

export default App;
