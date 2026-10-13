import { useEffect, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01ABCDEF';

// Revela o texto letra a letra, "decodificando" a partir de símbolos aleatórios.
export function useScramble(text, enabled = true, framesPerChar = 2) {
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!enabled) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOutput(text);
      return;
    }
    let frame = 0;
    let raf;
    const tick = () => {
      frame++;
      const revealed = Math.floor(frame / framesPerChar);
      let next = '';
      for (let i = 0; i < text.length; i++) {
        next += i < revealed || text[i] === ' ' ? text[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOutput(next);
      if (revealed < text.length) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, enabled, framesPerChar]);

  return output;
}
