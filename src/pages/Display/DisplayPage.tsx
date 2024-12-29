import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DisplayComponent from './component/DisplayComponent';
import style from './DisplayPage.module.css';
import Footer from '@/components/recycleComponent/Footer/Footer';

interface ImageData {
    backgroundImageUrl: string;
    characterImages: string[];
}

const mockImageData: ImageData = {
    backgroundImageUrl: '/display_Mock_Image/그림속마음.png',
    characterImages: [
        '/display_Mock_Image/Bear1.png',
        '/display_Mock_Image/Bear2.png'
    ],
};

const DisplayPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [imageData, setImageData] = useState<ImageData | null>(null);

    useEffect(() => {
        // Simulate fetching data by setting mock data
        setImageData(mockImageData);
    }, [id]);

    if (!imageData) {
        return <div>로딩 중...</div>;
    }

    return (
        <DisplayComponent
            title={`ID: ${id}에 대한 디스플레이`}
            backgroundImageUrl={imageData.backgroundImageUrl}
            characterImages={imageData.characterImages}
        />
    );
};

export default DisplayPage; 