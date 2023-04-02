import { Html, useProgress } from "@react-three/drei";

export default function CanvasLoader() {
  const { progress } = useProgress();

  return (
    <Html as="div" center className="flex flex-col justify-center items-center">
      <span className="canvas-loader"></span>
      <p className="text-[14px] text-[#f1f1f1] font-extrabold mt-[40]">
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
}
