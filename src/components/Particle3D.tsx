import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Particle3DProps {
  count: number;
  mouse: { x: number; y: number };
  orientation: { alpha: number; beta: number; gamma: number };
}

const Particle3D = ({ count, mouse, orientation }: Particle3DProps) => {
  const mesh = useRef<THREE.Points>(null);
  const velocities = useRef<Float32Array>();

  const particles = useMemo(() => {
    const temp = [];
    const tempVelocities = [];
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      temp.push(x, y, z);
      
      tempVelocities.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
    }
    
    velocities.current = new Float32Array(tempVelocities);
    return new Float32Array(temp);
  }, [count]);

  useFrame((state) => {
    if (!mesh.current || !velocities.current) return;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    // Mouse influence
    const mouseInfluenceX = mouse.x * 2;
    const mouseInfluenceY = -mouse.y * 2;
    
    // Device orientation influence (for mobile)
    const orientationInfluenceX = orientation.gamma * 0.02;
    const orientationInfluenceY = orientation.beta * 0.02;

    for (let i = 0; i < positions.length; i += 3) {
      // Apply velocities
      positions[i] += velocities.current[i];
      positions[i + 1] += velocities.current[i + 1];
      positions[i + 2] += velocities.current[i + 2];

      // Mouse/touch interaction
      const dx = mouseInfluenceX - positions[i];
      const dy = mouseInfluenceY - positions[i + 1];
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 3) {
        const force = (3 - distance) / 3;
        positions[i] -= dx * force * 0.05;
        positions[i + 1] -= dy * force * 0.05;
      }

      // Device orientation interaction (mobile)
      if (orientation.alpha !== 0 || orientation.beta !== 0 || orientation.gamma !== 0) {
        positions[i] += orientationInfluenceX;
        positions[i + 1] += orientationInfluenceY;
      }

      // Boundaries
      if (Math.abs(positions[i]) > 10) velocities.current[i] *= -1;
      if (Math.abs(positions[i + 1]) > 10) velocities.current[i + 1] *= -1;
      if (Math.abs(positions[i + 2]) > 10) velocities.current[i + 2] *= -1;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotation
    mesh.current.rotation.x = state.clock.elapsedTime * 0.05;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.075;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Particle3D;
