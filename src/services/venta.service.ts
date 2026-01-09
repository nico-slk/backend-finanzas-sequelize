import dayjs from "dayjs";
import { Request, Response } from "express";
import { Op } from "sequelize";
import db from "../db/db";
import { VentasModel } from "../models";

type FiltroType = "dia" | "semana" | "mes" | "anio";

const getVentas = async (req: Request, res: Response) => {
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

    const ventas = await VentasModel.findAll({
      where: {
        fecha: {
          [Op.between]: [fechaInicio.toDate(), fechaFin],
        },
      },
      order: [["fecha", "DESC"]],
    });

    if (!Array.isArray(ventas)) {
      return res.status(404).send({
        message: "Hubo un error al intentar encontrar las venta.",
      });
    }

    res.status(200).send(ventas);
  } catch (error) {
    res.status(500).send({
      message: "Error del servidor al buscar las ventas.",
    });
  }
};

const createVenta = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  const { categoria, monto, descripcion } = req.body;

  try {
    const newVenta = await VentasModel.create(
      {
        categoria,
        monto,
        descripcion,
      },
      { transaction }
    );

    if (!newVenta) {
      return res.status(400).send({
        message: "Hubo un error al intentar crear la venta.",
      });
    }

    await transaction.commit();
    res.status(201).send(newVenta);
  } catch (error) {
    await transaction.rollback();
    res.status(500).send({
      message: "Error del servidor al crear la venta.",
    });
  }
};

const getVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const venta = await VentasModel.findByPk(id);

    if (!venta) {
      return res.status(404).send({
        message: "Venta no encontrada.",
      });
    }
    res.status(200).send(venta);
  } catch (error) {
    res.status(500).send({
      message: "Error del servidor al buscar la venta.",
    });
  }
};

const updateVenta = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  const { id } = req.params;

  try {
    const [affectedCount] = await VentasModel.update(req.body, {
      where: { id },
      transaction,
    });

    if (affectedCount === 0) {
      return res.status(404).json({ message: "Venta no encontrada." });
    }

    const ventaActualizada = await VentasModel.findByPk(id);
    await transaction.commit();
    res.status(200).json(ventaActualizada);
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error al actualizar la venta." });
  }
};

const deleteVenta = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  const { id } = req.params;

  try {
    const deletedCount = await VentasModel.destroy({
      where: { id },
      transaction,
    });

    if (deletedCount === 0) {
      await transaction.rollback();
      return res.status(404).json({ message: "Venta no encontrada." });
    }

    await transaction.commit();
    return res.status(200).json({ message: "Venta eliminada correctamente." });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: "Error al eliminar la venta." });
  }
};

const restoreVenta = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  const { id } = req.params;

  try {
    const venta = await VentasModel.findByPk(id, {
      paranoid: false,
      transaction,
    });

    if (!venta) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ message: "No se encontró el registro para restaurar." });
    }

    if (venta.dataValues.deletedAt === null) {
      await transaction.rollback();
      return res.status(400).json({ message: "La venta no está eliminada." });
    }

    await venta.restore({ transaction });

    await transaction.commit();
    return res.status(200).json({ message: "Venta restaurada correctamente." });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: "Error al restaurar la venta." });
  }
};

const ventasBorradas = async (req: Request, res: Response) => {
  try {
    const ventasBorradas = await VentasModel.findAll({
      where: {
        deletedAt: { [Op.ne]: null },
      },
      paranoid: false,
    });
    res.status(200).json(ventasBorradas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las ventas borradas." });
  }
};

export default {
  getVentas,
  getVenta,
  createVenta,
  updateVenta,
  deleteVenta,
  restoreVenta,
  ventasBorradas,
};
