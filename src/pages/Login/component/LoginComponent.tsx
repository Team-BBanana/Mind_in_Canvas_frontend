import {ChangeEvent, FormEvent, useRef, useState} from "react";
import style from "./LoginComponent.module.css"
import Input from "@/components/recycleComponent/InputBox/InputBox.tsx";
import Button from "@/components/recycleComponent/Button/Button.tsx";
import { useNavigate } from "react-router-dom";


interface FormData {
    email: string;
    password: string;
}

interface LoginProps {
    errormsg: string | null;
    success: string | null;
    onClickSubmit: (formData: FormData) => void;
}

const LoginComponent: React.FC<LoginProps> = ({ errormsg, success, onClickSubmit }) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();


    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        onClickSubmit({ email, password });
    };

    const handleClick = (path: string) => {
        navigate(path);
    };

    const handleClickGoogleLogin = (path: string) => {
        window.location.href = path;
    };

    const handleClickLogout = (path: string) => {
        window.location.href = path;
    };

    return (
        <div className={style.loginContainer}>
            <h2>로그인</h2>

            <form onSubmit={handleSubmit} className={style.formContainer}>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    label="email"
                    value={formData.email}
                    onChange={handleChange}
                    ref={emailRef}
                    required
                />
                <Input
                    type="password"
                    id="password"
                    name="password"
                    label="password"
                    value={formData.password}
                    onChange={handleChange}
                    ref={passwordRef}
                    required
                />

                {errormsg && <p className="error" style={{ whiteSpace: 'pre-wrap' }}>{errormsg}</p>}
                {success && <p className="success">{success}</p>}
                <div>
                    <Button type="submit" >로그인</Button>
                    <Button type="submit" onClick={() => handleClickLogout("http://127.0.0.1:8080/auth/logout")}>로그아웃</Button>
                    <Button type="button" onClick={() => handleClick("/signup")}>회원가입</Button>
                    <Button type="button" onClick={() => handleClickGoogleLogin("http://127.0.0.1:8080/oauth2/authorization/google")}>구글 소셜 로그인</Button>
                </div>
            </form>

        </div>
    );
}

export default LoginComponent;