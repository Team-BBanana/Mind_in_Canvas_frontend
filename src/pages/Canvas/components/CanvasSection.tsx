import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";

import canvasInstanceAtom from "./stateCanvasInstance";
import BannerSection from "@/pages/Canvas/components/BannerSection.tsx";
import ColorPanel from "@/pages/Canvas/components/ColorPanel.tsx";
import style from "../CanvasPage.module.css";

interface CanvasSectionProps {
  onUpload: (dataURL: string) => void;
  className?: string;
}

const CanvasSection: React.FC<CanvasSectionProps> = ({ onUpload, className }) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useAtom(canvasInstanceAtom);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 }); // 팔레트의 현재 위치 상태 추가

  useEffect(() => {
    if (!canvasContainerRef.current || !canvasRef.current) return;

    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: window.outerWidth,
      height: window.outerHeight,
      backgroundColor: "transparent"
    });

    setCanvas(newCanvas);

    newCanvas.freeDrawingBrush.width = 10;
    newCanvas.isDrawingMode = true;
    newCanvas.renderAll();

    const handleResize = () => {
      newCanvas.setWidth(window.innerWidth);
      newCanvas.setHeight(window.innerHeight);
      newCanvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

    // 팔레트의 초기 위치 설정 (좌측 중앙)
    setPanelPosition({ x: 30, y: 150 });

    return () => {
      newCanvas.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const saveCanvasAsImage = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1.0
    });
    onUpload(dataURL);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const colorPanel = document.getElementById("color-panel");
    if (colorPanel) {
      const rect = colorPanel.getBoundingClientRect();
      setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - offset.x; // 클릭한 위치를 기준으로 X 좌표 계산
      const newY = e.clientY - offset.y; // 클릭한 위치를 기준으로 Y 좌표 계산
      setPanelPosition({ x: newX, y: newY }); // 팔레트의 위치 상태 업데이트
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={className} ref={canvasContainerRef} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <BannerSection onSave={saveCanvasAsImage} />
      <canvas ref={canvasRef} className={style.canvasContainer}/>
      <div
        id="color-panel"
        onMouseDown={handleMouseDown}
        style={{ 
          cursor: "move", 
          position: "absolute", 
          top: `${panelPosition.y}px`, // 팔레트의 Y 위치
          left: `${panelPosition.x}px`, // 팔레트의 X 위치
        }}
      >
        <ColorPanel className={style.colorPanel} />
      </div>
    </div>
  );
};

export default CanvasSection;