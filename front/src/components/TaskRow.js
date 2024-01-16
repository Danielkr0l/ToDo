import React from 'react';

export default function Task(probs) {


    return (
        <div className='task flexBox'>
            <div className='firstRowTask flexBox'>
                <p className={probs.task.done === 1 ? 'tittle done' : 'tittle notdone'}>{probs.task.name}</p>
                <p className='date'>do {probs.task.dueDate}</p>
            </div>
            <div className='taskContent flexBox'>
                <span className={probs.task.done === 1 ? 'done' : ''}>{probs.task.description}</span>
                <span>Punkty: {probs.task.points}</span>
            </div>
            <div className='taskContent flexBox'>
                <div>
                <span>Status :  <span className={probs.task.done === 1 ? 'done' : 'notdone'}>{probs.task.done === 1 ? ('Wykonane'):('Niewykonane')}</span> </span>
                <button className='buttoon' onClick={(e) => probs.handleChangeStatus(probs.task.id, e)}>Zmień</button>
                </div>
                <div className='buttons projectButtons'>
                    <button onClick={(e) => probs.handleDeleteTask(probs.task.id, e)}>
                        <i className='icon-trash'></i>
                    </button>
                    <button onClick={(e) => probs.handleEditTask(probs.task.id, e)}>
                        <i className='icon-pencil'></i>
                    </button>                  
                </div>
                
            </div>
        </div>
    );
}