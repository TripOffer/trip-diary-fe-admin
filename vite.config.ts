import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { URL, fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(configEnv => {
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
          rewrite: path => path,
          configure: proxy => {
            proxy.on('error', err => {
              console.log('proxy error', err)
            })
            proxy.on('proxyReq', (_, req) => {
              console.log('Sending Request to the Target:', req.method, req.url)
            })
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
            })
          },
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
