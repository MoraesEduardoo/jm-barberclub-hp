import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import {
  getGooglePlaceReviews,
  GOOGLE_REVIEWS_REVALIDATE_SECONDS,
} from './lib/googleReviews.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.get('/api/google-reviews', async (_req, res) => {
    const payload = await getGooglePlaceReviews();
    res.setHeader(
      'Cache-Control',
      `public, max-age=${GOOGLE_REVIEWS_REVALIDATE_SECONDS}, stale-while-revalidate=3600`
    );
    res.json(payload);
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*path}', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`JM Barberclub server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
