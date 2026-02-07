import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Main Earth with split shader (Pollution vs Sustainability)
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const smokeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsed * 0.29; // Smooth rotation
    }
    if (smokeRef.current) {
      smokeRef.current.rotation.y = elapsed * 0.29;
    }
  });

  // Earth shader material - split between pollution and sustainability
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        
        // Noise functions for terrain
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }
        
        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 6; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        void main() {
          vec2 uv = vUv;
          
          // Determine which side (pollution vs sustainability)
          // Smooth transition at the boundary
          float side = smoothstep(-0.15, 0.15, vPosition.x);
          
          // Generate continent pattern
          float continent = fbm(uv * 6.0 + vec2(2.0, 1.0));
          continent = smoothstep(0.35, 0.55, continent);
          
          // River pattern
          float river = fbm(uv * 15.0 + vec2(5.0, 3.0));
          river = smoothstep(0.48, 0.52, river) * continent;
          
          // Mountain/elevation pattern
          float elevation = fbm(uv * 10.0 + vec2(3.0, 2.0));
          
          // === POLLUTION SIDE (left, x < 0) ===
          // Polluted ocean - murky grey-brown
          vec3 pollutedOcean = vec3(0.12, 0.11, 0.1);
          vec3 pollutedOceanShallow = vec3(0.18, 0.15, 0.13);
          
          // Polluted land - grey, brown, barren
          vec3 pollutedLand = vec3(0.28, 0.24, 0.2);
          vec3 pollutedLandDark = vec3(0.2, 0.17, 0.14);
          vec3 deadVegetation = vec3(0.35, 0.3, 0.22);
          
          // Industrial zones
          float industrial = fbm(uv * 20.0);
          industrial = smoothstep(0.5, 0.7, industrial) * continent;
          vec3 industrialColor = vec3(0.32, 0.3, 0.28);
          vec3 concreteColor = vec3(0.4, 0.38, 0.36);
          
          // Mix pollution colors
          vec3 pollutedOceanMix = mix(pollutedOcean, pollutedOceanShallow, fbm(uv * 4.0));
          vec3 pollutedLandMix = mix(pollutedLand, pollutedLandDark, elevation);
          pollutedLandMix = mix(pollutedLandMix, deadVegetation, fbm(uv * 8.0) * 0.5);
          
          vec3 pollutionBase = mix(pollutedOceanMix, pollutedLandMix, continent);
          pollutionBase = mix(pollutionBase, industrialColor, industrial * 0.6);
          pollutionBase = mix(pollutionBase, concreteColor, industrial * 0.3);
          
          // === SUSTAINABILITY SIDE (right, x > 0) ===
          // Clean ocean - beautiful blue-green
          vec3 cleanOcean = vec3(0.04, 0.22, 0.35);
          vec3 cleanOceanDeep = vec3(0.02, 0.12, 0.25);
          vec3 cleanOceanShallow = vec3(0.1, 0.35, 0.45);
          
          // Green land - lush forests and meadows
          vec3 forestGreen = vec3(0.08, 0.32, 0.12);
          vec3 meadowGreen = vec3(0.2, 0.45, 0.18);
          vec3 darkForest = vec3(0.05, 0.22, 0.08);
          vec3 grassland = vec3(0.3, 0.5, 0.2);
          
          // Rivers and fresh water
          vec3 riverBlue = vec3(0.15, 0.4, 0.5);
          vec3 waterfallWhite = vec3(0.7, 0.85, 0.9);
          
          // Snow caps for mountains
          vec3 snowWhite = vec3(0.95, 0.97, 1.0);
          
          // Forest density and type variation
          float forestDensity = fbm(uv * 12.0 + vec2(1.0, 2.0));
          float forestType = fbm(uv * 6.0 + vec2(4.0, 1.0));
          
          vec3 landColor = mix(grassland, meadowGreen, forestType);
          landColor = mix(landColor, forestGreen, forestDensity * 0.8);
          landColor = mix(landColor, darkForest, elevation * forestDensity * 0.5);
          
          // Add snow on high elevations
          float snowLine = smoothstep(0.7, 0.85, elevation) * continent;
          landColor = mix(landColor, snowWhite, snowLine * 0.8);
          
          // Ocean depth variation
          float oceanDepth = fbm(uv * 4.0);
          float coastLine = smoothstep(0.3, 0.4, continent);
          vec3 oceanColor = mix(cleanOceanDeep, cleanOcean, oceanDepth);
          oceanColor = mix(oceanColor, cleanOceanShallow, (1.0 - coastLine) * continent * 2.0);
          
          vec3 sustainBase = mix(oceanColor, landColor, continent);
          
          // Add rivers with subtle waterfall effect
          float riverIntensity = river * 0.9;
          float waterfallEffect = smoothstep(0.6, 0.8, elevation) * river;
          sustainBase = mix(sustainBase, riverBlue, riverIntensity);
          sustainBase = mix(sustainBase, waterfallWhite, waterfallEffect * 0.5);
          
          // === BLEND BOTH SIDES WITH SMOOTH TRANSITION ===
          vec3 baseColor = mix(pollutionBase, sustainBase, side);
          
          // === PROFESSIONAL SOFT LIGHTING ===
          vec3 lightDir = normalize(vec3(0.5, 0.4, 1.0));
          float diff = max(dot(vNormal, lightDir), 0.0);
          float ambient = 0.35;
          
          // Soft shadows
          float shadow = smoothstep(0.0, 0.3, diff);
          
          vec3 finalColor = baseColor * (ambient + shadow * 0.65);
          
          // Subtle rim lighting for depth
          float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
          rim = pow(rim, 4.0);
          vec3 rimColor = mix(vec3(0.3, 0.35, 0.4), vec3(0.2, 0.4, 0.5), side);
          finalColor += rim * 0.08 * rimColor;
          
          // Slight color grading for professional look
          finalColor = pow(finalColor, vec3(0.95));
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  // Subtle atmosphere glow
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          
          // Different atmosphere color per side
          float side = smoothstep(-0.1, 0.1, vPosition.x);
          vec3 pollutedAtmo = vec3(0.35, 0.32, 0.3);
          vec3 cleanAtmo = vec3(0.4, 0.6, 0.8);
          vec3 atmosphereColor = mix(pollutedAtmo, cleanAtmo, side);
          
          gl_FragColor = vec4(atmosphereColor, intensity * 0.35);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Smoke/pollution cloud layer (only on pollution side)
  const smokeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        varying vec2 vUv;
        
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }
        
        float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          for (int i = 0; i < 4; i++) {
            v += a * noise(p);
            p *= 2.0;
            a *= 0.5;
          }
          return v;
        }
        
        void main() {
          // Only show on pollution side (x < 0)
          float side = 1.0 - smoothstep(-0.4, 0.0, vPosition.x);
          
          // Smoke/smog pattern
          vec2 uv = vUv * 3.0;
          float smoke = fbm(uv * 2.0) * fbm(uv * 3.0 + 1.0);
          smoke = smoothstep(0.15, 0.45, smoke);
          
          // Smoke color - grey/brown industrial haze
          vec3 smokeColor = vec3(0.45, 0.42, 0.4);
          
          float alpha = smoke * side * 0.2;
          
          if (alpha < 0.02) discard;
          
          gl_FragColor = vec4(smokeColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  return (
    <group>
      {/* Main Earth */}
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[2, 128, 128]} />
      </mesh>

      {/* Smoke layer on pollution side */}
      <mesh ref={smokeRef} material={smokeMaterial} scale={1.025}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh material={atmosphereMaterial} scale={1.1}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>
    </group>
  );
};

// Wind Turbine Component
const WindTurbine = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const bladeRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.z = clock.getElapsedTime() * 3;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Tower */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.006, 0.01, 0.24, 8]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Nacelle */}
      <mesh position={[0, 0.24, 0]}>
        <boxGeometry args={[0.025, 0.015, 0.015]} />
        <meshStandardMaterial color="#f5f5f5" metalness={0.2} roughness={0.8} />
      </mesh>
      {/* Blades */}
      <group ref={bladeRef} position={[0, 0.24, 0.01]}>
        {[0, 120, 240].map((angle, i) => (
          <mesh key={i} rotation={[0, 0, (angle * Math.PI) / 180]} position={[0, 0.04, 0]}>
            <boxGeometry args={[0.006, 0.1, 0.002]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Solar Panel Array Component
const SolarPanel = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  return (
    <group position={position} scale={scale} rotation={[-0.2, 0, 0]}>
      {/* Panel */}
      <mesh>
        <boxGeometry args={[0.1, 0.06, 0.004]} />
        <meshStandardMaterial color="#1a237e" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Frame */}
      <mesh position={[0, 0, -0.003]}>
        <boxGeometry args={[0.105, 0.065, 0.002]} />
        <meshStandardMaterial color="#37474f" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Support */}
      <mesh position={[0, -0.04, -0.01]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.004, 0.006, 0.05, 6]} />
        <meshStandardMaterial color="#546e7a" />
      </mesh>
    </group>
  );
};

// Tree Component
const Tree = ({ position, scale = 1, type = 'pine' }: { position: [number, number, number]; scale?: number; type?: string }) => {
  if (type === 'pine') {
    return (
      <group position={position} scale={scale}>
        {/* Trunk */}
        <mesh position={[0, 0.025, 0]}>
          <cylinderGeometry args={[0.006, 0.008, 0.05, 6]} />
          <meshStandardMaterial color="#5d4037" roughness={0.9} />
        </mesh>
        {/* Foliage layers */}
        <mesh position={[0, 0.07, 0]}>
          <coneGeometry args={[0.035, 0.07, 8]} />
          <meshStandardMaterial color="#2e7d32" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <coneGeometry args={[0.028, 0.055, 8]} />
          <meshStandardMaterial color="#388e3c" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.125, 0]}>
          <coneGeometry args={[0.02, 0.04, 8]} />
          <meshStandardMaterial color="#43a047" roughness={0.8} />
        </mesh>
      </group>
    );
  }
  
  // Deciduous tree
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.006, 0.008, 0.06, 6]} />
        <meshStandardMaterial color="#4e342e" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#558b2f" roughness={0.85} />
      </mesh>
    </group>
  );
};

// Factory/Industrial Component (for pollution side)
const Factory = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const smoke1Ref = useRef<THREE.Mesh>(null);
  const smoke2Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (smoke1Ref.current) {
      smoke1Ref.current.position.y = 0.16 + Math.sin(t * 2) * 0.008;
      smoke1Ref.current.scale.setScalar(1 + Math.sin(t * 2.5) * 0.15);
    }
    if (smoke2Ref.current) {
      smoke2Ref.current.position.y = 0.14 + Math.sin(t * 2.3 + 1) * 0.006;
      smoke2Ref.current.scale.setScalar(0.8 + Math.sin(t * 2.8 + 0.5) * 0.12);
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Main building */}
      <mesh position={[0, 0.035, 0]}>
        <boxGeometry args={[0.07, 0.07, 0.05]} />
        <meshStandardMaterial color="#546e7a" roughness={0.8} />
      </mesh>
      {/* Secondary building */}
      <mesh position={[-0.03, 0.025, 0.02]}>
        <boxGeometry args={[0.035, 0.05, 0.03]} />
        <meshStandardMaterial color="#607d8b" roughness={0.8} />
      </mesh>
      {/* Chimney 1 */}
      <mesh position={[0.015, 0.1, 0]}>
        <cylinderGeometry args={[0.008, 0.01, 0.08, 8]} />
        <meshStandardMaterial color="#455a64" roughness={0.7} />
      </mesh>
      {/* Chimney 2 */}
      <mesh position={[-0.015, 0.085, -0.01]}>
        <cylinderGeometry args={[0.006, 0.008, 0.06, 8]} />
        <meshStandardMaterial color="#37474f" roughness={0.7} />
      </mesh>
      {/* Smoke puffs */}
      <mesh ref={smoke1Ref} position={[0.015, 0.16, 0]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#9e9e9e" transparent opacity={0.5} roughness={1} />
      </mesh>
      <mesh ref={smoke2Ref} position={[-0.015, 0.14, -0.01]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshStandardMaterial color="#bdbdbd" transparent opacity={0.4} roughness={1} />
      </mesh>
    </group>
  );
};

// Dead Tree (for pollution side)
const DeadTree = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.03, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.004, 0.007, 0.06, 5]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.95} />
      </mesh>
      {/* Dead branches */}
      <mesh position={[0.015, 0.05, 0]} rotation={[0, 0, -0.8]}>
        <cylinderGeometry args={[0.002, 0.003, 0.03, 4]} />
        <meshStandardMaterial color="#3d3d3d" roughness={0.95} />
      </mesh>
      <mesh position={[-0.01, 0.045, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.002, 0.003, 0.025, 4]} />
        <meshStandardMaterial color="#3d3d3d" roughness={0.95} />
      </mesh>
    </group>
  );
};

// Floating elements around Earth
const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  // Position elements on Earth's surface
  const getPositionOnSphere = (theta: number, phi: number, radius: number): [number, number, number] => {
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ];
  };

  return (
    <group ref={groupRef}>
      {/* === SUSTAINABILITY SIDE (positive x, theta around 0) === */}
      
      {/* Wind turbines */}
      <WindTurbine position={getPositionOnSphere(0.2, 1.3, 2.02)} scale={0.7} />
      <WindTurbine position={getPositionOnSphere(0.5, 1.5, 2.02)} scale={0.55} />
      <WindTurbine position={getPositionOnSphere(-0.15, 1.7, 2.02)} scale={0.6} />
      
      {/* Solar panels */}
      <SolarPanel position={getPositionOnSphere(0.7, 1.35, 2.02)} scale={0.6} />
      <SolarPanel position={getPositionOnSphere(0.4, 1.65, 2.02)} scale={0.5} />
      
      {/* Trees - forest */}
      <Tree position={getPositionOnSphere(0.35, 1.4, 2.01)} scale={0.7} type="pine" />
      <Tree position={getPositionOnSphere(0.15, 1.25, 2.01)} scale={0.55} type="pine" />
      <Tree position={getPositionOnSphere(0.6, 1.55, 2.01)} scale={0.6} type="deciduous" />
      <Tree position={getPositionOnSphere(-0.05, 1.5, 2.01)} scale={0.5} type="pine" />
      <Tree position={getPositionOnSphere(0.25, 1.6, 2.01)} scale={0.45} type="deciduous" />
      <Tree position={getPositionOnSphere(0.8, 1.45, 2.01)} scale={0.5} type="pine" />

      {/* === POLLUTION SIDE (negative x, theta around PI) === */}
      
      {/* Factories */}
      <Factory position={getPositionOnSphere(2.9, 1.35, 2.02)} scale={0.6} />
      <Factory position={getPositionOnSphere(3.3, 1.5, 2.02)} scale={0.5} />
      <Factory position={getPositionOnSphere(2.6, 1.6, 2.02)} scale={0.45} />
      
      {/* Dead trees */}
      <DeadTree position={getPositionOnSphere(3.0, 1.55, 2.01)} scale={0.6} />
      <DeadTree position={getPositionOnSphere(2.7, 1.4, 2.01)} scale={0.5} />
      <DeadTree position={getPositionOnSphere(3.4, 1.65, 2.01)} scale={0.55} />
      <DeadTree position={getPositionOnSphere(2.85, 1.7, 2.01)} scale={0.45} />
    </group>
  );
};

// Subtle star particles in background
const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(80 * 3);

    for (let i = 0; i < 80; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 12 + Math.random() * 8;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 5;
    }

    return pos;
  }, []);

  const positionAttr = useMemo(() => {
    return new THREE.BufferAttribute(positions, 3);
  }, [positions]);

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <primitive object={positionAttr} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
};

// Main Earth3D Component
const Earth3D2: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0.2, 7], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        {/* Soft professional lighting */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 3, 5]} intensity={0.55} color="#fffaf0" />
        <directionalLight position={[-4, 2, -3]} intensity={0.15} color="#b0c4de" />
        <pointLight position={[3, 1, 4]} intensity={0.25} color="#fff8e7" distance={15} />
        
        {/* Fill light for shadows */}
        <hemisphereLight args={['#87ceeb', '#3d5a80', 0.2]} />

        <Stars />
        <Earth />
        <FloatingElements />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.7}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
};

export default Earth3D2;
