'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function HeartCore() {
  const heartRef = useRef<THREE.Group>(null)
  const pulseRef = useRef<THREE.Mesh>(null)

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape()
    const x = 0, y = 0
    shape.moveTo(x + 0.5, y + 0.5)
    shape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y)
    shape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7)
    shape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9)
    shape.bezierCurveTo(x + 1.2, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7)
    shape.bezierCurveTo(x + 1.6, y + 0.7, x + 1.6, y, x + 1.0, y)
    shape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5)
    return shape
  }, [])

  const heartGeometry = useMemo(() => {
    return new THREE.ExtrudeGeometry(heartShape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 10,
      steps: 2,
      bevelSize: 0.1,
      bevelThickness: 0.1
    })
  }, [heartShape])

  useFrame((state) => {
    if (heartRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 1
      heartRef.current.scale.setScalar(pulse * 0.8)
      heartRef.current.rotation.y += 0.01
    }

    if (pulseRef.current) {
      const scale = Math.sin(state.clock.elapsedTime * 3) * 0.3 + 1.2
      pulseRef.current.scale.setScalar(scale)
      const material = pulseRef.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.3 - (scale - 1) * 0.3
    }
  })

  return (
    <group position={[0, 0.5, 0]}>
      <group ref={heartRef} rotation={[Math.PI, 0, 0]} position={[-0.5, 0, 0]}>
        <mesh geometry={heartGeometry} castShadow>
          <meshStandardMaterial
            color="#ff0055"
            metalness={0.9}
            roughness={0.1}
            emissive="#ff0055"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Inner glow */}
        <mesh geometry={heartGeometry} scale={0.95}>
          <meshBasicMaterial
            color="#ff3388"
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Energy lines */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              Math.sin((i / 8) * Math.PI * 2) * 0.8,
              Math.cos((i / 8) * Math.PI * 2) * 0.8,
              0
            ]}
          >
            <cylinderGeometry args={[0.02, 0.02, 1.5, 6]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={2}
              metalness={1}
              roughness={0}
            />
          </mesh>
        ))}
      </group>

      {/* Pulse ring */}
      <mesh ref={pulseRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshBasicMaterial
          color="#ff0055"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}
