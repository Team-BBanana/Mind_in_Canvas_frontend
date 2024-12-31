import SignupComponent from "@/pages/Signup/component/SignupComponent";
import {useState} from "react";
import axios from "axios";
import API from "@/api";
import Header from "@/components/recycleComponent/Header/Header";
import Footer from "@/components/recycleComponent/Footer/Footer"
import { useNavigate } from "react-router-dom";

interface FormData {
    name: string;
    email: string;
    password: string;
    role: string;
    socialProvider: string;
    phoneNumber: string;
    pin: string;
}


const SignupPage = () => {

    const [error, setError] = useState<string| null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();


    const handleSubmit = async (formData : FormData) => {
        console.log(formData);
        try {
            const result = await API.userApi.signupUser({
                name: formData.name,
                email: formData.email,
                password: formData.password, 
                pin: formData.pin,
                role : "ROLE_USER",
                socialProvider: "GOOGLE",
                phoneNumber: "010-5096-6584"
            });
            if ( result.status == 201){
                setSuccess('회원가입이 완료되었습니다!');
                setError(null);
                navigate('/signup/kids');
            }
            setError(result.data.body);

        } catch (err) {
            console.log(err)
            if (axios.isAxiosError(err) && err.response) {
                const data = err.response.data.errors;
                const errors: string[] = [];

                if (data.name) {
                    errors.push(data.name);
                }
                if (data.email) {
                    errors.push(data.email);
                }
                if (data.password) {
                    errors.push(data.password);
                }
                if (data.pin) {
                    errors.push(data.pin);
                }


                setError(errors.join('\n'));
            } else {
                setError('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
            setSuccess(null);
        }
    };

    return (
        <div>
            <Header/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 80px)' }}>
                <SignupComponent errormsg = {error} success = {success} onClickSubmit={handleSubmit} />
            </div>
            <Footer/>
        </div>
    )

}

export default SignupPage;