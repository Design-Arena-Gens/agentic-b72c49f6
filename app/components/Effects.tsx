'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Effects() {
  const lightRef1 = useRef<THREE.PointLight>(null)
  const lightRef2 = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef1.current) {
      lightRef1.current.intensity = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 1.5
      lightRef1.current.position.x = Math.sin(state.clock.elapsedTime) * 3
    }

    if (lightRef2.current) {
      lightRef2.current.intensity = Math.cos(state.clock.elapsedTime * 3) * 0.5 + 1.5
      lightRef2.current.position.x = Math.cos(state.clock.elapsedTime) * 3
    }
  })

  return (
    <>
      <pointLight
        ref={lightRef1}
        position={[3, 2, 2]}
        intensity={1.5}
        color="#00ffff"
        distance={10}
      />
      <pointLight
        ref={lightRef2}
        position={[-3, 2, 2]}
        intensity={1.5}
        color="#ff0055"
        distance={10}
      />
    </>
  )
}
