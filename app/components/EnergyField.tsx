'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function EnergyField() {
  const fieldRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 200
  const particles = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 5
    particles[i * 3 + 1] = (Math.random() - 0.5) * 8
    particles[i * 3 + 2] = (Math.random() - 0.5) * 5
  }

  useFrame((state) => {
    if (fieldRef.current) {
      fieldRef.current.rotation.y += 0.002
      const material = fieldRef.current.material as THREE.MeshBasicMaterial
      material.opacity = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.15
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002

        if (positions[i3 + 1] > 4) {
          positions[i3 + 1] = -4
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      {/* Energy field shield */}
      <mesh ref={fieldRef}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>

      {/* Energy particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00ffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Energy rings */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, -2 + i * 1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[2 - i * 0.2, 0.02, 16, 100]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00ffff" : "#ff0055"}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}
