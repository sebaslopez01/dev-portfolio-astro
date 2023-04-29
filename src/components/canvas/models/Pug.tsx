import { useGLTF } from "@react-three/drei";

interface PugProps {
  isMobile: boolean;
}

export default function Pug({ isMobile }: PugProps) {
  const pug = useGLTF("/pug/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.35} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={pug.scene}
        scale={isMobile ? 0.02 : 0.03}
        position={isMobile ? [0, -2, 0] : [0, -4, 0]}
        rotation={[-0.01, 1.8, 0]}
      />
    </mesh>
  );
}

useGLTF.preload("/pug/scene.gltf");
