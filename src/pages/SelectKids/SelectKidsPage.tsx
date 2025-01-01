import React, { useEffect, useState } from 'react';
import API from '@/api';
import CardComponent from '@/pages/Main/component/CardComponent';
import style from './SelectKidsPage.module.css';
import SelectKidComponent from './component/SelectKidsComponent';

interface Kid {
    kidId: string;
    name: string;
    age: number;
    createdAt: string;
    updatedAt: string;
    image: string; // Assuming each kid has an image URL
}

const SelectKidsPage: React.FC = () => {
    const [kids, setKids] = useState<Kid[]>([]);

    useEffect(() => {
        const fetchKids = async () => {
            try {
                const response = await API.kidApi.findmykidall();
                setKids(response.data); // Assuming the API returns an array of kids
            } catch (error) {
                console.error('Error fetching kids data:', error);
            }
        };

        fetchKids();
    }, []);

    return (
        <div className={style.container}>
            <h1 className={style.title}>아이 선택</h1>
            <div className={style.kidsList}>
                {kids.map(kid => (
                    <SelectKidComponent/>
                ))}
            </div>
        </div>
    );
};

export default SelectKidsPage;