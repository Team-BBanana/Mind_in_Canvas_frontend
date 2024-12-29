import SingupComponent from "@/pages/Signup/component/SingupComponent.tsx";
import {useState} from "react";
import axios from "axios";
import API from "@/api";
import Header from "@/components/recycleComponent/Header/Header";
import Footer from "@/components/recycleComponent/Footer/Footer"

interface FormData {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
}


const SignupPage = () => {

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
        <div>
            <Header/>
            <SingupComponent errormsg = {error} success = {success} onClickSubmit={handleSubmit} />
            <Footer/>
        </div>
    )

}

export default SignupPage;