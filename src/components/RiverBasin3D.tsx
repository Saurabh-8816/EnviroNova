import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import './RiverBasin3D.css';

// Mountain Component
const Mountain: React.FC<{
  position: [number, number, number];
  scale?: number;
  color?: string;
}> = ({ position, scale = 1, color = '#6B7280' }) => {
  return (
    <group position={position} scale={scale}>
      {/* Main peak */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[1.2, 3, 6]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, 2.8, 0]}>
        <coneGeometry args={[0.4, 0.8, 6]} />
        <meshStandardMaterial color="#F8FAFC" flatShading />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.2, 0]}>
        <coneGeometry args={[1.8, 0.8, 6]} />
        <meshStandardMaterial color="#78716C" flatShading />
      </mesh>
    </group>
  );
};

// Tree Component
const Tree: React.FC<{
  position: [number, number, number];
  scale?: number;
  type?: 'pine' | 'deciduous';
}> = ({ position, scale = 1, type = 'pine' }) => {
  return (
    <group position={position} scale={scale}>
      {type === 'pine' ? (
        <>
          {/* Pine tree layers */}
          <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[0.3, 0.6, 8]} />
            <meshStandardMaterial color="#166534" flatShading />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <coneGeometry args={[0.4, 0.6, 8]} />
            <meshStandardMaterial color="#15803D" flatShading />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <coneGeometry args={[0.5, 0.5, 8]} />
            <meshStandardMaterial color="#22C55E" flatShading />
          </mesh>
          {/* Trunk */}
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.2, 8]} />
            <meshStandardMaterial color="#78350F" />
          </mesh>
        </>
      ) : (
        <>
          {/* Deciduous tree */}
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.35, 8, 8]} />
            <meshStandardMaterial color="#22C55E" flatShading />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.4, 8]} />
            <meshStandardMaterial color="#78350F" />
          </mesh>
        </>
      )}
    </group>
  );
};

// River Segment with flowing water animation
const RiverSegment: React.FC<{
  points: THREE.Vector3[];
  width?: number;
}> = ({ points, width = 0.8 }) => {
  const riverRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  // Create river path curve
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  
  // Create river geometry
  const geometry = useMemo(() => {
    const tubeGeometry = new THREE.TubeGeometry(curve, 64, width / 2, 8, false);
    return tubeGeometry;
  }, [curve, width]);

  useFrame((_, delta) => {
    if (riverRef.current) {
      timeRef.current += delta * 0.3;
      const material = riverRef.current.material as THREE.MeshStandardMaterial;
      if (material.map) {
        material.map.offset.x = timeRef.current;
      }
    }
  });

  return (
    <mesh ref={riverRef} geometry={geometry}>
      <meshStandardMaterial 
        color="#0EA5E9" 
        transparent 
        opacity={0.85}
        metalness={0.3}
        roughness={0.2}
      />
    </mesh>
  );
};

// Water Particles flowing along the river
const WaterParticles: React.FC<{ path: THREE.Vector3[] }> = ({ path }) => {
  const particlesRef = useRef<THREE.Group>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(path), [path]);
  
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      offset: i / 20,
      speed: 0.03 + Math.random() * 0.02,
      size: 0.05 + Math.random() * 0.03,
    }));
  }, []);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        particle.offset = (particle.offset + delta * particle.speed) % 1;
        const point = curve.getPoint(particle.offset);
        child.position.copy(point);
        child.position.y += 0.1;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <mesh key={i}>
          <sphereGeometry args={[p.size, 8, 8]} />
          <meshStandardMaterial 
            color="#7DD3FC" 
            transparent 
            opacity={0.7}
            emissive="#0EA5E9"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Farm/Agricultural Area
const FarmArea: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Farm field base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#84CC16" />
      </mesh>
      {/* Crop rows */}
      {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0.08, 0]}>
          <boxGeometry args={[0.15, 0.15, 1.8]} />
          <meshStandardMaterial color="#65A30D" />
        </mesh>
      ))}
      {/* Farm building */}
      <RoundedBox args={[0.6, 0.4, 0.5]} radius={0.02} position={[1.2, 0.2, 0.5]}>
        <meshStandardMaterial color="#B45309" />
      </RoundedBox>
      <mesh position={[1.2, 0.5, 0.5]}>
        <coneGeometry args={[0.45, 0.3, 4]} />
        <meshStandardMaterial color="#78350F" />
      </mesh>
    </group>
  );
};

// Water Treatment Plant
const WaterTreatmentPlant: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const armRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (armRef.current) {
      armRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Platform base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[3.5, 2.5]} />
        <meshStandardMaterial color="#64748B" />
      </mesh>
      
      {/* Inlet tank */}
      <RoundedBox args={[0.6, 0.5, 0.6]} radius={0.02} position={[-1.2, 0.25, 0]}>
        <meshStandardMaterial color="#94A3B8" metalness={0.4} roughness={0.3} />
      </RoundedBox>
      
      {/* Primary clarifier (circular) */}
      <mesh position={[-0.3, 0.3, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.5, 24]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Clarifier water */}
      <mesh position={[-0.3, 0.5, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.1, 24]} />
        <meshStandardMaterial color="#38BDF8" transparent opacity={0.8} />
      </mesh>
      {/* Rotating arm */}
      <group ref={armRef} position={[-0.3, 0.55, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      </group>
      
      {/* Secondary treatment */}
      <RoundedBox args={[0.8, 0.6, 0.6]} radius={0.02} position={[0.6, 0.3, 0]}>
        <meshStandardMaterial color="#22C55E" metalness={0.2} roughness={0.5} />
      </RoundedBox>
      
      {/* Outlet */}
      <RoundedBox args={[0.5, 0.4, 0.5]} radius={0.02} position={[1.3, 0.2, 0]}>
        <meshStandardMaterial color="#3B82F6" metalness={0.3} roughness={0.4} />
      </RoundedBox>
      
      {/* Connecting pipes */}
      <mesh position={[-0.75, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#71717A" metalness={0.5} />
      </mesh>
      <mesh position={[0.15, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#71717A" metalness={0.5} />
      </mesh>
      <mesh position={[0.95, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
        <meshStandardMaterial color="#71717A" metalness={0.5} />
      </mesh>
    </group>
  );
};

// City Building
const Building: React.FC<{
  position: [number, number, number];
  height: number;
  width?: number;
  depth?: number;
  color?: string;
}> = ({ position, height, width = 0.4, depth = 0.4, color = '#64748B' }) => {
  return (
    <group position={position}>
      <RoundedBox args={[width, height, depth]} radius={0.02} position={[0, height / 2, 0]}>
        <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
      </RoundedBox>
      {/* Windows */}
      {Array.from({ length: Math.floor(height / 0.3) }).map((_, i) => (
        <mesh key={i} position={[width / 2 + 0.001, 0.2 + i * 0.3, 0]}>
          <planeGeometry args={[0.01, 0.15]} />
          <meshStandardMaterial color="#FCD34D" emissive="#FCD34D" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Urban City Area
const CityArea: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* City ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[4, 3]} />
        <meshStandardMaterial color="#78716C" />
      </mesh>
      
      {/* Roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <planeGeometry args={[0.4, 3]} />
        <meshStandardMaterial color="#44403C" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]}>
        <planeGeometry args={[4, 0.4]} />
        <meshStandardMaterial color="#44403C" />
      </mesh>
      
      {/* Buildings */}
      <Building position={[-1.2, 0, -0.8]} height={1.2} color="#64748B" />
      <Building position={[-0.6, 0, -0.8]} height={0.8} color="#78716C" />
      <Building position={[0.6, 0, -0.8]} height={1.5} color="#6B7280" />
      <Building position={[1.2, 0, -0.8]} height={1.0} color="#71717A" />
      <Building position={[-1.0, 0, 1.2]} height={0.7} color="#64748B" />
      <Building position={[0.8, 0, 1.2]} height={1.3} color="#6B7280" />
      <Building position={[1.5, 0, 1.0]} height={0.9} color="#78716C" />
      
      {/* Park/Green space in city */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.5, 0.02, 0.3]}>
        <circleGeometry args={[0.5, 16]} />
        <meshStandardMaterial color="#22C55E" />
      </mesh>
      <Tree position={[-1.5, 0, 0.3]} scale={0.6} type="deciduous" />
    </group>
  );
};

// Green Buffer Zone
const BufferZone: React.FC<{
  position: [number, number, number];
  width: number;
  depth: number;
  treeCount?: number;
}> = ({ position, width, depth, treeCount = 8 }) => {
  const trees = useMemo(() => {
    return Array.from({ length: treeCount }, () => ({
      x: (Math.random() - 0.5) * width * 0.8,
      z: (Math.random() - 0.5) * depth * 0.8,
      scale: 0.4 + Math.random() * 0.3,
      type: Math.random() > 0.5 ? 'pine' : 'deciduous' as 'pine' | 'deciduous',
    }));
  }, [width, depth, treeCount]);

  return (
    <group position={position}>
      {/* Green ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial color="#4ADE80" />
      </mesh>
      {/* Trees */}
      {trees.map((tree, i) => (
        <Tree 
          key={i} 
          position={[tree.x, 0, tree.z]} 
          scale={tree.scale} 
          type={tree.type}
        />
      ))}
    </group>
  );
};

// Forest Area
const ForestArea: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const trees = useMemo(() => {
    return Array.from({ length: 25 }, () => ({
      x: (Math.random() - 0.5) * 4,
      z: (Math.random() - 0.5) * 2.5,
      scale: 0.5 + Math.random() * 0.4,
      type: Math.random() > 0.3 ? 'pine' : 'deciduous' as 'pine' | 'deciduous',
    }));
  }, []);

  return (
    <group position={position}>
      {/* Forest ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[4.5, 3]} />
        <meshStandardMaterial color="#16A34A" />
      </mesh>
      {/* Trees */}
      {trees.map((tree, i) => (
        <Tree 
          key={i} 
          position={[tree.x, 0, tree.z]} 
          scale={tree.scale} 
          type={tree.type}
        />
      ))}
    </group>
  );
};

// Ground/Terrain
const Terrain: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[30, 15]} />
      <meshStandardMaterial color="#A8A29E" />
    </mesh>
  );
};

// Main Scene
const Scene: React.FC = () => {
  // River path from mountains to city
  const riverPath = useMemo(() => [
    new THREE.Vector3(-10, 0.1, 0),
    new THREE.Vector3(-7, 0.1, 0.5),
    new THREE.Vector3(-4, 0.1, -0.3),
    new THREE.Vector3(-1, 0.1, 0.2),
    new THREE.Vector3(2, 0.1, -0.2),
    new THREE.Vector3(5, 0.1, 0),
    new THREE.Vector3(8, 0.1, 0.3),
    new THREE.Vector3(11, 0.1, 0),
  ], []);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={1.2} 
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-5, 8, -5]} intensity={0.3} />
      <hemisphereLight args={['#87CEEB', '#228B22', 0.3]} />
      
      {/* Terrain */}
      <Terrain />
      
      {/* Mountains (River Origin) */}
      <Mountain position={[-11, 0, -1]} scale={1.5} color="#6B7280" />
      <Mountain position={[-10, 0, 1]} scale={1.2} color="#78716C" />
      <Mountain position={[-9, 0, -2]} scale={1.0} color="#71717A" />
      <Mountain position={[-12, 0, 0]} scale={1.8} color="#64748B" />
      <Mountain position={[-10.5, 0, -3]} scale={0.8} color="#78716C" />
      
      {/* Forest Area (after mountains) */}
      <ForestArea position={[-6.5, 0, 0]} />
      
      {/* Agricultural Area */}
      <FarmArea position={[-2, 0, -2]} />
      <FarmArea position={[-2, 0, 2]} />
      
      {/* Buffer Zone before treatment plant */}
      <BufferZone position={[1, 0, -2]} width={2} depth={1.5} treeCount={6} />
      <BufferZone position={[1, 0, 2]} width={2} depth={1.5} treeCount={6} />
      
      {/* Water Treatment Plant */}
      <WaterTreatmentPlant position={[4, 0, 0]} />
      
      {/* Buffer Zone after treatment */}
      <BufferZone position={[7, 0, -1.8]} width={1.5} depth={1.2} treeCount={5} />
      <BufferZone position={[7, 0, 1.8]} width={1.5} depth={1.2} treeCount={5} />
      
      {/* Urban City */}
      <CityArea position={[10, 0, 0]} />
      
      {/* River */}
      <RiverSegment points={riverPath} width={0.6} />
      <WaterParticles path={riverPath} />
      
      {/* Additional vegetation along river banks */}
      <Tree position={[-5, 0, 1.2]} scale={0.5} type="deciduous" />
      <Tree position={[-3.5, 0, -1.3]} scale={0.4} type="pine" />
      <Tree position={[0, 0, 1.5]} scale={0.5} type="deciduous" />
      <Tree position={[2.5, 0, -1.4]} scale={0.4} type="pine" />
      
      {/* Camera Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        minDistance={5}
        maxDistance={25}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.3}
        target={[0, 0, 0]}
      />
    </>
  );
};

// Main Component
const RiverBasin3D: React.FC = () => {
  return (
    <div className="river-basin-container">
      <Canvas
        camera={{ position: [0, 12, 18], fov: 40 }}
        shadows
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#E0F2FE']} />
        <fog attach="fog" args={['#E0F2FE', 20, 40]} />
        <Scene />
      </Canvas>
      
      {/* Legend overlay */}
      <div className="river-basin-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#6B7280' }}></span>
          <span>Mountains</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#16A34A' }}></span>
          <span>Forest</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#84CC16' }}></span>
          <span>Agriculture</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#22C55E' }}></span>
          <span>Treatment Plant</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#64748B' }}></span>
          <span>Urban Area</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#0EA5E9' }}></span>
          <span>River</span>
        </div>
      </div>
    </div>
  );
};

export default RiverBasin3D;
