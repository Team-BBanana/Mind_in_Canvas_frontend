import './App.css';
import CanvasPage from "@/pages/Canvas/CanvasPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/Login/LoginPage.tsx";
import SignupPage from "@/pages/Signup/SignupPage.tsx";
import MainPage from "@/pages/Main/MainPage.tsx";

function App() {
    return (
            <BrowserRouter>
                <div >
                    <Routes>
                        <Route path="/" element={<MainPage/>} />
                        <Route path="/canvas" element={<CanvasPage/>} />
                        <Route path="/login" element={<LoginPage/>} />
                        <Route path="/signup" element={<SignupPage/>} />
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;
