import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  BakeShadows,
  OrbitControls,
  Preload,
} from "@react-three/drei";

import CanvasLoader from "../CanvasLoader";
import Earth from "./models/Earth";

export default function EarthCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  const handleMediaQueryChange = (event: MediaQueryListEvent) => {
    setIsMobile(event.matches);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={[0.5, 2]}
      shadows={!isMobile}
      camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <BakeShadows />
        <AdaptiveDpr pixelated />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
