import React, { useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import style from './DisplayComponent.module.css';

interface DisplayComponentProps {
    title: string;
    backgroundImageUrl: string;
    characterImages: string[];
}

interface Position {
    x: number;
    y: number;
}

const DisplayComponent: React.FC<DisplayComponentProps> = ({ title, backgroundImageUrl, characterImages }) => {
    const [positions, setPositions] = useState<Position[]>(characterImages.map(() => ({ x: 0, y: 0 })));

    const handleDrag = (index: number, e: DraggableEvent, data: DraggableData) => {
        const newPositions = [...positions];
        newPositions[index] = { x: data.x, y: data.y };
        setPositions(newPositions);
        // Optionally, save the new position to a database or local storage here
    };

    return (
        <div className={style.container}>
            <div className={style.backgroundImage} style={{ backgroundImage: `url(${backgroundImageUrl})` }}></div>
            {characterImages.map((image, index) => (
                <Draggable
                    key={index}
                    position={positions[index]}
                    onDrag={(e, data) => handleDrag(index, e, data)}
                >
                    <img src={image} alt={`Character ${index + 1}`} className={style.characterImage} />
                </Draggable>
            ))}
            <h1 className={style.title}>{title}</h1>
        </div>
    );
};

export default DisplayComponent; 