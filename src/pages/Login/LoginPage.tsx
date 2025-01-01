import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from './component/LoginComponent';
import API from '@/api/index';

interface FormData {
    email: string;
    password: string;
}

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (formData: FormData) => {
        try {
            const response = await API.userApi.loginUser(formData); // 로그인 API 호출
            if (response.status === 200) {
                console.log('Login successful:', response.data);
                navigate('/selectkids');
                setSuccess("Login successful!");
                setError(null);
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            setSuccess(null);
            console.error('Error during login:', error);
        }
    };
    

    return (
        <div>
            <LoginComponent onClickSubmit={handleSubmit} errormsg={error} success={success} />
        </div>
    );
};

export default LoginPage;
