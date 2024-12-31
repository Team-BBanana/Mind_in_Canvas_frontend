// App.tsx
import './App.css';
import { Routes, Route } from "react-router-dom";
import CanvasPage from "@/pages/Canvas/CanvasPage.tsx";
import LoginPage from "@/pages/Login/LoginPage.tsx";
import SignupPage from "@/pages/Signup/SignupPage.tsx";
import MainPage from "@/pages/Main/MainPage.tsx";
import Header from './components/recycleComponent/Header/Header.tsx'; // Header import
import Footer from './components/recycleComponent/Footer/Footer.tsx'; // Footer import
import { useLocation } from 'react-router-dom'; // useLocation import
import SelectKidsPage from './pages/SelectKids/SelectKidsPage.tsx';
import DisplayPage from './pages/Display/DisplayPage.tsx';
import SignupKidsPage from './pages/Signup/SignupKidsPage.tsx';
import ReportPage from './pages/Report/ReportPage.tsx';

function App() {
    const location = useLocation(); // 현재 경로를 가져옴
    const hiddenHeaderRoutes = ['/canvas', '/display/*']; // Header를 숨길 경로 설정
    const isHeaderHidden = hiddenHeaderRoutes.some(route => 
        location.pathname === route || 
        (route.endsWith('*') && location.pathname.startsWith(route.slice(0, -1)))
    );
    return (
        <div>
            {/* 조건부 Header 렌더링 */}
            {!isHeaderHidden && <Header />}
            
            {/* Main content container */}
            {location.pathname === '/canvas' ? (
                <Routes>
                    <Route path="/canvas" element={<CanvasPage />} />
                </Routes>
            ) : (
                <div className="main-content" style={{ height: ['/login', '/signup', '/signup/kids', '/selectkids', '/report'].includes(location.pathname) ? '100vh' : 'auto' }}>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/canvas" element={<CanvasPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/signup/kids" element={<SignupKidsPage />} />
                        <Route path="/selectkids" element={<SelectKidsPage/>} />
                        <Route path="/display/:id" element={<DisplayPage />} />
                        <Route path="/report" element={<ReportPage />} />
                    </Routes>
                </div>
            )}
            <Footer />
        </div>
    ); 
}

export default App;
