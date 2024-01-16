import React, { useEffect} from 'react';

const PointsCounter = (probs) => {
    
    useEffect(() => {
        probs.setCheckPoints(0);
        fetch('http://localhost:8080/points')
        .then(response => response.json())
        .then(data => probs.setPoints(data))
        .catch(error => console.error('Błąd podczas pobierania punktów:', error));
    }, [probs.checkPoints, probs])
    return(
        <div className='points'>
            Punkty: {probs.points}
        </div>
    );
}

export default PointsCounter;