import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.mjs':  'application/javascript',
};

const server = createServer(async (req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url;
  // strip query strings
  url = url.split('?')[0];
  const filepath = join(__dirname, url);
  try {
    const data = await readFile(filepath);
    const ext = extname(filepath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`\n  ⚡  New Era dev server running at http://localhost:${PORT}\n`);
});
