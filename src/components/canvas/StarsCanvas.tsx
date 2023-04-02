import { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { inSphere } from "maath/random/dist/maath-random.cjs";

interface StarsProps {
  ref?: any;
}

function Stars({ ref }: StarsProps) {
  const pointRef = useRef<any>(null);
  const [pointsQuantity, setPointsQuantity] = useState(5000);

  const [sphere] = useState(() =>
    inSphere(new Float32Array(pointsQuantity), { radius: 1.2 })
  );

  useFrame((_state, delta) => {
    if (pointRef.current) {
      pointRef.current.rotation.x -= delta / 10;
      pointRef.current.rotation.y -= delta / 15;
    }
  });

  const handleMediaQueryChange = (event: MediaQueryListEvent) => {
    if (event.matches) {
      setPointsQuantity(500);
    } else {
      setPointsQuantity(5000);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
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
