import { useEffect, useRef } from 'react';

// Cursor customizado: um ponto preciso + um anel que segue com atraso.
// Só liga em mouse de verdade (não em telas touch).
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      root.classList.remove('cursor-hidden');
    };
    const onOver = (e) => {
      const target = e.target.closest?.('a, button, input, textarea, [data-hover]');
      ring.current.classList.toggle('is-hover', Boolean(target));
    };
    const onDown = () => ring.current.classList.add('is-down');
    const onUp = () => ring.current.classList.remove('is-down');
    const onLeave = () => root.classList.add('cursor-hidden');

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-cursor', 'cursor-hidden');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
