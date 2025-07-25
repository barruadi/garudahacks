import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface CameraPageProps {
  onBack: () => void;
  onPhotoCaptured: (imageFile: File) => void;
}

const CameraPage: React.FC<CameraPageProps> = ({ onBack, onPhotoCaptured }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.scale(-1, 1);
        context.drawImage(video, -canvas.width, 0);
        context.scale(-1, 1); 
      }

      const imageData = canvas.toDataURL("image/jpeg", 0.8);
      setCapturedImage(imageData);
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleDone = () => {
    if (capturedImage) {
      // Convert data URL to File object for database storage
      const imageFile = dataURLtoFile(capturedImage, `photo_${Date.now()}.jpg`);
      onPhotoCaptured(imageFile);
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onBack();
  };

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        {!capturedImage ? (
          <div className="relative w-full h-full pb-28 pt-20">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              style={{
                minHeight: "100%",
                transform: "scaleX(1)",
              }}
            />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
              <Button
                onClick={capturePhoto}
                className="rounded-full w-16 h-16 bg-white border-4 border-amber-800 hover:bg-amber-50 shadow-lg"
              >
                <Camera className="h-6 w-6 text-amber-800" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full bg-transparent flex items-center justify-center pb-28 pt-20">
            <img
              src={capturedImage}
              alt="Captured"
              className="max-w-full max-h-full object-contain"
              style={{ transform: "scaleX(1)" }} // Mirror the captured image too
            />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
              <Button
                variant="outline"
                onClick={() => setCapturedImage(null)}
                className="bg-white text-black hover:bg-gray-100"
              >
                Retake
              </Button>
              <Button
                className="bg-amber-800 text-black hover:bg-amber-700"
                onClick={handleDone}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CameraPage;
