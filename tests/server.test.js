import assert from "node:assert/strict";
import { createStaticServer } from "../server.js";

const server = createStaticServer();

await new Promise((resolve) => {
  server.listen(0, "127.0.0.1", resolve);
});

const address = server.address();
const port = typeof address === "object" && address ? address.port : 8080;

try {
  const response = await fetch(`http://127.0.0.1:${port}`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Mapa Interior/);
  assert.match(html, /Test de personalidad/);

  console.log("La prueba HTTP del servidor local ha pasado correctamente.");
} finally {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

