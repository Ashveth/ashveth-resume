import { Canvas } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useState, useEffect } from "react";

const FloatingShapes = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const shapesRef = useRef<THREE.Mesh[]>([]);

  const shapes = useMemo(() => {
    const geometries = [
      new THREE.IcosahedronGeometry(0.4, 0),
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
      new THREE.DodecahedronGeometry(0.3, 0),
      new THREE.IcosahedronGeometry(0.25, 1),
      new THREE.OctahedronGeometry(0.2, 0),
      new THREE.TorusGeometry(0.25, 0.08, 8, 16),
      new THREE.IcosahedronGeometry(0.15, 0),
    ];

    return geometries.map((geo, i) => ({
      geometry: geo,
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      speed: 0.1 + Math.random() * 0.3,
      floatSpeed: 0.3 + Math.random() * 0.5,
      floatRange: 0.3 + Math.random() * 0.6,
      rotSpeed: (Math.random() - 0.5) * 0.01,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle group rotation from mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.08,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.05,
      0.02
    );

    shapesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = shapes[i];
      mesh.position.y = s.position[1] + Math.sin(t * s.floatSpeed + i) * s.floatRange;
      mesh.position.x = s.position[0] + Math.sin(t * s.floatSpeed * 0.7 + i * 2) * s.floatRange * 0.3;
      mesh.rotation.x += s.rotSpeed;
      mesh.rotation.y += s.rotSpeed * 1.3;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) shapesRef.current[i] = el; }}
          geometry={s.geometry}
          position={s.position}
          rotation={s.rotation}
        >
          <meshStandardMaterial
            color={new THREE.Color().setHSL(0.58 + i * 0.03, 0.4, 0.5)}
            transparent
            opacity={0.12 + (i % 3) * 0.04}
            roughness={0.8}
            metalness={0.2}
            wireframe={i % 3 === 0}
          />
        </mesh>
      ))}
    </group>
  );
};

const AmbientParticles = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const count = 200;
    const pos = new Float32Array(count * 3);
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
      s[i] = Math.random() * 0.03 + 0.01;
    }
    return [pos, s];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.01 + mouse.x * 0.02;
    ref.current.rotation.x = mouse.y * 0.01;

    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < posArr.length; i += 3) {
      posArr[i + 1] += Math.sin(t * 0.5 + i) * 0.0008;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6699ff"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const FloatingScene3D = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} color="#88aaff" />
        <directionalLight position={[-3, -2, 4]} intensity={0.2} color="#aaccff" />
        <FloatingShapes mouse={mouse} />
        <AmbientParticles mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default FloatingScene3D;
