import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Serves the /api/* serverless functions during `npm run dev`, so the assistant
 * works locally exactly as it does on Vercel. The Groq key stays server-side.
 */
function apiDevServer(env) {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      // GROQ_API_KEY is preferred; VITE_GROQ_API_KEY is accepted for older .env files.
      process.env.GROQ_API_KEY ??= env.GROQ_API_KEY || env.VITE_GROQ_API_KEY;
      for (const name of ['GROQ_CHAT_MODEL', 'RESEND_API_KEY', 'CONTACT_TO_EMAIL', 'CONTACT_FROM_EMAIL']) {
        if (env[name]) process.env[name] ??= env[name];
      }
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/api\/(chat|tts|contact)(?:\?|$)/);
        if (!match) return next();
        try {
          const { default: handler } = await server.ssrLoadModule(`/api/${match[1]}.js`);
          await handler(req, res);
        } catch (error) {
          server.config.logger.error(`[api/${match[1]}] ${error.stack || error}`);
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end('Internal error');
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), apiDevServer(loadEnv(mode, __dirname, ''))],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
}));
