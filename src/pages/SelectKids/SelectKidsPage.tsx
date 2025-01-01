import React, { useEffect, useState } from 'react';
import API from '@/api';
import SelectKidComponent from './component/SelectKidsComponent';
import style from './component/SelectKidsComponent.module.css';
import { useNavigate } from 'react-router-dom';

interface Kid {
    kidId: string;
    name: string;
    age: number;
    createdAt: string;
    updatedAt: string;
}

const SelectKidsPage: React.FC = () => {
    const [kids, setKids] = useState<Kid[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchKids = async () => {
            try {
                const response = await API.kidApi.findmykidall();
                    // If respnse data is empty, navigate to /selectkids
                setKids(response.data);

            } catch (error) {
                console.error('Error fetching kids data:', error);
                // Optionally navigate to /selectkids on error
                navigate('/signup/kids');
            }
        };

        fetchKids();
    }, [navigate]);

    const handleKidSelection = async (kidId: string) => {
        console.log(`Selected kidId: ${kidId}`);
        try {
            const response = await API.kidApi.tokenGenerate({kidId: kidId});
            console.log('Token generated:', response.data);
            navigate('/');
            // Perform additional actions with the token if needed
        } catch (error) {
            console.error('Error generating token:', error);
        }
    };

    return (
            <div className={style.container}>
                <h1 className={style.title}>✨그림을 그릴 아이를 선택해주세요✨</h1>
                <div className={style.accountlist}>
                    {kids.map(kid => (
                        <SelectKidComponent key={kid.kidId} kid={kid} onKidSelect={handleKidSelection} />
                    ))}
                </div>
            </div>
        
    );
};

export default SelectKidsPage;