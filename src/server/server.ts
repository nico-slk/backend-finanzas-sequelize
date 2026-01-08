import express, { Application } from "express";
import { createServer, Server as ServerNode } from "http";
import Config from "../config/config.js";

export class Server {
  private app: Application;
  private port: string | number;
  ServerNode: ServerNode;

  constructor() {
    this.app = express();
    this.port = Config.port || 3000;
    this.middleware();
    this.routes();
    this.ServerNode = createServer(this.app);
  }

  middleware() {}

  routes() {}

  listen() {
    this.ServerNode.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}
