'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./components/Scene'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      color: '#0ff',
      fontSize: '24px',
      fontFamily: 'monospace'
    }}>
      INITIALIZING YEAR 3110 SYSTEMS...
    </div>
  )
})

export default function Home() {
  return <Scene />
}
