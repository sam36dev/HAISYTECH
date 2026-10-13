// Pequenos atalhos compartilhados entre componentes (terminal, paleta, nav...).

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function openProject(id) {
  scrollToSection('projetos');
  window.dispatchEvent(new CustomEvent('ds:open-project', { detail: id }));
}

// Serviços escolhidos vão pré-marcados para o formulário de contato
export function requestServices(ids) {
  scrollToSection('contato');
  window.dispatchEvent(new CustomEvent('ds:request-services', { detail: ids }));
}

export function triggerMatrix() {
  window.dispatchEvent(new CustomEvent('ds:matrix'));
}

export function openPalette() {
  window.dispatchEvent(new CustomEvent('ds:palette'));
}

export function normalize(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

// Hash curtinho e determinístico, estilo commit do git
export function shortHash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}
