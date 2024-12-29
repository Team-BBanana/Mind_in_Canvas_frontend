import CanvasSection from "./components/CanvasSection";

const CanvasPage = () => {
  const uploadCanvasImage = (dataURL: string) => {
    const blob = dataURLToBlob(dataURL);

    const formData = new FormData();
    formData.append('file', blob, 'canvas-image.png');

    fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
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
    <div>
      <CanvasSection onUpload={uploadCanvasImage} />
    </div>
  );
};

export default CanvasPage;
