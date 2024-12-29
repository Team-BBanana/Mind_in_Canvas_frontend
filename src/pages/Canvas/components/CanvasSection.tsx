import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";

import canvasInstanceAtom from "./stateCanvasInstance";
import BannerSection from "@/pages/Canvas/components/BannerSection.tsx";

interface CanvasSectionProps {
  onUpload: (dataURL: string) => void;
}

const CanvasSection: React.FC<CanvasSectionProps> = ({ onUpload }) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useAtom(canvasInstanceAtom);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // 휠을 이용해서 줌인/줌아웃
    // newCanvas.on("mouse:wheel", (opt) => {
    //   const delta = opt.e.deltaY;
    //   let zoom = newCanvas.getZoom();
    //   zoom *= 0.999 ** delta;
    //   if (zoom > 20) zoom = 20;
    //   if (zoom < 0.01) zoom = 0.01;
    //   newCanvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    //   opt.e.preventDefault();
    //   opt.e.stopPropagation();
    // });

    const handleResize = () => {
      newCanvas.setWidth(window.innerWidth);
      newCanvas.setHeight(window.innerHeight);
      newCanvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

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

  return (
    <div ref={canvasContainerRef}>
      <BannerSection onSave={saveCanvasAsImage} />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CanvasSection;
