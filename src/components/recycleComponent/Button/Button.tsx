import React from 'react';
import style from './Button.module.css';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ type, onClick, children, className }) => {
    return (
        <button type={type} onClick={onClick} className={`${style.buttonContainer} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
