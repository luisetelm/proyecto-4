import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

export function createStaticServer() {
  return http.createServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", `http://${request.headers.host}`);
      const requestedPath = decodeURIComponent(url.pathname);
      const safePath = path.normalize(requestedPath).replace(/^([.][.][\\/])+/, "");
      let filePath = path.join(__dirname, safePath === "/" ? "index.html" : safePath);

      if (existsSync(filePath)) {
        const fileStats = await stat(filePath);
        if (fileStats.isDirectory()) {
          filePath = path.join(filePath, "index.html");
        }
      }

      if (!existsSync(filePath)) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        response.end("No se encontró el recurso solicitado.");
        return;
      }

      const extension = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[extension] || "application/octet-stream";

      response.writeHead(200, { "Content-Type": contentType });
      createReadStream(filePath).pipe(response);
    } catch (error) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end(`Error interno del servidor: ${error.message}`);
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  const server = createStaticServer();

  server.listen(DEFAULT_PORT, () => {
    console.log(`Mapa Interior disponible en http://localhost:${DEFAULT_PORT}`);
  });
}

