import SingupComponent from "@/pages/Signup/component/SingupComponent.tsx";

interface FormData {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
}


const SignupPage = () => {

    return (
        <div>
            <SingupComponent />
        </div>
    )

}

export default SignupPage;