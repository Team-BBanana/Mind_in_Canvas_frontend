import './App.css';
import CanvasPage from "@/pages/Canvas/CanvasPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
function App() {

    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route path="/canvas" element={<CanvasPage />} />
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
