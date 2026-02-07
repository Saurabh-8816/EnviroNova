import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox, Cylinder, Text } from '@react-three/drei';
import * as THREE from 'three';
import './WaterTreatment3DThree.css';

// Water Particle Component
const WaterParticle: React.FC<{
  path: THREE.Vector3[];
  color: string;
  speed: number;
  delay: number;
}> = ({ path, color, speed, delay }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const progressRef = useRef(delay);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    progressRef.current += delta * speed;
    
    const t = (progressRef.current % 1);
    const index = Math.floor(t * (path.length - 1));
    const nextIndex = Math.min(index + 1, path.length - 1);
    const localT = (t * (path.length - 1)) % 1;
    
    meshRef.current.position.lerpVectors(path[index], path[nextIndex], localT);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
};

// Pipe Component
const Pipe: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
}> = ({ start, end, color = '#71717A' }) => {
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  
  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());

  return (
    <mesh position={midPoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.12, 0.12, length, 16]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
    </mesh>
  );
};

// Inlet Tank Component
const InletTank: React.FC = () => {
  return (
    <group position={[-6, 0, 0]}>
      {/* Tank body */}
      <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.05} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#E8EDF2" metalness={0.3} roughness={0.5} />
      </RoundedBox>
      {/* Polluted water inside */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.3, 0.8, 1.3]} />
        <meshStandardMaterial color="#8B7355" transparent opacity={0.8} />
      </mesh>
      {/* Label */}
      <Text position={[0, -0.3, 0.8]} fontSize={0.3} color="#CBD5E1" anchorX="center">
        Inlet
      </Text>
    </group>
  );
};

// Screening Unit Component
const ScreeningUnit: React.FC = () => {
  const screenRef = useRef<THREE.Group>(null);
  
  return (
    <group position={[-3, 0, 0]}>
      {/* Main body */}
      <RoundedBox args={[2, 2.2, 1.8]} radius={0.05} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#22C55E" metalness={0.2} roughness={0.4} />
      </RoundedBox>
      {/* Screen bars */}
      <group ref={screenRef} position={[0, 1, 0.5]}>
        {[-0.5, -0.25, 0, 0.25, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]}>
            <boxGeometry args={[0.05, 1.5, 0.1]} />
            <meshStandardMaterial color="#166534" />
          </mesh>
        ))}
      </group>
      {/* Water inside */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.7, 1.2, 1.5]} />
        <meshStandardMaterial color="#7A9E7E" transparent opacity={0.7} />
      </mesh>
      {/* Label */}
      <Text position={[0, -0.3, 1]} fontSize={0.3} color="#CBD5E1" anchorX="center">
        Screening
      </Text>
    </group>
  );
};

// Sedimentation Tank Component
const SedimentationTank: React.FC = () => {
  const armRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (armRef.current) {
      armRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group position={[0.5, 0, 0]}>
      {/* Cylinder tank */}
      <Cylinder args={[1.2, 1.2, 2, 32]} position={[0, 1, 0]}>
        <meshStandardMaterial color="#B8C5D0" metalness={0.4} roughness={0.3} transparent opacity={0.9} />
      </Cylinder>
      {/* Water surface */}
      <Cylinder args={[1.1, 1.1, 0.1, 32]} position={[0, 1.8, 0]}>
        <meshStandardMaterial color="#5A7E5E" transparent opacity={0.8} />
      </Cylinder>
      {/* Center column */}
      <Cylinder args={[0.1, 0.1, 2.5, 16]} position={[0, 1.25, 0]}>
        <meshStandardMaterial color="#52525B" metalness={0.6} roughness={0.3} />
      </Cylinder>
      {/* Rotating arm */}
      <group ref={armRef} position={[0, 1.5, 0]}>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial color="#52525B" metalness={0.6} />
        </mesh>
        {/* Scraper */}
        <mesh position={[0.9, -0.3, 0]}>
          <boxGeometry args={[0.3, 0.6, 0.05]} />
          <meshStandardMaterial color="#71717A" />
        </mesh>
      </group>
      {/* Label */}
      <Text position={[0, -0.3, 1.3]} fontSize={0.3} color="#CBD5E1" anchorX="center">
        Sedimentation
      </Text>
    </group>
  );
};

// Filtration Unit Component
const FiltrationUnit: React.FC = () => {
  const bubblesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((bubble, i) => {
        const y = ((state.clock.elapsedTime * 0.5 + i * 0.3) % 1.5);
        bubble.position.y = y;
        (bubble as THREE.Mesh).scale.setScalar(0.8 + Math.sin(state.clock.elapsedTime + i) * 0.2);
      });
    }
  });

  return (
    <group position={[4, 0, 0]}>
      {/* Main body */}
      <RoundedBox args={[2, 2.2, 1.8]} radius={0.05} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#3B82F6" metalness={0.3} roughness={0.4} />
      </RoundedBox>
      {/* Water inside */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[1.7, 1.4, 1.5]} />
        <meshStandardMaterial color="#5DB3D1" transparent opacity={0.7} />
      </mesh>
      {/* Aeration bubbles */}
      <group ref={bubblesRef} position={[0, 0.5, 0]}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[(i % 4 - 1.5) * 0.4, 0, (Math.floor(i / 4) - 0.5) * 0.5]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color="#93C5FD" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
      {/* Label */}
      <Text position={[0, -0.3, 1]} fontSize={0.3} color="#CBD5E1" anchorX="center">
        Filtration
      </Text>
    </group>
  );
};

// Clean Water Outlet Component
const CleanWaterOutlet: React.FC = () => {
  const waterRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (waterRef.current && waterRef.current.material) {
      const material = waterRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.85 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={[7.5, 0, 0]}>
      {/* Tank body */}
      <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.05} position={[0, 0.75, 0]}>
        <meshStandardMaterial color="#2563EB" metalness={0.3} roughness={0.4} />
      </RoundedBox>
      {/* Clean water inside */}
      <mesh ref={waterRef} position={[0, 0.65, 0]}>
        <boxGeometry args={[1.3, 0.9, 1.3]} />
        <meshStandardMaterial color="#00D4FF" transparent opacity={0.9} emissive="#00D4FF" emissiveIntensity={0.2} />
      </mesh>
      {/* Sparkle points */}
      <pointLight position={[0, 1, 0]} color="#00D4FF" intensity={0.5} distance={2} />
      {/* Label */}
      <Text position={[0, -0.3, 0.8]} fontSize={0.3} color="#CBD5E1" anchorX="center">
        Clean Water
      </Text>
    </group>
  );
};

// Platform Component
const Platform: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, -0.1, 0]}>
      <planeGeometry args={[18, 8]} />
      <meshStandardMaterial color="#334155" transparent opacity={0.5} />
    </mesh>
  );
};

// Water Flow Particles
const WaterFlow: React.FC = () => {
  const paths = useMemo(() => ({
    path1: [
      new THREE.Vector3(-5.2, 0.75, 0),
      new THREE.Vector3(-4.5, 0.75, 0),
      new THREE.Vector3(-4, 0.9, 0),
    ],
    path2: [
      new THREE.Vector3(-2, 1, 0),
      new THREE.Vector3(-1, 1.1, 0),
      new THREE.Vector3(-0.5, 1.2, 0),
    ],
    path3: [
      new THREE.Vector3(1.5, 1.2, 0),
      new THREE.Vector3(2.5, 1.1, 0),
      new THREE.Vector3(3, 1, 0),
    ],
    path4: [
      new THREE.Vector3(5, 1, 0),
      new THREE.Vector3(6, 0.9, 0),
      new THREE.Vector3(6.7, 0.75, 0),
    ],
  }), []);

  return (
    <group>
      {/* Polluted water particles */}
      <WaterParticle path={paths.path1} color="#8B7355" speed={0.3} delay={0} />
      <WaterParticle path={paths.path1} color="#6B5344" speed={0.3} delay={0.33} />
      <WaterParticle path={paths.path1} color="#8B7355" speed={0.3} delay={0.66} />
      
      {/* Primary treatment particles */}
      <WaterParticle path={paths.path2} color="#7A9E7E" speed={0.3} delay={0.1} />
      <WaterParticle path={paths.path2} color="#5A7E5E" speed={0.3} delay={0.4} />
      <WaterParticle path={paths.path2} color="#7A9E7E" speed={0.3} delay={0.7} />
      
      {/* Secondary treatment particles */}
      <WaterParticle path={paths.path3} color="#5DB3D1" speed={0.3} delay={0.2} />
      <WaterParticle path={paths.path3} color="#3D93B1" speed={0.3} delay={0.5} />
      <WaterParticle path={paths.path3} color="#5DB3D1" speed={0.3} delay={0.8} />
      
      {/* Clean water particles */}
      <WaterParticle path={paths.path4} color="#00D4FF" speed={0.3} delay={0.15} />
      <WaterParticle path={paths.path4} color="#0099CC" speed={0.3} delay={0.45} />
      <WaterParticle path={paths.path4} color="#00D4FF" speed={0.3} delay={0.75} />
    </group>
  );
};

// Main Scene Component
const Scene: React.FC = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />
      <pointLight position={[0, 5, 0]} intensity={0.5} />
      
      {/* Platform */}
      <Platform />
      
      {/* Treatment Units */}
      <InletTank />
      <ScreeningUnit />
      <SedimentationTank />
      <FiltrationUnit />
      <CleanWaterOutlet />
      
      {/* Connecting Pipes */}
      <Pipe start={[-5.2, 0.75, 0]} end={[-4, 1, 0]} />
      <Pipe start={[-2, 1, 0]} end={[-0.5, 1.2, 0]} />
      <Pipe start={[1.5, 1.2, 0]} end={[3, 1, 0]} />
      <Pipe start={[5, 1, 0]} end={[6.7, 0.75, 0]} />
      
      {/* Water Flow Animation */}
      <WaterFlow />
      
      {/* Controls */}
      <OrbitControls 
        enablePan={false}
        enableZoom={true}
        minDistance={8}
        maxDistance={20}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Main Component
const WaterTreatment3DThree: React.FC = () => {
  return (
    <div className="water-treatment-three-container">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#0f172a']} />
        <fog attach="fog" args={['#0f172a', 15, 30]} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default WaterTreatment3DThree;
