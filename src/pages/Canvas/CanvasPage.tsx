import { useEffect, useRef, useState, useCallback } from "react";
import CanvasSection from "./components/CanvasSection";
import style from "./CanvasPage.module.css";
import API from "@/api";
import debounce from 'lodash/debounce';

const aiServerUrl = "ws://127.0.0.1:8081/drawing/send";

type WebSocketMessage = {
  canvas_id?: string;
  image_url?: string;
};

const CanvasPage = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasId, setCanvasId] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const reconnectTimeoutRef = useRef<number>();

  useEffect(() => {
    const createCanvasAndConnectWebSocket = async () => {
      try {
        const response = await API.canvasApi.createCanvas({ title: "임시 제목" });
        console.log('Canvas created:', response);
        
        // Assuming the response contains a canvasId
        const newCanvasId = response.data.canvasId;
        setCanvasId(newCanvasId);

        // Connect WebSocket after successful canvas creation
        connectWebSocket(newCanvasId);
        
      } catch (error) {
        console.error('Error creating canvas:', error);
      }
    };

    createCanvasAndConnectWebSocket();
  }, []);

  const connectWebSocket = useCallback((canvasId: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket(aiServerUrl);
      
      ws.onopen = () => {
        console.log('WebSocket 연결 성공');
        setIsConnected(true);
        try {
          ws.send(JSON.stringify({ 'canvas_id': 'canvasId' }));
          console.log('WebSocket 메시지 전송:', JSON.stringify({ 'canvas_id': 'canvasId' }));
        } catch (error) {
          console.error('메시지 전송 실패:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket 에러:', error);
        console.log('WebSocket URL:', aiServerUrl);
        setIsConnected(false);
      };

      ws.onclose = (event) => {
        console.log('WebSocket 연결 종료. 코드:', event.code, '사유:', event.reason);
        setIsConnected(false);
        socketRef.current = null;
        
        if (event.code !== 1000) {
          console.log('재연결 시도 중...');
          reconnectTimeoutRef.current = window.setTimeout(() => {
            connectWebSocket(canvasId);
          }, 3000);
        }
      };

      socketRef.current = ws;
    } catch (error) {
      console.error('WebSocket 초기화 실패:', error);
      setIsConnected(false);
    }
  }, []);

  const sendCanvasImage = useCallback((type: 'CANVAS_UPDATE' | 'CANVAS_SAVE') => {
    if (!canvasRef.current || socketRef.current?.readyState !== WebSocket.OPEN) return;
    
    const message: WebSocketMessage = {
      canvas_id: canvasId,
      image_url: canvasRef.current.toDataURL('image/png', 1.0)
    };
    
    socketRef.current.send(JSON.stringify(message));
  }, [canvasId]);

  const handleDraw = useCallback(() => {
    sendCanvasImage('CANVAS_UPDATE');
  }, [sendCanvasImage]);

  const debouncedSaveCanvas = useCallback(
    debounce(() => sendCanvasImage('CANVAS_SAVE'), 10000),
    [sendCanvasImage]
  );

  useEffect(() => {
    return () => {
      debouncedSaveCanvas.cancel();
    };
  }, [debouncedSaveCanvas]);

  return (
    <div className={style.canvasContainer}>
      <CanvasSection 
        className={style.canvasSection} 
        onUpload={handleDraw}
        canvasRef={canvasRef}
        onChange={debouncedSaveCanvas}
      />
    </div>
  );
};

export default CanvasPage;
