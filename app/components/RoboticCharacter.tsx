'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import HeartCore from './HeartCore'
import RoboticBody from './RoboticBody'
import RoboticHead from './RoboticHead'
import EnergyField from './EnergyField'

export default function RoboticCharacter() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <HeartCore />
      <RoboticBody />
      <RoboticHead />
      <EnergyField />
    </group>
  )
}
