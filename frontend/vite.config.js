import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: { '/api': process.env.API_URL || 'http://localhost:3000' },
    watch: { usePolling: true }, // Windows + Doker ต้องใช้ polling จึงเห็นไฟล์ที่แก้
  },
});
