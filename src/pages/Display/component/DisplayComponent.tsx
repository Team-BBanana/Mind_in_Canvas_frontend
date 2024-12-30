import React, { useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import style from './DisplayComponent.module.css';
import Button from '@/components/recycleComponent/Button/Button';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [positions, setPositions] = useState<Position[]>(() => {
        const savedPositions = localStorage.getItem('characterPositions');
        return savedPositions ? JSON.parse(savedPositions) : characterImages.map(() => ({ x: 0, y: 0 }));
    });

    const handleDrag = (index: number, e: DraggableEvent, data: DraggableData) => {
        const newPositions = [...positions];
        newPositions[index] = { x: data.x, y: data.y };
        setPositions(newPositions);
        localStorage.setItem('characterPositions', JSON.stringify(newPositions));
    };

    const handleBack = () => {
        navigate('/');
    };

    const handleContinue = () => {
        navigate('/canvas', { state: { backgroundImageUrl } });
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
                <div className={style.buttonContainer}>
                    <Button type="button" onClick={handleBack}>뒤로가기</Button>
                    <Button type="button" onClick={handleContinue}>친구만들기</Button>
                </div>
        </div>
    );
};

export default DisplayComponent; 