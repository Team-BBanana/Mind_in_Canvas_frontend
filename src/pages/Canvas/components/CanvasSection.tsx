import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai";


import canvasInstanceAtom from "./stateCanvasInstance";
import BannerSection from "@/pages/Canvas/components/BannerSection.tsx";

const CanvasSection = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useAtom(canvasInstanceAtom);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasContainerRef.current || !canvasRef.current) return;

    // const canvasContainer = canvasContainerRef.current;
    // 캔버스 생성
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      width: window.outerWidth, // 화면 전체 너비
      height: window.outerHeight, // 화면 전체 높이
      backgroundColor: "white"
    });

    setCanvas(newCanvas);

    // 초기 설정
    newCanvas.freeDrawingBrush.width = 10;
    newCanvas.isDrawingMode = true;
    newCanvas.renderAll(); // 변경사항 즉시 반영

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

    // 화면 크기 변경 시 동적으로 캔버스 크기 조정
    const handleResize = () => {
      newCanvas.setWidth(window.innerWidth);
      newCanvas.setHeight(window.innerHeight);
      newCanvas.renderAll(); // 크기 변경 후 다시 렌더링
    };

    window.addEventListener("resize", handleResize);

    // 윈도우 리사이즈 이벤트 감지
    // const handleResize = () => {
    //   newCanvas.setDimensions({
    //     width: canvasContainer.offsetWidth,
    //     height: canvasContainer.offsetHeight
    //   });
    // };
    // window.addEventListener("resize", handleResize);

    // 처음 접속했을 때 캔버스에 그리기 가능하도록 설정
    newCanvas.freeDrawingBrush.width = 10;
    newCanvas.isDrawingMode = true;

    // 언마운트 시 캔버스 정리, 이벤트 제거
    return () => {
      newCanvas.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // delete 키를 이용해서 선택된 객체 삭제
    const handleDelete = ({ key, code }: { key: string; code: string }) => {
      if (!canvas) return;
      if (!(code === "Delete" || key === "Delete" || code === "Backspace" || key === "Backspace")) return;
      const activeObjects = canvas!.getActiveObjects();
      if (activeObjects && activeObjects.length > 0) {
        // 선택된 모든 객체 삭제
        activeObjects.forEach((obj) => {
          canvas!.remove(obj);
        });
        canvas!.discardActiveObject(); // 선택 해제
      }
    };


    return () => {
      window.removeEventListener("keyup", handleDelete);
    };
  }, [canvas]);

  return (
      <div ref={canvasContainerRef} >

        <BannerSection/>
        <canvas ref={canvasRef}/>
        {/*{isEditPanelVisible && <StickyNoteEditPanel />}*/}
      </div>
  );
};

export default CanvasSection;
