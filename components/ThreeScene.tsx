
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Rocket = () => {
  const rocketRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth Y-axis bobbing with a secondary subtle wave logic
    rocketRef.current.position.y = -2 + Math.sin(time * 0.7) * 0.8 + Math.cos(time * 1.2) * 0.2;
    
    // Continuous rotation on Y-axis
    rocketRef.current.rotation.y = time * 0.4;
    
    // Subtle tilt/swagger to make it feel less static
    rocketRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    rocketRef.current.rotation.z = Math.cos(time * 0.5) * 0.1;
  });

  return (
    <group ref={rocketRef} position={[0, -3, 10]} scale={1.6}>
      {/* Nose Cone */}
      <mesh position={[0, 4, 0]}>
        <coneGeometry args={[1, 2, 32]} />
        <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Body */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1, 1, 3, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.1} metalness={0.5} />
      </mesh>

      {/* Window / Porthole */}
      <mesh position={[0, 2.2, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
      </mesh>
      
      {/* Fins */}
      {[0, Math.PI * (2/3), Math.PI * (4/3)].map((rotation, i) => (
        <group key={i} rotation={[0, rotation, 0]}>
          <mesh position={[1.1, 0, 0]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[0.1, 2, 1]} />
            <meshStandardMaterial color="#ef4444" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Engine */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.7, 0.9, 0.6, 32]} />
        <meshStandardMaterial color="#334155" metalness={1} roughness={0.2} />
      </mesh>

      {/* Internal Light for the rocket / Engine Glow */}
      <pointLight position={[0, -1.5, 0]} intensity={5} color="#f59e0b" distance={8} />
    </group>
  );
};

const CameraRig = ({ scrollY }: { scrollY: number }) => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    // Smoothly update camera position based on scroll
    const targetZ = 30 - scrollY * 0.01;
    const targetY = -scrollY * 0.005;
    
    // Subtle mouse parallax
    const mouseX = mouse.x * 2;
    const mouseY = mouse.y * 2;
    
    camera.position.lerp(vec.set(mouseX, targetY + mouseY, targetZ), 0.05);
    camera.lookAt(0, targetY - 2, targetZ - 10);
  });

  return null;
};

const MouseLight = () => {
  const lightRef = useRef<THREE.PointLight>(null!);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 5);
  });

  return <pointLight ref={lightRef} distance={30} intensity={3} color="#3b82f6" />;
};

interface ThreeBackgroundProps {
  scrollY: number;
  theme: 'light' | 'dark';
}

const ThreeScene: React.FC<ThreeBackgroundProps> = ({ scrollY, theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#020617' : '#f8fafc';
  const fogColor = isDark ? '#020617' : '#f8fafc';
  const particleColor = isDark ? '#3b82f6' : '#2563eb';

  return (
    <div className={`fixed inset-0 -z-10 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={50} />
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={isDark ? 0.4 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={isDark ? 1 : 0.5} />
        
        {isDark && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
        {!isDark && <Stars radius={100} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />}
        
        <Rocket />
        <CameraRig scrollY={scrollY} />
        <MouseLight />
        
        <fog attach="fog" args={[fogColor, 20, 50]} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
