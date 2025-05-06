import { AngularNodeAppEngine, createNodeRequestHandler, isMainModule, writeResponseToNodeResponse } from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Configuración de las carpetas de dist
const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Función que retorna los parámetros de prerenderizado
 * Especificamos las rutas con parámetros dinámicos como /sections/conciertos/:id
 */
function getPrerenderParams() {
  return [
    { route: '/sections/conciertos/1', id: '1' },
    { route: '/sections/conciertos/2', id: '2' },
    { route: '/sections/payment/1', id: '1' },
    { route: '/sections/payment/2', id: '2' },
    // Agrega más rutas y parámetros según sea necesario
  ];
}

/**
 * Configurar Express para servir archivos estáticos desde la carpeta del navegador (browser)
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Ruta para manejar todas las demás solicitudes y renderizar la aplicación Angular.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Función de prerenderizado para las rutas dinámicas
 * Se utiliza `getPrerenderParams` para obtener las rutas que se deben prerenderizar.
 */
app.get('/prerender', (req, res) => {
  const routes = getPrerenderParams();
  // Aquí puedes usar tu lógica de prerenderizado si es necesario, o bien manejar rutas dinámicas
  res.json(routes);
});

/**
 * Iniciar el servidor si este módulo es el principal
 * El servidor escucha en el puerto definido por la variable de entorno `PORT`, o en el puerto 4000 por defecto.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Handler de solicitud utilizado por Angular CLI (para dev-server y durante la construcción) o Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
