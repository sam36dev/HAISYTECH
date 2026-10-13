import { useEffect, useRef, useState } from 'react';

const GLYPHS = 'アカサタナハマヤラワ0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
const DURATION = 7000;

// Easter egg: chuva estilo Matrix (código Konami ou comando "matrix" no terminal).
export default function MatrixRain({ onDone }) {
  const ref = useRef(null);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const size = 16;
    let raf;
    let drops = [];

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      drops = Array.from({ length: Math.ceil(innerWidth / size) }, () => Math.random() * -50);
    };
    resize();

    let last = 0;
    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 45) return;
      last = t;
      ctx.fillStyle = 'rgba(5, 6, 10, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${size}px "JetBrains Mono Variable", monospace`;
      drops.forEach((y, i) => {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        ctx.fillStyle = Math.random() > 0.96 ? '#e7ecf5' : i % 7 === 0 ? '#00e5ff' : '#b6ff3b';
        ctx.fillText(ch, i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    };
    raf = requestAnimationFrame(draw);

    let closing = false;
    const close = () => {
      if (closing) return;
      closing = true;
      setLeaving(true);
      setTimeout(() => done.current(), 600);
    };
    const timer = setTimeout(close, DURATION);
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('resize', resize);
    window.addEventListener('keydown', onKey);
    canvas.addEventListener('click', close);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('click', close);
    };
  }, []);

  return (
    <div className={`matrix ${leaving ? 'is-leaving' : ''}`}>
      <canvas ref={ref} />
      <p className="matrix-msg mono">follow the white rabbit 🐇 · clique ou esc para sair</p>
    </div>
  );
}
