import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Input from "@/components/recycleComponent/InputBox/InputBox.tsx";
import style from "./SignupComponent.module.css"; 
import Button from "@/components/recycleComponent/Button/Button.tsx";

interface KidsFormData {
    name: string;
    age: number;
}

interface KidsSignupProps {
    errormsg: string | null;
    success: string | null;
    onClickSubmit: (formData: KidsFormData) => void;
}

const SignupComponent: React.FC<KidsSignupProps> = ({ errormsg, success, onClickSubmit }) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<KidsFormData>({
        name: '',
        age: 0
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const name = nameRef.current?.value || "";
        const age = Number(ageRef.current?.value) || 0;

        onClickSubmit({ name, age });
    };

    return (
        <div className={style.container}>
            <div className={style.content}>
                <form onSubmit={handleSubmit} className={style.formContainer}>
                    <h1>아이를 등록해주세요</h1>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="로봇이 불러줄 아이의 이름"
                        value={formData.name}
                        onChange={handleChange}
                        ref={nameRef}
                        required
                    />
                    <Input
                        type="number"
                        id="age"
                        name="age" 
                        placeholder="아이의 나이"
                        value={formData.age.toString()}
                        onChange={handleChange}
                        ref={ageRef}
                        required
                    />
                    
                    {errormsg && <p className="error">{errormsg}</p>}
                    {success && <p className="success">{success}</p>}
                    <div className={style.buttonContainer}>
                        <Button type="submit">아이 등록하기</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupComponent;
