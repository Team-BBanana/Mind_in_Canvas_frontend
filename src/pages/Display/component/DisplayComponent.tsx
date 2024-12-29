import React from 'react';

interface DisplayComponentProps {
    title: string;
    imageUrl: string;
}

const DisplayComponent: React.FC<DisplayComponentProps> = ({ title, imageUrl }) => {
    return (
        <div>
            <h1>{title}</h1>
            <img src={imageUrl} alt={title} style={{ width: '100%', height: 'auto' }} />
        </div>
    );
};

export default DisplayComponent; 