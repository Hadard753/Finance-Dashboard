import * as express from 'express';
import * as path from 'path';

/**
 * Mounts react using Server-Side-Rendering (Recommended for SEO)
 */
export function mountReactSSR(expressApp: express.Application): void {
  // The dist folder of compiled react
  const DIST_FOLDER = path.join(process.cwd(), 'dist/react');

  // The compiled server file (react-src/server.ts) path
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const reactApp = require(path.join(DIST_FOLDER, 'server/main'));

  // Init the ng-app using SSR
  reactApp.init(expressApp, path.join(DIST_FOLDER, '/browser'));
}

/**
 * Mounts react as is with no SSR.
 */
export function mountReact(expressApp: express.Application): void {
  const DIST_FOLDER = path.join(process.cwd(), 'dist/react/browser');
  // Point static path to React distribution
  expressApp.use(express.static(DIST_FOLDER));

  // Deliver the React distribution
  expressApp.get('*', function(req, res) {
    res.sendFile(path.join(DIST_FOLDER, 'index.html'));
  });
}
