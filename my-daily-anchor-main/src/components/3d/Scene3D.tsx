import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { FloatingCube } from './FloatingCube';

export function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <FloatingCube position={[-2, 1, 0]} color="#8b5cf6" scale={0.8} />
        </Float>
        
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
          <FloatingCube position={[2, -1, -1]} color="#06b6d4" scale={1.2} />
        </Float>
        
        <Float speed={0.8} rotationIntensity={0.8} floatIntensity={0.3}>
          <FloatingCube position={[0, 2, -2]} color="#ec4899" scale={0.6} />
        </Float>
        
        <Float speed={1.8} rotationIntensity={0.2} floatIntensity={1.2}>
          <FloatingCube position={[-1.5, -2, 1]} color="#f59e0b" scale={0.9} />
        </Float>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}