import React from 'react';
import { useParams } from 'react-router-dom';
import { cardData } from '../Main/component/cardData';
import DisplayComponent from './component/DisplayComponent';

const DisplayPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const cardIndex = parseInt(id || '0', 10) - 1;
    const card = cardData[cardIndex];

    if (!card) {
        return <div>Image not found</div>;
    }

    return (
        <DisplayComponent title={card.title} imageUrl={card.imageUrl} />
    );
};

export default DisplayPage; 