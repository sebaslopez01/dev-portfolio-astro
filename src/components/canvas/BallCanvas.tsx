import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import type { ImageMetadata } from "astro";

import CanvasLoader from "../CanvasLoader";
import Ball from "./models/Ball";

interface BallCanvasProps {
  icon: ImageMetadata;
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
