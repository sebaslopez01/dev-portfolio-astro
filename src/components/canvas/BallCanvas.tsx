import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import type { ImageMetadata } from "astro";

import CanvasLoader from "../CanvasLoader";

interface BallCanvasProps {
  icon: ImageMetadata;
}

interface BallProps {
  imgUrl: ImageMetadata;
}

function Ball({ imgUrl }: BallProps) {
  const [decal] = useTexture([imgUrl.src]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  );
}

export default function BallCanvas({ icon }: BallCanvasProps) {
  return (
    <Canvas frameloop="demand" dpr={[0.5, 2]}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
