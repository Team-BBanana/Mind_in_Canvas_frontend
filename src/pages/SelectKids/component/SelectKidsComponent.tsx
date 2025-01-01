import React from 'react';
import style from "./SelectKidsComponent.module.css"
import KidImage from "@/assets/imgs/kid1.svg?react";

interface Kid {
    kidId: string;
    name: string;
    age: number;
    createdAt: string;
    updatedAt: string;
}

interface SelectKidsComponentProps {
    kid: Kid;
    onKidSelect: (kidId: string) => void;
}

const SelectKidComponent: React.FC<SelectKidsComponentProps> = ({ kid, onKidSelect }) => {


    return (
        <div className={style.container}>
            <div
                className={style.accountItem}
                onClick={() => onKidSelect(kid.kidId)}
            >
                <KidImage style={{ width: '100px', height: '150px', cursor: 'pointer' }} />
                <p>{kid.name}</p>
            </div>
        </div>
    );
};

export default SelectKidComponent;