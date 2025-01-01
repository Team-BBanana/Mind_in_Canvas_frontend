import React, { useState } from "react";
import style from "./ReportComponent.module.css";
import Button from "@/components/recycleComponent/Button/Button";

interface PinModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PinModalComponent: React.FC<PinModalProps> = ({ isOpen, onClose }) => {
    
    const [pin, setPin] = useState<string>('');

    const handlePinSubmit = () => {
        if (pin === '123456') {
            onClose(); // 핀 번호가 맞으면 모달 닫기
        } else {
            alert('잘못된 핀 번호입니다.'); // 핀 번호 오류 처리
        }
    };

    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

    return (
        <div className={style.modal} onClick={handleBackgroundClick}>
            <div className={style.modalContent}>
                <h2>마음읽기 PIN 입력</h2>
                <div className={style.pinContainer}>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={pin}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            if (value.length <= 6) {
                                setPin(value);
                            }
                        }}
                        className={style.hiddenInput}
                        autoFocus
                    />
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className={`${style.pinDot} ${pin[index] ? style.pinDotFilled : ''}`}
                        />
                    ))}
                </div>
                <Button onClick={handlePinSubmit} type="submit">제출</Button>
            </div>
        </div>
    );
};

export default PinModalComponent;
