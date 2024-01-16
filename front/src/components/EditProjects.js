import React, { useState } from 'react';

const EditProject = (probs) => {
    const [editedName, setEditedName] = useState(probs.editingProject.name);

    const handleSave = () => {
        probs.handleSaveEdit(probs.editingProject.id, editedName)
    };

    return (
        <>
            <h2>Zmień nazwę projektu</h2>
            <div className='row project flexBox'>
                
                <label>
                    Nazwa:
                    <input className='editName' type='text' value={editedName} onChange={(e) => setEditedName(e.target.value)}/>
                </label>
                <div className='edit flexbox'>
                    <button onClick={handleSave}>Zapisz</button>
                    <button onClick={probs.handleCancelEdit}>Anuluj</button>
                </div>
                
            </div>
        </>
    )
}

export default EditProject;