import { useState } from 'react';
import LoginComponent from './component/LoginComponent';

interface FormData {
    email: string;
    password: string;
}


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
        <div className="container" style={{marginTop: '100px'}}>
            <LoginComponent onClickSubmit={handleSubmit} errormsg={error} success={success} />
        </div>
    );
};

export default LoginPage;