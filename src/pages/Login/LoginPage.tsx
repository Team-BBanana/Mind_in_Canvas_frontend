import LoginComponent from "@/pages/Login/component/LoginComponent.tsx";
import {useState} from "react";

interface FormData {
    email: string;
    password: string;
}


const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    //에러뜨는건 사용이 안되서 뜨는거라 일단 그냥 두면됩니다. 실행되는데 문제 x formData도 마찬가지

    const handleSubmit = async (formData: FormData) => {

    };


    return (
        <div>
            <LoginComponent errormsg={error} success={success} onClickSubmit={handleSubmit}/>
        </div>
    )

}

export default LoginPage