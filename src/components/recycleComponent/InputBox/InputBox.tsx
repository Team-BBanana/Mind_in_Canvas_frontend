import { ChangeEvent, forwardRef } from 'react';
import style from "./InputBox.module.css"

interface InputProps {
    type: string;
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    type, id, name, label, value, onChange, required = false}, ref) => {

    return (
        <div className={style.inputBoxContainer} >
            <label htmlFor={id}>{label} :</label>
            <input className={style.inputBox}
                   type={type}
                   id={id}
                   name={name}
                   value={value}
                   onChange={onChange}
                   ref={ref}
                   required={required}
            />
        </div>
    );
});
Input.displayName = "InputBox"

export default Input;