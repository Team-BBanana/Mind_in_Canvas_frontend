import React from "react";
import { useNavigate } from "react-router-dom";

const MainComponent: React.FC = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    return (
        <div>
            <h1>메인 페이지</h1>
            <div>
                {/* 버튼 추가 */}
                <button onClick={() => navigate("/login")}>로그인</button>
                <button onClick={() => navigate("/canvas")}>캔버스</button>
            </div>
        </div>
    );
};

export default MainComponent;
