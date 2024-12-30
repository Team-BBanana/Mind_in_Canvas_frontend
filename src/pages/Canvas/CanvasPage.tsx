import CanvasSection from "./components/CanvasSection";
import style from "./CanvasPage.module.css";

const CanvasPage = () => {
  
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

  return (
    <div className={style.canvasContainer}>
      <CanvasSection className={style.canvasSection} onUpload={uploadCanvasImage} />
    </div>
  );
};

export default CanvasPage;
