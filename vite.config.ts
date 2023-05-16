import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/desarrollo-web-i-actividad-i",
  plugins: [react()],
})
