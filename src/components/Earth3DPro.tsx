import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Main Earth with clear Left/Right split (Pollution vs Clean)
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const smokeRef = useRef<THREE.Mesh>(null);
  const riverRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsed * 0.30;
    }
    if (smokeRef.current) {
      smokeRef.current.rotation.y = elapsed * 0.30;
    }
    if (riverRef.current) {
      riverRef.current.rotation.y = elapsed * 0.30;
    }
  });

  // Earth shader - CLEAR Left/Right split
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
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
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 5; i++) {
            value += amplitude * noise(p);
            p *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }
        
        void main() {
          vec2 uv = vUv;
          
          // CLEAR LEFT/RIGHT SPLIT with smooth transition
          float side = smoothstep(-0.08, 0.08, vPosition.x);
          
          // Continent shapes
          float continent = fbm(uv * 5.0 + vec2(1.5, 0.8));
          continent = smoothstep(0.38, 0.52, continent);
          
          // === POLLUTION SIDE (LEFT) - Muted browns and grays ===
          
          // Polluted ocean - murky brown-gray
          vec3 pollutedOceanDeep = vec3(0.08, 0.07, 0.06);
          vec3 pollutedOceanSurface = vec3(0.15, 0.12, 0.1);
          float oceanVar = fbm(uv * 3.0);
          vec3 pollutedOcean = mix(pollutedOceanDeep, pollutedOceanSurface, oceanVar);
          
          // Polluted land - barren brown/gray
          vec3 barrenLand = vec3(0.3, 0.25, 0.2);
          vec3 deadSoil = vec3(0.22, 0.18, 0.15);
          vec3 dustyGround = vec3(0.35, 0.3, 0.25);
          float landVar = fbm(uv * 8.0);
          vec3 pollutedLand = mix(barrenLand, deadSoil, landVar);
          pollutedLand = mix(pollutedLand, dustyGround, fbm(uv * 12.0) * 0.3);
          
          // Industrial patches
          float industrial = fbm(uv * 15.0);
          industrial = smoothstep(0.55, 0.7, industrial) * continent;
          vec3 concreteGray = vec3(0.4, 0.38, 0.36);
          pollutedLand = mix(pollutedLand, concreteGray, industrial * 0.4);
          
          vec3 pollutionBase = mix(pollutedOcean, pollutedLand, continent);
          
          // === CLEAN SIDE (RIGHT) - Natural greens and deep blues ===
          
          // Clean ocean - beautiful deep blue
          vec3 oceanDeep = vec3(0.02, 0.12, 0.25);
          vec3 oceanMid = vec3(0.04, 0.2, 0.38);
          vec3 oceanShallow = vec3(0.08, 0.32, 0.45);
          float depthVar = fbm(uv * 4.0);
          vec3 cleanOcean = mix(oceanDeep, oceanMid, depthVar);
          
          // Coastal glow - lighter blue near land
          float coastDist = smoothstep(0.35, 0.5, continent);
          cleanOcean = mix(cleanOcean, oceanShallow, coastDist * (1.0 - continent) * 1.5);
          
          // Natural land - rich greens
          vec3 forestGreen = vec3(0.1, 0.35, 0.15);
          vec3 grassGreen = vec3(0.2, 0.45, 0.18);
          vec3 meadowGreen = vec3(0.28, 0.5, 0.22);
          vec3 darkForest = vec3(0.06, 0.25, 0.1);
          
          float forestDensity = fbm(uv * 10.0 + vec2(2.0, 1.0));
          float elevation = fbm(uv * 7.0);
          
          vec3 cleanLand = mix(grassGreen, forestGreen, forestDensity);
          cleanLand = mix(cleanLand, meadowGreen, fbm(uv * 6.0) * 0.4);
          cleanLand = mix(cleanLand, darkForest, elevation * forestDensity * 0.3);
          
          // Rivers on clean side - visible blue lines
          float riverPattern = fbm(uv * 20.0 + vec2(3.0, 5.0));
          float river = smoothstep(0.46, 0.5, riverPattern) * smoothstep(0.5, 0.54, riverPattern);
          river = river * continent * 0.8;
          
          // River color - fresh water blue
          vec3 riverBlue = vec3(0.15, 0.4, 0.55);
          vec3 riverLight = vec3(0.3, 0.55, 0.65);
          
          // Add river deltas near coasts
          float delta = smoothstep(0.4, 0.5, continent) * (1.0 - smoothstep(0.5, 0.6, continent));
          float deltaRivers = fbm(uv * 25.0) * delta;
          deltaRivers = smoothstep(0.3, 0.5, deltaRivers);
          
          vec3 cleanBase = mix(cleanOcean, cleanLand, continent);
          cleanBase = mix(cleanBase, riverBlue, river);
          cleanBase = mix(cleanBase, riverLight, deltaRivers * 0.5);
          
          // Soft earth brown for beaches/shores
          vec3 sandyBeach = vec3(0.6, 0.52, 0.4);
          float beachZone = smoothstep(0.35, 0.42, continent) * (1.0 - smoothstep(0.42, 0.5, continent));
          cleanBase = mix(cleanBase, sandyBeach, beachZone * 0.4);
          
          // === BLEND BOTH SIDES ===
          vec3 baseColor = mix(pollutionBase, cleanBase, side);
          
          // === NATURAL LIGHTING ===
          vec3 lightDir = normalize(vec3(0.4, 0.5, 1.0));
          float diff = max(dot(vNormal, lightDir), 0.0);
          float ambient = 0.4;
          
          vec3 finalColor = baseColor * (ambient + diff * 0.6);
          
          // Soft rim light
          float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
          rim = pow(rim, 3.5);
          vec3 rimColor = mix(vec3(0.25, 0.22, 0.2), vec3(0.3, 0.45, 0.55), side);
          finalColor += rim * 0.06 * rimColor;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  // Atmosphere - different per side
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
          
          float side = smoothstep(-0.1, 0.1, vPosition.x);
          // Polluted side: brownish haze | Clean side: fresh blue
          vec3 pollutedAtmo = vec3(0.35, 0.3, 0.25);
          vec3 cleanAtmo = vec3(0.4, 0.55, 0.7);
          vec3 atmosphereColor = mix(pollutedAtmo, cleanAtmo, side);
          
          gl_FragColor = vec4(atmosphereColor, intensity * 0.3);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Smoke layer on pollution side
  const smokeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
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
        
        void main() {
          // Only pollution side
          float side = 1.0 - smoothstep(-0.3, 0.05, vPosition.x);
          
          float smoke = noise(vUv * 4.0) * noise(vUv * 6.0 + 1.0);
          smoke = smoothstep(0.2, 0.45, smoke);
          
          vec3 smokeColor = vec3(0.4, 0.38, 0.35);
          float alpha = smoke * side * 0.18;
          
          if (alpha < 0.02) discard;
          gl_FragColor = vec4(smokeColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  // Visible river/water lines overlay
  const riverMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vPosition = position;
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        varying vec3 vNormal;
        
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
        
        void main() {
          // Only clean side
          float side = smoothstep(-0.05, 0.15, vPosition.x);
          
          // River lines
          float riverLine = noise(vUv * 25.0 + vec2(7.0, 3.0));
          riverLine = smoothstep(0.48, 0.5, riverLine) * smoothstep(0.5, 0.52, riverLine);
          
          // Waterfall streaks (vertical lines on slopes)
          float waterfall = noise(vUv * vec2(30.0, 8.0));
          waterfall = smoothstep(0.47, 0.5, waterfall) * smoothstep(0.5, 0.53, waterfall);
          waterfall *= smoothstep(0.3, 0.6, vPosition.y + 0.5); // More on upper parts
          
          float water = max(riverLine, waterfall * 0.7);
          
          vec3 waterColor = vec3(0.3, 0.6, 0.75);
          vec3 waterfallColor = vec3(0.7, 0.85, 0.95);
          
          vec3 color = mix(waterColor, waterfallColor, waterfall);
          float alpha = water * side * 0.6;
          
          if (alpha < 0.05) discard;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
      depthWrite: false,
    });
  }, []);

  return (
    <group>
      {/* Main Earth */}
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[2, 128, 128]} />
      </mesh>

      {/* River/water overlay */}
      <mesh ref={riverRef} material={riverMaterial} scale={1.005}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>

      {/* Smoke on pollution side */}
      <mesh ref={smokeRef} material={smokeMaterial} scale={1.02}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>

      {/* Atmosphere */}
      <mesh material={atmosphereMaterial} scale={1.08}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>
    </group>
  );
};

// Flow Lines - representing water treatment/sustainability transition
const FlowLines = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  // Create flowing curve points
  const createFlowCurve = (startTheta: number, direction: number) => {
    const points: THREE.Vector3[] = [];
    const segments = 60;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const theta = startTheta + direction * t * Math.PI * 0.6;
      const phi = Math.PI / 2 + Math.sin(t * Math.PI * 2) * 0.3;
      const radius = 2.15 + Math.sin(t * Math.PI) * 0.05;
      
      points.push(new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) + Math.sin(t * Math.PI * 3) * 0.1,
        radius * Math.sin(phi) * Math.sin(theta)
      ));
    }
    return points;
  };

  const flowLine1Points = useMemo(() => createFlowCurve(-0.3, 1), []);
  const flowLine2Points = useMemo(() => createFlowCurve(-0.5, 1), []);
  const flowLine3Points = useMemo(() => createFlowCurve(-0.1, 1), []);

  return (
    <group ref={groupRef}>
      {/* Water flow lines - blue gradient */}
      <Line points={flowLine1Points} color="#3498db" transparent opacity={0.4} lineWidth={1} />
      <Line points={flowLine2Points} color="#2980b9" transparent opacity={0.35} lineWidth={1} />
      <Line points={flowLine3Points} color="#5dade2" transparent opacity={0.3} lineWidth={1} />
    </group>
  );
};

// Wind Turbine
const WindTurbine = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const bladeRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.z = clock.getElapsedTime() * 4;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.005, 0.008, 0.2, 8]} />
        <meshStandardMaterial color="#e8e8e8" />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.02, 0.012, 0.012]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <group ref={bladeRef} position={[0, 0.2, 0.008]}>
        {[0, 120, 240].map((angle, i) => (
          <mesh key={i} rotation={[0, 0, (angle * Math.PI) / 180]} position={[0, 0.035, 0]}>
            <boxGeometry args={[0.005, 0.08, 0.002]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Tree
const Tree = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.005, 0.007, 0.04, 6]} />
        <meshStandardMaterial color="#5d4037" />
      </mesh>
      <mesh position={[0, 0.055, 0]}>
        <coneGeometry args={[0.03, 0.06, 8]} />
        <meshStandardMaterial color="#2e7d32" />
      </mesh>
      <mesh position={[0, 0.085, 0]}>
        <coneGeometry args={[0.022, 0.045, 8]} />
        <meshStandardMaterial color="#388e3c" />
      </mesh>
    </group>
  );
};

// Factory with smoke
const Factory = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const smokeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (smokeRef.current) {
      smokeRef.current.position.y = 0.14 + Math.sin(clock.getElapsedTime() * 2) * 0.008;
      smokeRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 2.5) * 0.12);
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[0.06, 0.06, 0.04]} />
        <meshStandardMaterial color="#546e7a" />
      </mesh>
      <mesh position={[0.01, 0.09, 0]}>
        <cylinderGeometry args={[0.007, 0.009, 0.07, 8]} />
        <meshStandardMaterial color="#455a64" />
      </mesh>
      <mesh ref={smokeRef} position={[0.01, 0.14, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#9e9e9e" transparent opacity={0.5} />
      </mesh>
    </group>
  );
};

// Dead Tree
const DeadTree = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.025, 0]} rotation={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.003, 0.006, 0.05, 5]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[0.012, 0.04, 0]} rotation={[0, 0, -0.7]}>
        <cylinderGeometry args={[0.002, 0.003, 0.025, 4]} />
        <meshStandardMaterial color="#3d3d3d" />
      </mesh>
    </group>
  );
};

// Water Drop / Treatment symbol
const WaterDrop = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const dropRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (dropRef.current) {
      dropRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 2) * 0.02;
    }
  });

  return (
    <group ref={dropRef} position={position} scale={scale}>
      <mesh rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.015, 0.035, 8]} />
        <meshStandardMaterial color="#3498db" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.015, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color="#3498db" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

// Floating elements
const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  const getPositionOnSphere = (theta: number, phi: number, radius: number): [number, number, number] => {
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ];
  };

  return (
    <group ref={groupRef}>
      {/* CLEAN SIDE - turbines, trees, water drops */}
      <WindTurbine position={getPositionOnSphere(0.25, 1.25, 2.02)} scale={0.65} />
      <WindTurbine position={getPositionOnSphere(0.5, 1.5, 2.02)} scale={0.5} />
      <WindTurbine position={getPositionOnSphere(-0.1, 1.65, 2.02)} scale={0.55} />
      
      <Tree position={getPositionOnSphere(0.35, 1.35, 2.01)} scale={0.6} />
      <Tree position={getPositionOnSphere(0.15, 1.2, 2.01)} scale={0.5} />
      <Tree position={getPositionOnSphere(0.55, 1.55, 2.01)} scale={0.55} />
      <Tree position={getPositionOnSphere(-0.05, 1.45, 2.01)} scale={0.45} />
      <Tree position={getPositionOnSphere(0.7, 1.4, 2.01)} scale={0.5} />
      
      <WaterDrop position={getPositionOnSphere(0.4, 1.1, 2.08)} scale={0.6} />
      <WaterDrop position={getPositionOnSphere(0.1, 1.7, 2.08)} scale={0.5} />

      {/* POLLUTION SIDE - factories, dead trees */}
      <Factory position={getPositionOnSphere(2.9, 1.3, 2.02)} scale={0.55} />
      <Factory position={getPositionOnSphere(3.25, 1.5, 2.02)} scale={0.5} />
      <Factory position={getPositionOnSphere(2.65, 1.55, 2.02)} scale={0.45} />
      
      <DeadTree position={getPositionOnSphere(3.0, 1.45, 2.01)} scale={0.55} />
      <DeadTree position={getPositionOnSphere(2.75, 1.35, 2.01)} scale={0.5} />
      <DeadTree position={getPositionOnSphere(3.35, 1.6, 2.01)} scale={0.5} />
    </group>
  );
};

// Subtle stars
const Stars = () => {
  const positions = useMemo(() => {
    const pos = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 15 + Math.random() * 10;
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 5;
    }
    return pos;
  }, []);

  const positionAttr = useMemo(() => new THREE.BufferAttribute(positions, 3), [positions]);

  return (
    <points>
      <bufferGeometry>
        <primitive object={positionAttr} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
};

// Main Component
const Earth3DPro: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0.2, 6.5], fov: 36 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        {/* Natural soft lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 3, 5]} intensity={0.5} color="#fffbf0" />
        <directionalLight position={[-3, 2, -3]} intensity={0.15} color="#e8f4f8" />
        <pointLight position={[3, 1, 4]} intensity={0.2} color="#fff5e6" distance={12} />
        <hemisphereLight args={['#87ceeb', '#4a6741', 0.15]} />

        <Stars />
        <Earth />
        <FlowLines />
        <FloatingElements />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.8}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
};

export default Earth3DPro;
