import {ChangeEvent, FormEvent, useRef, useState} from "react";
import style from "./LoginComponent.module.css"
import Input from "@/components/recycleComponent/InputBox/InputBox.tsx";
import Button from "@/components/recycleComponent/Button/Button.tsx";


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

    return (
        <div className={style.loginContainer}>
            <form onSubmit={handleSubmit} className={style.formContainer}>
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
                <div className={style.checkboxContainer}>
                    <input type="checkbox" id="stayLoggedIn" />
                    <span className={style.checkboxLabel}>로그인 상태 유지</span>
                </div>

                {errormsg && <p className="error" style={{ whiteSpace: 'pre-wrap' }}>{errormsg}</p>}
                {success && <p className="success">{success}</p>}
                <div className={style.buttonContainer}>
                    <Button type="submit" className={style.loginButton}>로그인</Button>
                </div>
                <div className={style.signInContainer}>    
                    <div className={style.googleSignIn}>
                        <button className={style.googleButton}>
                            <img src="/src/assets/imgs/web_neutral_rd_SI.png"></img>
                        </button>
                    </div>
                    <div className={style.options}>
                        <a href="#">회원가입</a>
                        <a href="#">비밀번호 찾기</a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;