import './App.css';
import CanvasPage from "@/pages/Canvas/CanvasPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <div style={{ top: '-6px', left: '-6px', position: 'relative' }}>
                    <Routes>
                        <Route path="/canvas" element={<CanvasPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
