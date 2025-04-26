import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const loadEnvDir = mode === 'development' ? process.cwd().replace('/apps/frontend', '') : process.cwd()

  const env = loadEnv(mode, loadEnvDir)

  return {
    plugins: [
      react(),
      tailwindcss(),
      TanStackRouterVite({
        autoCodeSplitting: true,
        routesDirectory: './src/router/routes',
        generatedRouteTree: './src/routeTree.gen.ts',
      }),
    ],
    envDir: loadEnvDir,

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
