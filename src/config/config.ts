import { config } from "dotenv";

config();

const Config = {
  port: process.env.PORT,
  hostDB: process.env.DB_HOST || "",
  userDB: process.env.DB_USER || "",
  portDB: process.env.DB_PORT || "",
  nameDB: process.env.DB_NAME || "",
  passwordDB: process.env.DB_PASSWORD || "",
  secret: process.env.AUTH_JWT_SECRET,
};

export default Config;
