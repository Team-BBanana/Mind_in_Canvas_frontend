import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Input from "@/components/recycleComponent/InputBox/InputBox.tsx";
import style from "./SignupComponent.module.css"; 
import Button from "@/components/recycleComponent/Button/Button.tsx";

interface FormData {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

interface SignupProps {
    errormsg: string | null;
    success: string | null;
    onClickSubmit: (formData: FormData) => void;
}

const SignupComponent: React.FC<SignupProps> = ({ errormsg, success, onClickSubmit }) => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const password_confirmRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const name = usernameRef.current?.value || "";
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        const password_confirm = password_confirmRef.current?.value || "";

        onClickSubmit({ name, email, password, password_confirm });
    };

    return (
        <div className={style.container}>
            <div className={style.content}>
                <form onSubmit={handleSubmit} className={style.formContainer}>
                    <h1>회원가입</h1>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="부모님 이름"
                        value={formData.name}
                        onChange={handleChange}
                        ref={usernameRef}
                        required
                    />
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="이메일"
                        value={formData.email}
                        onChange={handleChange}
                        ref={emailRef}
                        required
                    />
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                        ref={passwordRef}
                        required
                    />
                    <Input
                        type="password"
                        id="password_confirm"
                        name="password_confirm"
                        placeholder="비밀번호 확인"
                        value={formData.password_confirm}
                        onChange={handleChange}
                        ref={password_confirmRef}
                        required
                    />

                    {errormsg && <p className="error">{errormsg}</p>}
                    {success && <p className="success">{success}</p>}
                    <div className={style.buttonContainer}>
                        <Button type="submit">회원가입</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupComponent;
