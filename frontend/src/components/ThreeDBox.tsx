import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Model from './modelLoader';

const ThreeDBox = ({ modelPath }: { modelPath: string }) => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [2, 2, 5], fov: 60 }}>
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