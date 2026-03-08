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

// Neural Network Layer
const NeuralNetwork = ({ mouse }: { mouse: { x: number; y: number } }) => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pulsesRef = useRef<THREE.Points>(null);

  const nodeCount = 40;
  const maxConnectionDist = 3.5;

  const { nodePositions, nodeVelocities, connections, pulseData } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const vel = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }

    // Pre-calculate potential connections
    const conns: { from: number; to: number }[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxConnectionDist) {
          conns.push({ from: i, to: j });
        }
      }
    }

    // Pulse particles traveling along connections
    const pulseCount = Math.min(conns.length, 20);
    const pData = Array.from({ length: pulseCount }, (_, i) => ({
      connectionIndex: i % conns.length,
      progress: Math.random(),
      speed: 0.15 + Math.random() * 0.25,
    }));

    return { nodePositions: pos, nodeVelocities: vel, connections: conns, pulseData: pData };
  }, []);

  const linePositions = useMemo(() => new Float32Array(connections.length * 6), [connections]);
  const lineColors = useMemo(() => {
    const c = new Float32Array(connections.length * 6);
    c.fill(0.4); // base color
    return c;
  }, [connections]);
  const pulsePositions = useMemo(() => new Float32Array(pulseData.length * 3), [pulseData]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle parallax from mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.04, 0.015);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.03, 0.015);

    // Move nodes slowly
    for (let i = 0; i < nodeCount; i++) {
      nodePositions[i * 3] += nodeVelocities[i * 3];
      nodePositions[i * 3 + 1] += nodeVelocities[i * 3 + 1];
      nodePositions[i * 3 + 2] += nodeVelocities[i * 3 + 2];

      // Boundary bounce
      if (Math.abs(nodePositions[i * 3]) > 8) nodeVelocities[i * 3] *= -1;
      if (Math.abs(nodePositions[i * 3 + 1]) > 5) nodeVelocities[i * 3 + 1] *= -1;
      if (Math.abs(nodePositions[i * 3 + 2] + 4) > 4) nodeVelocities[i * 3 + 2] *= -1;
    }

    if (nodesRef.current) {
      nodesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Update connection lines
    for (let c = 0; c < connections.length; c++) {
      const { from, to } = connections[c];
      linePositions[c * 6] = nodePositions[from * 3];
      linePositions[c * 6 + 1] = nodePositions[from * 3 + 1];
      linePositions[c * 6 + 2] = nodePositions[from * 3 + 2];
      linePositions[c * 6 + 3] = nodePositions[to * 3];
      linePositions[c * 6 + 4] = nodePositions[to * 3 + 1];
      linePositions[c * 6 + 5] = nodePositions[to * 3 + 2];

      // Distance-based opacity via color brightness
      const dx = nodePositions[from * 3] - nodePositions[to * 3];
      const dy = nodePositions[from * 3 + 1] - nodePositions[to * 3 + 1];
      const dz = nodePositions[from * 3 + 2] - nodePositions[to * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const brightness = Math.max(0, 1 - dist / maxConnectionDist) * 0.35;

      // Blue tint (r=0.3, g=0.5, b=1.0) * brightness
      lineColors[c * 6] = 0.3 * brightness;
      lineColors[c * 6 + 1] = 0.5 * brightness;
      lineColors[c * 6 + 2] = 1.0 * brightness;
      lineColors[c * 6 + 3] = 0.3 * brightness;
      lineColors[c * 6 + 4] = 0.5 * brightness;
      lineColors[c * 6 + 5] = 1.0 * brightness;
    }

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.color.needsUpdate = true;
    }

    // Update pulses traveling along connections
    for (let p = 0; p < pulseData.length; p++) {
      const pulse = pulseData[p];
      pulse.progress += pulse.speed * 0.008;
      if (pulse.progress > 1) {
        pulse.progress = 0;
        pulse.connectionIndex = Math.floor(Math.random() * connections.length);
      }

      const conn = connections[pulse.connectionIndex];
      if (!conn) continue;
      const { from, to } = conn;
      const prog = pulse.progress;

      pulsePositions[p * 3] = nodePositions[from * 3] + (nodePositions[to * 3] - nodePositions[from * 3]) * prog;
      pulsePositions[p * 3 + 1] = nodePositions[from * 3 + 1] + (nodePositions[to * 3 + 1] - nodePositions[from * 3 + 1]) * prog;
      pulsePositions[p * 3 + 2] = nodePositions[from * 3 + 2] + (nodePositions[to * 3 + 2] - nodePositions[from * 3 + 2]) * prog;
    }

    if (pulsesRef.current) {
      pulsesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={nodeCount} array={nodePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#4488ff"
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={connections.length * 2} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={connections.length * 2} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Traveling pulses */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={pulseData.length} array={pulsePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#66aaff"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
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
        <NeuralNetwork mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default FloatingScene3D;
