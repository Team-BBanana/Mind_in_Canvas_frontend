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
            const response = await API.userApi.loginUser(formData);
            console.log("aaaaaaaaaaaaaaaa" + response);
            if (response.status === 302) {
                navigate('/'); // React Router를 사용하여 리다이렉션
                return;
            }

            console.log('Login successful:', response.data);
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="container" style={{ marginTop: '100px' }}>
            <LoginComponent onClickSubmit={handleSubmit} errormsg={error} success={success} />
        </div>
    );
};

export default LoginPage;
