import React, { useState } from 'react';
import './styles.css';
import Header from '../../components/recycleComponent/Header/Header';
import Footer from '../../components/recycleComponent/Footer/Footer';
import Input from '../../components/recycleComponent/InputBox/InputBox';
import Button from '../../components/recycleComponent/Button/Button';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupPage = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 회원가입 처리 로직 추가
        console.log(formData);
        // 성공 또는 실패에 따라 setError 또는 setSuccess 호출
    };

    return (
        <div className="container">
            <Header />
            <div className="content">
                <div className="signup-box">
                    <h2>회원가입</h2>
                    <form onSubmit={handleSubmit} className="formContainer">
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="이메일"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="비밀번호"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="비밀번호 확인"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">{success}</p>}
                        <div className="buttonContainer">
                            <Button type="submit" className='signupButton'>회원가입</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignupPage;