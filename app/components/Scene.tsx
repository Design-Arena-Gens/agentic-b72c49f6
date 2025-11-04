'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import RoboticCharacter from './RoboticCharacter'
import Effects from './Effects'
import HUD from './HUD'

export default function Scene() {
  return (
    <>
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#000510']} />
        <fog attach="fog" args={['#000510', 10, 50]} />

        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0080" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ffff" />

        <RoboticCharacter />

        <Environment preset="night" />

        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
        />

        <Effects />
      </Canvas>

      <HUD />
    </>
  )
}
