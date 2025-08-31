import { useEffect, useRef } from 'react';

export default function EstrellasCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null); // 👈 Tipado explícito

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const estrellas = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
    }));

    const ajustarCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    ajustarCanvas();
    window.addEventListener('resize', ajustarCanvas);

    const animar = () => {
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      estrellas.forEach((estrella) => {
        ctx.beginPath();
        ctx.arc(estrella.x, estrella.y, estrella.r, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();

        estrella.x += estrella.dx;
        estrella.y += estrella.dy;

        if (estrella.x < 0 || estrella.x > canvas.width) estrella.dx *= -1;
        if (estrella.y < 0 || estrella.y > canvas.height) estrella.dy *= -1;
      });

      requestAnimationFrame(animar);
    };

    animar();

    return () => {
      window.removeEventListener('resize', ajustarCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="dark:hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        width: '100%',
        height: '100%',
      }}
    />
  );
}