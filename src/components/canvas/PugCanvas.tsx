import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  BakeShadows,
  OrbitControls,
  Preload,
} from "@react-three/drei";

import CanvasLoader from "../CanvasLoader";
import Pug from "./models/Pug";

export default function PugCanvas() {
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
      camera={{ position: [20, 3, 5], fov: 25 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Pug isMobile={isMobile} />
        <BakeShadows />
        <AdaptiveDpr pixelated />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
