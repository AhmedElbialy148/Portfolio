/**
 * @file shared/ui/scene-3d/hero-scene.tsx
 * Floating wireframe 3D mesh for the hero background.
 */

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import type { Mesh } from "three"

/**
 * A slowly rotating wireframe icosahedron.
 */
function FloatingMesh() {
  const ref = useRef<Mesh>(null)

  useFrame(function rotateMesh(_state, delta) {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15
      ref.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#c9a227"
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  )
}

/** Props for {@link HeroScene}. */
export interface HeroSceneProps {
  /** Additional class names for the canvas wrapper. */
  className?: string
}

/**
 * Renders a lightweight 3D wireframe scene for the hero section.
 *
 * @param props - see {@link HeroSceneProps}
 */
export function HeroScene({ className }: HeroSceneProps) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 4, 4]} intensity={0.8} color="#c9a227" />
        <FloatingMesh />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
