import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Futuristic Robotic Character 3110',
  description: 'Advanced biomechanical heart-inspired robotic character from year 3110',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
