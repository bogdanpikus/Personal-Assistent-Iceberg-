import { useEffect, useRef } from "react";

export default function CanvasAnimation() {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const xRef = useRef(0); // положение шарика

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 200;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Шарик
      ctx.beginPath();
      ctx.arc(xRef.current, 100, 20, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();

      xRef.current += 2;
      if (xRef.current > canvas.width) xRef.current = 0;

      requestRef.current = requestAnimationFrame(draw);
    };

    draw(); // старт анимации

    return () => cancelAnimationFrame(requestRef.current); // остановка при размонтировании
  }, []);

  return <canvas ref={canvasRef} />;
}
