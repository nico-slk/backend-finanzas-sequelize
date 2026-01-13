import { Request, Response } from "express";
import fs from "fs";
import { col, fn } from "sequelize";
import sequelize from "../db/db";
import { GastosModel, VentasModel } from "../models";

const getLineChartData = async (req: Request, res: Response) => {
  try {
    const ventas = await VentasModel.findAll({
      attributes: [
        [fn("DATE", col("fecha")), "fecha_solo"],
        [fn("SUM", col("monto")), "total"],
      ],
      group: [fn("DATE", col("fecha"))],
      order: [[fn("DATE", col("fecha")), "ASC"]],
    });

    const gastos = await GastosModel.findAll({
      attributes: [
        [fn("DATE", col("fecha")), "fecha_solo"],
        [fn("SUM", col("monto")), "total"],
      ],
      group: [fn("DATE", col("fecha"))],
    });

    const dataMap = new Map();

    ventas.forEach((v: any) => {
      const f = v.get("fecha_solo");
      dataMap.set(f, {
        name: f,
        ventas: parseFloat(v.get("total")),
        gastos: 0,
      });
    });

    gastos.forEach((g: any) => {
      const f = g.get("fecha_solo");
      if (dataMap.has(f)) {
        dataMap.get(f).gastos = parseFloat(g.get("total"));
      } else {
        dataMap.set(f, {
          name: f,
          ventas: 0,
          gastos: parseFloat(g.get("total")),
        });
      }
    });

    const result = Array.from(dataMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const importJsonFile = async (filePath: string) => {
  const t = await sequelize.transaction();

  try {
    const rawData = fs.readFileSync(filePath, "utf8");
    const { ventas, gastos } = JSON.parse(rawData);

    if (ventas) await VentasModel.bulkCreate(ventas, { transaction: t });
    if (gastos) await GastosModel.bulkCreate(gastos, { transaction: t });

    await t.commit();

    fs.unlinkSync(filePath);

    return { ventas: ventas?.length || 0, gastos: gastos?.length || 0 };
  } catch (error) {
    await t.rollback();
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    throw error;
  }
};

export default {
  getLineChartData,
  importJsonFile,
};
