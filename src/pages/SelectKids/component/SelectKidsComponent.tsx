import React from "react";
import style from "./SelectKidsComponent.module.css";
import { useNavigate } from "react-router-dom";

interface SelectKidsComponentProps {
    kids: { id: number; name: string }[];
}

const SelectKidsComponent: React.FC<SelectKidsComponentProps> = ({ kids }) => {
    const navigate = useNavigate();

    return (
        <div className={style.container}>
            {kids.map((kid) => (
                <div
                    key={kid.id}
                    className={style.kidCard}
                    onClick={() => navigate(`/kid/${kid.id}`)}
                >
                    {kid.name}
                </div>
            ))}
        </div>
    );
};

export default SelectKidsComponent; 