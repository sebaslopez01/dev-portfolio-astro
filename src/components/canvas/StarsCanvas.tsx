import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { inSphere } from "maath/random/dist/maath-random.cjs";
import type { TypedArray } from "maath/dist/declarations/src/ctypes";

function Stars() {
  const pointRef = useRef<any>(null);

  const [sphere, setSphere] = useState<TypedArray | null>(null);

  useFrame((_state, delta) => {
    if (pointRef.current) {
      pointRef.current.rotation.x -= delta / 10;
      pointRef.current.rotation.y -= delta / 15;
    }
  });

  const handleMediaQueryChange = (matches: boolean) => {
    if (matches) {
      setSphere(inSphere(new Float32Array(100), { radius: 1.2 }));
    } else {
      setSphere(inSphere(new Float32Array(5000), { radius: 1.2 }));
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    handleMediaQueryChange(mediaQuery.matches);

    mediaQuery.addEventListener("change", (e) =>
      handleMediaQueryChange(e.matches)
    );

    return () => {
      mediaQuery.removeEventListener("change", (e) =>
        handleMediaQueryChange(e.matches)
      );
    };
  }, []);

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={pointRef}
        positions={sphere as Float32Array}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function StarsCanvas() {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas dpr={[0.5, 2]} camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
