import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://vercel.com/piyushk2000/vibe-vault-backend',
        secure: false,
      },
    },
  },
  plugins: [react()],
});
