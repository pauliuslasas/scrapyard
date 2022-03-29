import http, { createServer } from 'http';

export class Server {
  private http: http.Server;
  constructor(private app: http.RequestListener) {
    this.http = createServer(app);
  }

  start(port: number): void {
    this.http.listen(port);
  }

  close(): void {
    this.http.close();
  }
}
