'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function RoboticHead() {
  const headRef = useRef<THREE.Group>(null)
  const eyesRef = useRef<THREE.Group>(null)
  const scannerRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }

    if (eyesRef.current) {
      eyesRef.current.children.forEach((eye) => {
        const material = (eye as THREE.Mesh).material as THREE.MeshStandardMaterial
        material.emissiveIntensity = Math.sin(state.clock.elapsedTime * 4) * 0.3 + 1
      })
    }

    if (scannerRef.current) {
      scannerRef.current.rotation.z += 0.03
    }
  })

  return (
    <group ref={headRef} position={[0, 1.8, 0]}>
      {/* Head base */}
      <mesh castShadow>
        <boxGeometry args={[1, 1.2, 0.9]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Face plate */}
      <mesh position={[0, 0, 0.46]} castShadow>
        <boxGeometry args={[0.9, 1.1, 0.05]} />
        <meshStandardMaterial
          color="#0a84ff"
          metalness={1}
          roughness={0.1}
          emissive="#0a84ff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Eyes */}
      <group ref={eyesRef}>
        {[-0.22, 0.22].map((x, i) => (
          <group key={i} position={[x, 0.15, 0.5]}>
            {/* Eye outer */}
            <mesh castShadow>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color="#000"
                metalness={1}
                roughness={0}
              />
            </mesh>

            {/* Eye glow */}
            <mesh>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={2}
                metalness={0}
                roughness={0}
              />
            </mesh>

            {/* Eye ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.13, 0.02, 8, 24]} />
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={1}
                metalness={1}
                roughness={0}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Scanner visor */}
      <mesh ref={scannerRef} position={[0, 0.15, 0.48]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.5, 0.01, 3, 50, Math.PI * 0.5]} />
        <meshBasicMaterial
          color="#ff0055"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Antenna */}
      <group position={[0, 0.7, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
          <meshStandardMaterial
            color="#0a84ff"
            metalness={1}
            roughness={0}
          />
        </mesh>

        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color="#ff0055"
            emissive="#ff0055"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </mesh>

        {/* Signal rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh
            key={i}
            position={[0, 0.25, 0]}
            scale={1 + i * 0.5}
          >
            <torusGeometry args={[0.15, 0.01, 8, 24]} />
            <meshBasicMaterial
              color="#ff0055"
              transparent
              opacity={0.4 - i * 0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Jaw/mouth area */}
      <mesh position={[0, -0.4, 0.45]} castShadow>
        <boxGeometry args={[0.5, 0.2, 0.05]} />
        <meshStandardMaterial
          color="#000"
          metalness={1}
          roughness={0.3}
        />
      </mesh>

      {/* Mouth glow lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[-0.2 + i * 0.1, -0.4, 0.48]}
        >
          <boxGeometry args={[0.02, 0.15, 0.01]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Neck */}
      <mesh position={[0, -0.8, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 8]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}
