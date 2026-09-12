import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

/**
 * A soft, organic, low-poly form — not a flat sphere. MeshDistortMaterial
 * (drei) applies a continuous vertex-noise wobble on top of an icosahedron,
 * which reads as "gently alive" rather than a rotating ball. Kept to a
 * single mesh / single material for performance.
 */
export default function OrganicBlob({ pointer, reducedMotion, interactive, scale = 1 }) {
  const meshRef = useRef(null)
  const groupRef = useRef(null)

  useFrame((state, delta) => {
    if (reducedMotion) return // static pose — no idle animation at all
    const t = state.clock.elapsedTime

    if (meshRef.current) {
      // Slow continuous rotation
      meshRef.current.rotation.y += delta * 0.12
      meshRef.current.rotation.x += delta * 0.05
    }

    if (groupRef.current) {
      // Gentle float
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.12

      // Subtle reaction to pointer position, smoothly eased back to rest
      const targetX = interactive ? pointer.current.y * 0.15 : 0
      const targetZ = interactive ? -pointer.current.x * 0.15 : 0
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * Math.min(delta * 2, 1)
      groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * Math.min(delta * 2, 1)
    }
  })

  return (
    <group ref={groupRef} scale={scale}>
      <mesh ref={meshRef}>
        {/* Low detail level keeps the poly count small and render cost near-zero */}
        <icosahedronGeometry args={[1.35, 6]} />
        <MeshDistortMaterial
          color="#D97757"
          roughness={0.35}
          metalness={0.1}
          distort={reducedMotion ? 0.25 : 0.35}
          speed={reducedMotion ? 0 : 1.4}
        />
      </mesh>
    </group>
  )
}
