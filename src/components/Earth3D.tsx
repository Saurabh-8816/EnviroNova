import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import * as THREE from 'three';

// Earth Globe Component
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsed * 0.1;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = elapsed * 0.12;
    }
  });

  // Create continent shapes using shader
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
        
        // Simple noise function for continent generation
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
          
          // Generate continent-like pattern
          float continent = fbm(uv * 8.0 + vec2(1.0, 0.5));
          continent = smoothstep(0.4, 0.6, continent);
          
          // Ocean color (dark blue/black)
          vec3 oceanColor = vec3(0.02, 0.02, 0.08);
          
          // Land color with purple/blue glow effect
          vec3 landColor = vec3(0.1, 0.05, 0.3);
          vec3 glowColor = vec3(0.4, 0.2, 0.8);
          
          // Edge glow for continents
          float edge = fwidth(continent) * 15.0;
          vec3 edgeGlow = glowColor * edge * 3.0;
          
          // Mix colors
          vec3 baseColor = mix(oceanColor, landColor, continent);
          baseColor += edgeGlow * continent;
          
          // Add fresnel rim lighting
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 rimColor = vec3(0.3, 0.1, 0.6) * fresnel * 0.5;
          
          gl_FragColor = vec4(baseColor + rimColor, 1.0);
        }
      `,
    });
  }, []);

  // Atmosphere glow material
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 atmosphereColor = vec3(0.4, 0.2, 0.8);
          gl_FragColor = vec4(atmosphereColor, intensity * 0.6);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  return (
    <group>
      {/* Main Earth */}
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} material={atmosphereMaterial} scale={1.15}>
        <sphereGeometry args={[2, 64, 64]} />
      </mesh>

      {/* Inner glow */}
      <mesh scale={1.02}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#6b21a8"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

// Orbital Ring Component
const OrbitalRing = ({ 
  radius, 
  tilt, 
  rotationSpeed,
  color = '#ffffff'
}: { 
  radius: number; 
  tilt: number; 
  rotationSpeed: number;
  color?: string;
}) => {
  const ringRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * rotationSpeed;
    }
  });

  // Create ellipse points
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius * 0.3,
        0
      ));
    }
    return pts;
  }, [radius]);

  return (
    <group ref={ringRef} rotation={[tilt, 0, 0]}>
      <Line
        points={points}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.6}
      />
    </group>
  );
};

// Particles/Stars Component
const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    const colors = new Float32Array(200 * 3);

    for (let i = 0; i < 200; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 8 + Math.random() * 4;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      colors[i * 3] = 0.5 + Math.random() * 0.5;
      colors[i * 3 + 1] = 0.5 + Math.random() * 0.5;
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
    }

    return [positions, colors];
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  const positionAttr = useMemo(() => {
    return new THREE.BufferAttribute(positions, 3);
  }, [positions]);

  const colorAttr = useMemo(() => {
    return new THREE.BufferAttribute(colors, 3);
  }, [colors]);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <primitive object={positionAttr} attach="attributes-position" />
        <primitive object={colorAttr} attach="attributes-color" />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

// Main Earth3D Component
const Earth3D: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#6b21a8" />

        <Earth />
        
        {/* Orbital rings */}
        <OrbitalRing radius={3.2} tilt={0.5} rotationSpeed={0.1} color="#e0e0e0" />
        <OrbitalRing radius={3.5} tilt={-0.3} rotationSpeed={-0.08} color="#c0c0c0" />

        <Particles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Earth3D;
