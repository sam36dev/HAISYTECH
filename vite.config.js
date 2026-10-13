import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // expõe ao site só as variáveis com esses prefixos (a chave do Web3Forms é pública)
  envPrefix: ['VITE_', 'WEB3FORMS_'],
  server: { port: 5173, open: true },
});
