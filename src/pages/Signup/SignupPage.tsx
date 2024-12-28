
import React, { useState } from 'react';
import './styles.css';
import Header from '../../components/recycleComponent/Header/Header';
import Footer from '../../components/recycleComponent/Footer/Footer';
import Input from '../../components/recycleComponent/InputBox/InputBox';
import Button from '../../components/recycleComponent/Button/Button';
import SingupComponent from "@/pages/Signup/component/SingupComponent.tsx";
import axios from "axios";
import API from "@/api";

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

    const [error, setError] = useState<string| null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    const handleSubmit = async (formData : FormData) => {

        if (formData.password !== formData.password_confirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            const result = await API.userApi.signupUser({
                name: formData.username,
                email: formData.email,
                password: formData.password,
                role : "ROLE_USER",
                socialProvider: "GOOGLE",
                phoneNumber: "010-5096-6584"
            });
            if ( result.status == 201){
                setSuccess('Signup successful!');
                setError(null);
            }
            setError(result.data.body);

        } catch (err) {
            console.log(err)
            if (axios.isAxiosError(err) && err.response) {
                const data = err.response.data.errors;
                const errors: string[] = [];

                if (data.username) {
                    errors.push(data.username);
                }
                if (data.nickname) {
                    errors.push(data.nickname);
                }
                if (data.email) {
                    errors.push(data.email);
                }
                if (data.password) {
                    errors.push(data.password);
                }
                if (data.occupation) {
                    errors.push(data.occupation);
                }

                setError(errors.join('\n'));
            } else {
                setError('Signup failed. Please try again.');
            }
            setSuccess(null);
        }
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
        <div>
            <SingupComponent errormsg = {error} success = {success} onClickSubmit={handleSubmit} />
        </div>
    );
};

export default SignupPage;