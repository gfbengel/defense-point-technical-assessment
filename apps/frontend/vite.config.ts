import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, mode === 'development'
    ? process.cwd().replace('/apps/frontend', '')
    : process.cwd())

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    server: {
      open: true,
      host: true,
      port: Number(env.VITE_PORT),
    },
    preview: {
      open: false,
      port: Number(env.VITE_PORT),
    },
    resolve: {
      alias: {

        '@': '/src',
        '@lib': '/src/lib',
        '@components': '/src/view/components',
      },
    },
  }
})
