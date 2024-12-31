import { useState } from "react";
import axios from "axios";
import API from "@/api";
import Header from "@/components/recycleComponent/Header/Header";
import Footer from "@/components/recycleComponent/Footer/Footer";
import KidsSignupComponent from "./component/KidsSignupComponent";
import { useNavigate } from "react-router-dom";

interface KidsFormData {
    name: string;
    age: number;
}

const SignupKidsPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (formData: KidsFormData) => {
        try {
            const result = await API.kidApi.signupKids({
                name: formData.name,
                age: formData.age
            });
            console.log('API 응답:', result);

            if (result.status === 201 || result.status === 200) {
                setSuccess('아이 등록이 완료되었습니다!');
                setError(null);
                navigate('/');
                return;
            }
            
            setError(result.data.message || result.data.body || '알 수 없는 오류가 발생했습니다.');
        } catch (err) {
            console.error('에러 상세:', err);
            
            if (axios.isAxiosError(err) && err.response) {
                const data = err.response.data;
                console.log('에러 응답 데이터:', data);

                if (data.errors) {
                    const errors: string[] = [];
                    Object.values(data.errors).forEach((error: any) => {
                        if (typeof error === 'string') errors.push(error);
                    });
                    setError(errors.join('\n'));
                } else {
                    setError(data.message || '등록에 실패했습니다. 다시 시도해주세요.');
                }
            } else {
                setError('등록에 실패했습니다. 다시 시도해주세요.');
            }
            
            setSuccess(null);
        }
    };

    return (
        <div>
            <Header />
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: 'calc(100vh - 80px)' 
            }}>
                <KidsSignupComponent 
                    errormsg={error}
                    success={success}
                    onClickSubmit={handleSubmit}
                />
            </div>
            <Footer/>
        </div>
    );
};

export default SignupKidsPage;
