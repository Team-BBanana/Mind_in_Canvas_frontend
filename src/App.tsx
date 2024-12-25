import './App.css';
import CanvasPage from "@/pages/Canvas/CanvasPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import LoginPage from "@/pages/Login/LoginPage.tsx";
import SignupPage from "@/pages/Signup/SignupPage.tsx";

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <div style={{ top: '-6px', left: '-6px', position: 'relative' }}>
                    <Routes>
                        <Route path="/canvas" element={<CanvasPage />} />
                        <Route path="/login" element={<LoginPage  />} />
                        <Route path="/signup" element={<SignupPage  />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
