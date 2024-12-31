import React, { useState } from "react";
import style from "./ReportComponent.module.css";
import PinModalComponent from "./PinModalComponent";

const ReportComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'robot' | 'drawing'>('robot');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

    return (
        <div className={style.container}>
            <PinModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className={isModalOpen ? style.blur : ''}>
                <div className={style.tabContainer}>
                    <div 
                        className={`${style.tab} ${activeTab === 'robot' ? style.active : ''}`}
                        onClick={() => setActiveTab('robot')}
                    >
                        로봇으로 마음읽기
                    </div>
                    <div 
                        className={`${style.tab} ${activeTab === 'drawing' ? style.active : ''}`}
                        onClick={() => setActiveTab('drawing')}
                    >
                        그림으로 마음읽기
                    </div>
                </div>

                <div className={style.reportList} style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                    {[1,2,3].map((item, index) => (
                        <div key={index} className={style.reportItem}>

                            {/* 백엔드에서 보내주는 데이터 띄우기 */}
                            
                            <div className={style.reportDate}>2024.01.{index + 1}</div>
                            <div className={style.reportTitle}>
                                {activeTab === 'robot' ? '로봇 대화 기록' : '그림 분석'} #{index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportComponent;
