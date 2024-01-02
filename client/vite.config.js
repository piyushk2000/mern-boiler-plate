import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      'https://vibe-vault-backend-git-main-piyushk2000.vercel.app/api': {
        target: 'https://vibe-vault-backend-git-main-piyushk2000.vercel.app/',
        secure: true,
      },
    },
  },
  plugins: [react()],
});
