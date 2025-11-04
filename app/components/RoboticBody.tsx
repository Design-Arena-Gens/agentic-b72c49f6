'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function RoboticBody() {
  const bodyRef = useRef<THREE.Group>(null)
  const platesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (platesRef.current) {
      platesRef.current.children.forEach((child, i) => {
        child.position.z = Math.sin(state.clock.elapsedTime * 2 + i) * 0.05
      })
    }
  })

  return (
    <group ref={bodyRef}>
      {/* Torso core */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 2, 8]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Chest plates */}
      <group ref={platesRef}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i / 6) * Math.PI * 2) * 0.9,
              0.3 - i * 0.2,
              Math.cos((i / 6) * Math.PI * 2) * 0.9
            ]}
            rotation={[0, (i / 6) * Math.PI * 2, 0]}
            castShadow
          >
            <boxGeometry args={[0.3, 0.15, 0.05]} />
            <meshStandardMaterial
              color="#0a84ff"
              metalness={1}
              roughness={0.1}
              emissive="#0a84ff"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Arms */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.2, 0, 0]}>
          {/* Shoulder */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <sphereGeometry args={[0.35, 16, 16]} />
            <meshStandardMaterial
              color="#1a1a2e"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Upper arm */}
          <mesh position={[0, -0.3, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.18, 0.8, 8]} />
            <meshStandardMaterial
              color="#0a84ff"
              metalness={1}
              roughness={0.1}
            />
          </mesh>

          {/* Elbow joint */}
          <mesh position={[0, -0.8, 0]} castShadow>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshStandardMaterial
              color="#00ffff"
              metalness={1}
              roughness={0}
              emissive="#00ffff"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Forearm */}
          <mesh position={[0, -1.3, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.15, 0.8, 8]} />
            <meshStandardMaterial
              color="#1a1a2e"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Hand */}
          <mesh position={[0, -1.8, 0]} castShadow>
            <boxGeometry args={[0.25, 0.3, 0.1]} />
            <meshStandardMaterial
              color="#0a84ff"
              metalness={1}
              roughness={0.1}
            />
          </mesh>

          {/* Fingers */}
          {Array.from({ length: 3 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                side * (i - 1) * 0.1,
                -2.1,
                0
              ]}
              castShadow
            >
              <cylinderGeometry args={[0.03, 0.03, 0.25, 6]} />
              <meshStandardMaterial
                color="#00ffff"
                metalness={1}
                roughness={0}
                emissive="#00ffff"
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Legs */}
      {[-0.4, 0.4].map((side, idx) => (
        <group key={idx} position={[side, -1.5, 0]}>
          {/* Hip */}
          <mesh position={[0, 0, 0]} castShadow>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
              color="#1a1a2e"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Thigh */}
          <mesh position={[0, -0.6, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.2, 1, 8]} />
            <meshStandardMaterial
              color="#0a84ff"
              metalness={1}
              roughness={0.1}
            />
          </mesh>

          {/* Knee */}
          <mesh position={[0, -1.2, 0]} castShadow>
            <sphereGeometry args={[0.24, 12, 12]} />
            <meshStandardMaterial
              color="#00ffff"
              metalness={1}
              roughness={0}
              emissive="#00ffff"
              emissiveIntensity={0.5}
            />
          </mesh>

          {/* Shin */}
          <mesh position={[0, -1.8, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.18, 1, 8]} />
            <meshStandardMaterial
              color="#1a1a2e"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Foot */}
          <mesh position={[0, -2.5, 0.15]} castShadow>
            <boxGeometry args={[0.3, 0.15, 0.5]} />
            <meshStandardMaterial
              color="#0a84ff"
              metalness={1}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#000510"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}
