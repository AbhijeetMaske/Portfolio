
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Float, Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const ConnectionLines = ({ nodes }: { nodes: any[] }) => {
  const lineRef = useRef<THREE.LineSegments>(null!);
  
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (new THREE.Vector3(...nodes[i].position).distanceTo(new THREE.Vector3(...nodes[j].position)) < 8) {
          points.push(new THREE.Vector3(...nodes[i].position));
          points.push(new THREE.Vector3(...nodes[j].position));
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes]);

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} />
    </lineSegments>
  );
};

const AbstractSystem = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const nodes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 1.5) * 15
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.3 + Math.random() * 1.2,
      speed: 0.1 + Math.random() * 0.4
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.03;
    groupRef.current.position.y = Math.sin(time * 0.2) * 0.4;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <ConnectionLines nodes={nodes} />
      {nodes.map((node, i) => (
        <Float
          key={i}
          speed={node.speed}
          rotationIntensity={1}
          floatIntensity={1}
          position={node.position}
        >
          <mesh rotation={node.rotation} scale={node.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshPhysicalMaterial
              color="#3b82f6"
              metalness={0.9}
              roughness={0.1}
              transmission={0.4}
              thickness={1}
              transparent
              opacity={0.6}
            />
          </mesh>
          
          {/* Wireframe overlay for technical feel */}
          <mesh rotation={node.rotation} scale={node.scale * 1.05}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.1} />
          </mesh>
        </Float>
      ))}

      {/* Central "Core" element */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh scale={2.5}>
          <octahedronGeometry />
          <meshPhysicalMaterial
            color="#6366f1"
            emissive="#4338ca"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>
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

const SiteThreeScene: React.FC<ThreeBackgroundProps> = ({ scrollY, theme }) => {
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
        
        <AbstractSystem />
        <CameraRig scrollY={scrollY} />
        <MouseLight />
        
        <fog attach="fog" args={[fogColor, 20, 50]} />
      </Canvas>
    </div>
  );
};

export default SiteThreeScene;
