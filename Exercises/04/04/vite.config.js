import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto hace que el servidor sea accesible externamente (importante para Docker/VMs)
    port: 5173, // Puerto estándar
    watch: {
      usePolling: true // Ayuda si estás en Windows con WSL o carpetas compartidas
    }
  }
})