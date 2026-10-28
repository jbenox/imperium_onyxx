import react from '@vitejs/plugin-react'
import { timingSafeEqual } from 'node:crypto'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'onyx-demo-auth',
      configureServer(server) {
        const username = process.env.ONYX_DEMO_USERNAME
        const password = process.env.ONYX_DEMO_PASSWORD

        if (!username || !password) return

        server.middlewares.use((request, response, next) => {
          const authorization = request.headers.authorization ?? ''
          const supplied = authorization.startsWith('Basic ')
            ? Buffer.from(authorization.slice(6), 'base64')
            : Buffer.alloc(0)
          const expected = Buffer.from(`${username}:${password}`)
          const authorized = supplied.length === expected.length && timingSafeEqual(supplied, expected)

          if (!authorized) {
            response.writeHead(401, {
              'Content-Type': 'text/plain; charset=utf-8',
              'WWW-Authenticate': 'Basic realm="ONYX demo"',
            })
            response.end('Authentification requise')
            return
          }

          next()
        })
      },
    },
  ],
  server: {
    allowedHosts: [
      '.ngrok-free.app',
      '.ngrok.app',
      '.ngrok.io',
      ...(process.env.ONYX_DEMO_HOST ? [process.env.ONYX_DEMO_HOST] : []),
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
