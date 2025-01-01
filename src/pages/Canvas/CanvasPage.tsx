import { useEffect, useRef, useState, useCallback } from "react";
import CanvasSection from "./components/CanvasSection";
import style from "./CanvasPage.module.css";
import debounce from 'lodash/debounce';

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

  const connectWebSocket = useCallback(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
      
      ws.onopen = () => {
        console.log('WebSocket 연결 성공');
        setIsConnected(true);
        try {
          ws.send(JSON.stringify({ 'canvas_id': '임시 canvas_id' }));
        } catch (error) {
          console.error('메시지 전송 실패:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket 에러:', error);
        console.log('WebSocket URL:', import.meta.env.VITE_WEBSOCKET_URL);
        setIsConnected(false);
      };

      ws.onclose = (event) => {
        console.log('WebSocket 연결 종료. 코드:', event.code, '사유:', event.reason);
        setIsConnected(false);
        socketRef.current = null;
        
        if (event.code !== 1000) {
          console.log('재연결 시도 중...');
          reconnectTimeoutRef.current = window.setTimeout(() => {
            connectWebSocket();
          }, 3000);
        }
      };

      socketRef.current = ws;
    } catch (error) {
      console.error('WebSocket 초기화 실패:', error);
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      socketRef.current?.close(1000);
    };
  }, [connectWebSocket]);

  const sendCanvasImage = useCallback((type: 'CANVAS_UPDATE' | 'CANVAS_SAVE') => {
    if (!canvasRef.current || socketRef.current?.readyState !== WebSocket.OPEN) return;
    
    const message: WebSocketMessage = {
      canvas_id: canvasId,
      image_url: canvasRef.current.toDataURL()
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
