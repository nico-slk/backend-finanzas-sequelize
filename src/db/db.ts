import { Sequelize } from "sequelize";
import Config from "../config/config.js";

const db = new Sequelize(
  Config.nameDB as string,
  Config.userDB as string,
  Config.passwordDB as string,
  {
    host: Config.hostDB,
    port: Number(Config.portDB),
    dialect: "postgres",
    logging: false,
  }
);

export default db;
