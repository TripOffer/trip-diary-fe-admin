import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { URL, fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(configEnv => {
  // @ts-ignore
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as ImportMetaEnv
  console.log(viteEnv)
  return {
    plugins: [react(), tailwindcss()],
    base: viteEnv.VITE_APP_BASE_URL,
    server: {
      port: viteEnv.VITE_APP_PORT,
      proxy: {
        '/api': {
          target: viteEnv.VITE_SERVICE_PROXY_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./', import.meta.url)),
      },
    },
  }
})
