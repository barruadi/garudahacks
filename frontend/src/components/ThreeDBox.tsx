import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Model from './modelLoader';

const ThreeDBox = ({ modelPath }: { modelPath: string }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Canvas camera={{ position: [4, 4, 8], fov: 10 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 10, 10]} intensity={1} />
        <Suspense fallback={null}>
          <Model path={modelPath} />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
};

export default ThreeDBox;