import React from 'react';
import { useParams } from 'react-router-dom';
import { cardData } from '../Main/component/cardData';
import DisplayComponent from './component/DisplayComponent';
import style from './DisplayPage.module.css';
import Footer from '@/components/recycleComponent/Footer/Footer';

const DisplayPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const cardIndex = parseInt(id || '0', 10) - 1;
    const card = cardData[cardIndex];

    if (!card) {
        return <div>Image not found</div>;
    }

    return (
        <div className={style.container}>
            <h1 className={style.title}>{card.title}</h1>
            <div className={style.content}>
                <DisplayComponent title={card.title} imageUrl={card.imageUrl} />
            </div>
            <Footer />
        </div>
    );
};

export default DisplayPage; 