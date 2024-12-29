import {ChangeEvent, FormEvent, useRef, useState} from "react";
import style from "./LoginComponent.module.css"
import Input from "@/components/recycleComponent/InputBox/InputBox.tsx";
import Button from "@/components/recycleComponent/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import GoogleSigninIcon  from '@/assets/imgs/googleSignin.svg?react';
import Logo from '@/assets/imgs/textLogo.png';
import Mind_in_canvas from '@/assets/imgs/mindincanvas_logo.png';
import Footer from "@/components/recycleComponent/Footer/Footer";


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

    // const handleClickLogout = (path: string) => {
    //     window.location.href = path;
    // };

    return (
        <div className={style.container}>
            <div className={style.content}>
                <img src={Mind_in_canvas} className={style.MindinCanvasImage} alt="Mind in Canvas" />

                <div className={style.loginbox}>

                    <img src={Logo} alt="text logo" className={style.TextLogoImage} />


                    <div className={style.loginContainer}>
                        <form onSubmit={handleSubmit} >
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

                            
                            <div >
                                <div className={style.buttonContainer}>
                                    <Button type="submit" className={style.loginButton} >로그인</Button>
                                </div>

                                <div className={style.signupContainer}>
                                    <div className={style.options}>
                                            <a type = "button" className={style.signupLink} onClick={() => handleClick("/signup")} >회원가입</a>
                                            <a type = "button" className={style.signupLink} onClick={() => handleClick("/signup")} >비밀번호 찾기</a>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleClickGoogleLogin("http://127.0.0.1:8080/oauth2/authorization/google")}
                                            className = {style.googleLogin}
                                            >
                                            <GoogleSigninIcon className={style.googleLoginButton}/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        <Footer/>
        </div>
    );
};

export default LoginComponent;