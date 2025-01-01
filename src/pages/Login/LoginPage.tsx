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
            // 로그인 성공 시 처리
            if (response.status === 200) {
                console.log('Login successful:', response.data); // 성공적인 로그인 데이터 출력
                // 서버에서 보낸 데이터가 JWT라면 로컬 저장소에 저장할 수 있습니다.
                // 예시: localStorage.setItem("jwt", response.data.token);
                navigate('/selectkids'); // React Router를 사용하여 리다이렉션
                setSuccess("Login successful!");
                setError(null);
                // 추가적인 처리 (예: 메인 페이지로 이동 등)
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            setSuccess(null);
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
