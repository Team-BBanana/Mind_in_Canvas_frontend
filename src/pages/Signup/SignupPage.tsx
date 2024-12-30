import SignupComponent from "@/pages/Signup/component/SignupComponent";
import {useState} from "react";
import axios from "axios";
import API from "@/api";
import Header from "@/components/recycleComponent/Header/Header";
import Footer from "@/components/recycleComponent/Footer/Footer"

interface FormData {
    name: string;
    email: string;
    password: string;
    role: string;
    socialProvider: string;
    phoneNumber: string;
}


const SignupPage = () => {

    const [error, setError] = useState<string| null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    const handleSubmit = async (formData : FormData) => {
        console.log(formData);
        try {
            const result = await API.userApi.signupUser({
                name: formData.name,
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

                if (data.name) {
                    errors.push(data.name);
                }
                if (data.email) {
                    errors.push(data.email);
                }
                if (data.password) {
                    errors.push(data.password);
                }

                setError(errors.join('\n'));
            } else {
                setError('Signup failed. Please try again.');
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