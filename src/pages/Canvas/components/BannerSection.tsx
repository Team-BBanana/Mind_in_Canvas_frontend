import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "@/components/recycleComponent/Button/Button.tsx";
import Toolbar from "@/pages/Canvas/components/Toolbar.tsx";

interface BannerSectionProps {
    onSave: () => void;
}

const BannerSection: React.FC<BannerSectionProps> = ({ onSave }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/'); // Navigate to the root path
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
            }}
        >
            <Button type="button" style={{ marginLeft: "10px" }} onClick={handleBack}>
                뒤로
            </Button>

            <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <Toolbar />
            </div>

            <Button type="button" style={{ marginRight: "10px" }} onClick={onSave}>
                저장
            </Button>
        </div>
    );
};

export default BannerSection;