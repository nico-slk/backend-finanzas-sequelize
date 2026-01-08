import { DataTypes } from "sequelize";
import db from "../db/db";

const Gasto = db.define(
  "Gasto",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
  },
  {
    tableName: "gastos",
    timestamps: false,
  }
);

export default Gasto;
