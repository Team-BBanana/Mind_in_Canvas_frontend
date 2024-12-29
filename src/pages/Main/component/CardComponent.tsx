import React from "react";
import style from "./CardComponent.module.css";

interface CardComponentProps {
    imageUrl?: string;
    title?: string;
    onClick: () => void;
    isAddButton?: boolean;
}

const CardComponent: React.FC<CardComponentProps> = ({ imageUrl, title, onClick, isAddButton }) => {
    return (
        <div className={style.card} onClick={onClick}>
            {isAddButton ? (
                <div className={style.addButton}>+</div>
            ) : (
                <>
                    <img src={imageUrl} alt={title} className={style.image} />
                    <h2>{title}</h2>
                </>
            )}
        </div>
    );
};

export default CardComponent; 