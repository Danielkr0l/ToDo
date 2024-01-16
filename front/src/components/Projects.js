import React, { useEffect, useState} from 'react';
import ProjectRow from './ProjectRow';
import AddProjectBox from './AddProjectBox';
import EditProject from './EditProjects';

const Projects = (probs) => {
    const [editingProject, setEditingProject] = useState(null);


    useEffect(() => {
        fetch('http://localhost:8080/projects')
        .then(response => response.json())
        .then(data => probs.setProjects(data))
        .catch(error => console.error('Błąd podczas pobierania zadań:', error));
    })

    const handleEditClick = (id) => {
        const projectToEdit = probs.projects.find(project => project.id === id);
        setEditingProject(projectToEdit);
    };

    const handleSaveEdit = (id, newName) => {

        fetch(`http://localhost:8080/update-project?id=${id}`, {
             method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({ name: newName })
        })
        .then(response => response.json())
        .then(updatedProject => {
            const updatedElement = probs.projects.map(project =>
                project.id === id ? {...project, name: updatedProject}:project
            );
            probs.setProjects(updatedElement);
            setEditingProject(null);
        })
        .catch(error => console.error('Błąd aktualizacji projektu: ',error))
    };

    const handleCancelEdit = () => {
        setEditingProject(null);
    }


    const handleDeleteProject = (id, e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/delete-project?id=${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            probs.setProjects(prevProject =>
                prevProject.filter(project => project.id !== id));
        })
        .catch(error => console.error("Błąd podczas usuwania: ", error));
    }


    return(
       <>
       {editingProject ? (
            <EditProject
            handleCancelEdit = {handleCancelEdit}
            handleSaveEdit = {handleSaveEdit}
            editingProject = {editingProject}
            ></EditProject>
        )
        :(
            <>
                <h2>Projekty:</h2>
                <AddProjectBox
                        setProjects = {probs.setProjects}
                ></AddProjectBox>
                {probs.projects.map( project => (
                <div className='projects flexBox' key={project.id}>
                    <ProjectRow
                        project = {project}
                        handleDeleteProject = {handleDeleteProject}
                        handleEditClick = {handleEditClick}
                        checkPoints = {probs.checkPoints}
                        setCheckPoints = {probs.setCheckPoints}
                        projects = {probs.projects}
                    ></ProjectRow>
                </div>
                ))}
            </>
        ) 
        
         }
        </>
    )
}

export default Projects;