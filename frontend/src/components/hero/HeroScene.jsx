import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'

const HeroScene = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.12
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.18
    }
  })

  return (
    <>
      {/* Key Light - Neon Cyan */}
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#22D3EE" />
      
      {/* Fill Light - Electric Blue */}
      <pointLight position={[-4, -4, -4]} intensity={0.7} color="#4F7DF3" />
      
      {/* Ambient Light */}
      <ambientLight intensity={0.25} />
      
      {/* Main 3D Sphere */}
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.2}>
        <MeshDistortMaterial
          color="#1a2942"
          attach="material"
          distort={0.4}
          speed={1.2}
          roughness={0.4}
          metalness={0.5}
        />
      </Sphere>
    </>
  )
}

export default HeroScene
