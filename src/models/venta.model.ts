import { DataTypes } from "sequelize";
import db from "../db/db";

const Venta = db.define(
  "Venta",
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
    tableName: "ventas",
    timestamps: false,
  }
);

export default Venta;
