'use client'

import { useEffect, useState } from 'react'

export default function HUD() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      fontFamily: 'monospace',
      color: '#00ffff',
      textShadow: '0 0 10px #00ffff'
    }}>
      {/* Top left info */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        fontSize: '14px'
      }}>
        <div style={{ marginBottom: '10px', borderBottom: '1px solid #00ffff', paddingBottom: '5px' }}>
          YEAR 3110 BIOTECH SYSTEMS
        </div>
        <div>STATUS: OPERATIONAL</div>
        <div>HEART CORE: ACTIVE</div>
        <div>NEURAL LINK: STABLE</div>
        <div>ENERGY: 98.7%</div>
      </div>

      {/* Top right time */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '14px',
        textAlign: 'right'
      }}>
        <div style={{ fontSize: '18px', color: '#ff0055', textShadow: '0 0 10px #ff0055' }}>
          {time.getFullYear() + 1085}.{String(time.getMonth() + 1).padStart(2, '0')}.{String(time.getDate()).padStart(2, '0')}
        </div>
        <div>{String(time.getHours()).padStart(2, '0')}:{String(time.getMinutes()).padStart(2, '0')}:{String(time.getSeconds()).padStart(2, '0')}</div>
      </div>

      {/* Bottom left stats */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        fontSize: '12px',
        opacity: 0.7
      }}>
        <div>QUANTUM PROCESSORS: 512 CORES</div>
        <div>NEURAL NETWORK: AI-OMEGA v47.3</div>
        <div>BIOMECH INTEGRATION: 100%</div>
        <div>SHIELD INTEGRITY: 95.4%</div>
      </div>

      {/* Bottom right controls */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        fontSize: '12px',
        textAlign: 'right',
        opacity: 0.7
      }}>
        <div>DRAG TO ROTATE</div>
        <div>SCROLL TO ZOOM</div>
      </div>

      {/* Center crosshair */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40px',
        height: '40px',
        border: '1px solid #00ffff',
        borderRadius: '50%',
        opacity: 0.3
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '4px',
          background: '#ff0055',
          borderRadius: '50%',
          boxShadow: '0 0 10px #ff0055'
        }} />
      </div>

      {/* Scan lines effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
        pointerEvents: 'none'
      }} />
    </div>
  )
}
