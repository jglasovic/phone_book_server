import { Application } from 'express';
import * as http from 'http';
import * as cf from 'config';
import logError from './utils/error_log';
import App from './app';

class Server {
  private port: number = cf.get('port');
  private app: Application = new App().config();
  private server: http.Server;

  constructor() {
    this.app.set('port', this.port);
    this.server = http.createServer(this.app);
  }

  public main = (): void => {
    this.server.listen(this.port, this.ListenOn);

    // ---- error handling ----
    process.on('unhandledRejection', err => logError(err));
    process.on('uncaughtException', err => logError(err));
    this.app.use((err: any, req: any, res: any, next: any) => logError(err));
  };

  private ListenOn = (): void => {
    return console.log(`Server running!!! \nListening on port: ${this.port}`); // tslint:disable-line
  };
}

export default new Server().main();
