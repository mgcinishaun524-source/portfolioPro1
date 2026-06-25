'use client'

import { Suspense, lazy, useState } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          {!isLoaded && <span className="loader"></span>}
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={() => setIsLoaded(true)}
      />
    </Suspense>
  )
}
