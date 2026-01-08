import { DataTypes } from "sequelize";
import db from "../db/db.js";

const Gasto = db.define("gasto", {
  id: {
    type: DataTypes.UUIDV4,
    autoIncrement: true,
    primaryKey: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

export default Gasto;
