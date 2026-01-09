import cors from "cors";
import express, { Application } from "express";
import { createServer, Server as ServerNode } from "http";
import Config from "../config/config";
import db from "../db/db";
import { ApiPaths } from "../routes";

export class Server {
  private app: Application;
  private port: string | number;
  ServerNode: ServerNode;

  constructor() {
    this.app = express();
    this.port = Config.port || 3000;
    this.dbConnection();
    this.middleware();
    this.routes();
    this.ServerNode = createServer(this.app);
  }

  async dbConnection() {
    try {
      await db.authenticate();
      await db
        .sync({ alter: true })
        .then(() => {
          console.log("Modelos sincronizados");
        })
        .catch((error) => {
          console.error("Error al sincronizar la base de datos:", error);
        });
      // await db.sync();
    } catch (error) {
      throw new Error(error as string);
    }
  }

  middleware() {
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
      })
    );

    this.app.use(express.json({ limit: "5mb" }));
    this.app.use(express.urlencoded({ limit: "10mb", extended: true }));
  }

  routes() {
    ApiPaths.forEach(({ url, router }) => {
      try {
        this.app.use(`/api${url}`, router);
        console.log(`✅ Ruta cargada: /api${url}`);
      } catch (error) {
        console.error(`❌ Error al cargar la ruta ${url}:`, error);
      }
    });
  }

  listen() {
    this.ServerNode.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}
