/* Servidor estático mínimo, sin dependencias, para `npm run dev`. */
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 5173;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  let ruta;
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    ruta = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400).end("Bad request");
    return;
  }

  if (ruta === "/" || ruta === "/index.html") ruta = "/index.html";

  const archivo = path.resolve(ROOT, `.${ruta}`);
  if (!archivo.startsWith(ROOT + path.sep) && archivo !== ROOT) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  fs.stat(archivo, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("404 Not Found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mime[path.extname(archivo).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    fs.createReadStream(archivo).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Cuestionario MRUV listo en http://localhost:${PORT}`);
  console.log("Pulsa Ctrl+C para detener el servidor.");
});
