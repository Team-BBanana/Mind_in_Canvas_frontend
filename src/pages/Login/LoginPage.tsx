import React, { useState } from 'react';
import './styles.css';
import Header from '../../components/recycleComponent/Header/Header';
import Footer from '../../components/recycleComponent/Footer/Footer';
import LoginComponent from './component/LoginComponent';

interface FormData {
    email: string;
    password: string;
}

const Logo = () => (
    <div className="logo">
        <img src="/src/assets/imgs/mindincanvas_logo.png" alt="로고" />
    </div>
);

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    //에러뜨는건 사용이 안되서 뜨는거라 일단 그냥 두면됩니다. 실행되는데 문제 x formData도 마찬가지

    const handleSubmit = async (formData: FormData) => {
        console.log(formData);
        // 로그인 처리 로직 추가
        // 성공 또는 실패에 따라 setError 또는 setSuccess 호출
    };

    return (
        <div className="container">
            <Header />
            <div className="content">
                <Logo />
                <div className="login-box">
                    <img src="src/assets/imgs/textLogo.png" alt="그림로고" />
                    <LoginComponent onClickSubmit={handleSubmit} errormsg={error} success={success} />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;