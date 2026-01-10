import dayjs from "dayjs";
import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "../db/db";
import { GastosModel } from "../models";

type FiltroType = "dia" | "semana" | "mes" | "anio";

const getGastos = async (req: Request, res: Response) => {
  const filtro = req.query.filtro as FiltroType;

  let fechaInicio = dayjs();
  const fechaFin = dayjs().endOf("day").toDate();

  try {
    switch (filtro) {
      case "dia":
        fechaInicio = dayjs().subtract(1, "day");
        break;
      case "semana":
        fechaInicio = dayjs().subtract(7, "day");
        break;
      case "mes":
        fechaInicio = dayjs().subtract(30, "day");
        break;
      case "anio":
        fechaInicio = dayjs().subtract(1, "year");
        break;
      default:
        fechaInicio = dayjs("1970-01-01");
        break;
    }

    const gastos = await GastosModel.findAll({
      where: {
        fecha: {
          [Op.between]: [fechaInicio.toDate(), fechaFin],
        },
      },
      order: [["fecha", "DESC"]],
    });

    if (!Array.isArray(gastos)) {
      return res.status(404).send({
        message: "Hubo un error al intentar encontrar los gastos.",
      });
    }

    if (!gastos) {
      res.status(404).json({ message: "No se encontraron gastos." });
      return;
    }

    res.status(200).json(gastos);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los gastos.", error });
  }
};

const getGasto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const gasto = await GastosModel.findByPk(id);

    if (!gasto) {
      res.status(404).json({ message: "Gasto no encontrado." });
      return;
    }

    res.status(200).json(gasto);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo el gasto.", error });
  }
};

const createGasto = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  const { body } = req;

  try {
    const gasto = await GastosModel.create(body, { transaction });

    if (!gasto) {
      res.status(400).json({ message: "Error al crear el gasto." });
      return;
    }

    await transaction.commit();
    res.status(201).json(gasto);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error al crear el gasto.", error });
  }
};

const updateGasto = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  const { id } = req.params;
  const { body } = req;
  try {
    const [affectedCount] = await GastosModel.update(body, {
      where: { id },
      transaction,
    });

    if (affectedCount === 0) {
      res.status(404).json({ message: "Gasto no encontrado." });
      return;
    }

    const updatedGasto = await GastosModel.findByPk(id, { transaction });

    await transaction.commit();
    res.status(200).json(updatedGasto);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error al actualizar el gasto.", error });
  }
};

const deleteGasto = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  const { id } = req.params;

  try {
    const deletedCount = await GastosModel.destroy({
      where: { id },
      transaction,
    });
    if (deletedCount === 0) {
      res.status(404).json({ message: "Gasto no encontrado." });
      return;
    }

    await transaction.commit();
    res.status(200).json({ message: "Gasto eliminado correctamente." });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error al eliminar el gasto.", error });
  }
};

const restoreGasto = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  const { id } = req.params;
  try {
    const gasto = await GastosModel.findByPk(id, {
      paranoid: false,
      transaction,
    });

    if (!gasto) {
      res.status(404).json({ message: "Gasto no encontrado." });
      return;
    }

    await gasto.restore({ transaction });
    await transaction.commit();
    res.status(200).json({ message: "Gasto restaurado correctamente." });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error al restaurar el gasto.", error });
  }
};

const gastosBorrados = async (_req: Request, res: Response) => {
  try {
    const gastos = await GastosModel.findAll({
      where: {},
      paranoid: false,
    });
    const gastosEliminados = gastos.filter(
      (gasto) => gasto.dataValues.deletedAt !== null
    );
    res.status(200).json(gastosEliminados);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error obteniendo los gastos eliminados.", error });
  }
};

export default {
  getGastos,
  getGasto,
  createGasto,
  updateGasto,
  deleteGasto,
  restoreGasto,
  gastosBorrados,
};
