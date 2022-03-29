import './cleanup';

import { App } from './app';
import { Router } from './router';
import { Server } from './server';

function main() {
  const router = new Router();
  const app = new App(router);
  const server = new Server(app.getInstance());

  server.start(3000);

  return server;
}

export default main();
