import React, { useEffect, useRef, useState } from "react";
import CanvasSection from "./components/CanvasSection";
import style from "./CanvasPage.module.css";

// Debounce 함수
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const CanvasPage = () => {
  const [lastDrawTime, setLastDrawTime] = useState<number>(Date.now());
  const uploadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const uploadCanvasImage = (dataURL: string) => {
    const blob = dataURLToBlob(dataURL);
    const formData = new FormData();
    formData.append('file', blob, 'canvas-image.png');

    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully:', data.url);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
  };

  // Helper function to convert data URL to Blob
  const dataURLToBlob = (dataURL: string) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // 캔버스에 그림이 그려질 때 호출되는 함수
  const handleDraw = debounce((dataURL: string) => {
    setLastDrawTime(Date.now());
    uploadCanvasImage(dataURL);
  }, 600); // 300ms 후에 호출

  // 상태 감지 및 AI 서버로 이미지 전송
  useEffect(() => {
    const checkIdleTime = () => {
      const currentTime = Date.now();
      if (currentTime - lastDrawTime >= 5000) { // 5초 이상 경과
        // 현재 캔버스의 이미지를 AI 서버로 전송
        const canvasDataURL = ""; // 현재 캔버스의 dataURL을 가져오는 로직 필요
        sendToAiServer(canvasDataURL);
      }
    };

    const intervalId = setInterval(checkIdleTime, 1000); // 1초마다 체크

    return () => {
      clearInterval(intervalId);
      if (uploadTimeoutRef.current) {
        clearTimeout(uploadTimeoutRef.current);
      }
    };
  }, [lastDrawTime]);

  const sendToAiServer = (dataURL: string) => {
    // AI 서버로 요청 보내기
    fetch('http://localhost:3001/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: dataURL }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('AI server response:', data);
      })
      .catch(error => {
        console.error('Error sending to AI server:', error);
      });
  };

  return (
    <div className={style.canvasContainer}>
      <CanvasSection className={style.canvasSection} onUpload={handleDraw} />
    </div>
  );
};

export default CanvasPage;
