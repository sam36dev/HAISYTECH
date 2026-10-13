import { useEffect, useState } from 'react';

// Digita e apaga cada palavra da lista, em loop.
export function useTypewriter(words, enabled = true) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const word = words[index % words.length];
    let delay = deleting ? 35 : 70;

    if (!deleting && text === word) delay = 1800;
    else if (deleting && text === '') delay = 300;

    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, index, words, enabled]);

  return text;
}
