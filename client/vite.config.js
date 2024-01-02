import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://vibe-vault-9675.vercel.app',
        secure: true,
      },
    },
  },
  plugins: [react()],
});
