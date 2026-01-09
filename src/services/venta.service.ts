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
        fechaInicio = dayjs().startOf("day");
        break;
      case "semana":
        fechaInicio = dayjs().startOf("week");
        break;
      case "mes":
        fechaInicio = dayjs().startOf("month");
        break;
      case "anio":
        fechaInicio = dayjs().startOf("year");
        break;
      default:
        fechaInicio = dayjs("1970-01-01");
        break;
    }

    const ventas = VentasModel.findAll({
      where: {
        fecha: {
          [Op.gte]: fechaInicio.toDate(),
          [Op.lte]: fechaFin,
        },
      },
    });

    if (!Array.isArray(ventas)) {
      return res.status(404).send({
        message: "Hubo un error al intentar encontrar las venta.",
      });
    }

    res.status(200).send(ventas);
  } catch (error) {}
};

const createVenta = async (req: Request, res: Response) => {
  const transaction = await db.transaction();
  const { fecha, categoria, monto, descripcion } = req.body;

  try {
    const newVenta = await VentasModel.create({
      fecha,
      categoria,
      monto,
      descripcion,
    });

    if (!newVenta) {
      return res.status(400).send({
        message: "Hubo un error al intentar crear la venta.",
      });
    }

    res.status(201).send(newVenta);
    await transaction.commit();
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
    });

    if (affectedCount === 0) {
      return res.status(404).json({ message: "Venta no encontrada." });
    }

    const ventaActualizada = await VentasModel.findByPk(id);
    res.status(200).json(ventaActualizada);
    await transaction.commit();
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
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Venta no encontrada." });
    }

    res.status(200).json({ message: "Venta eliminada correctamente." });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ message: "Error al eliminar la venta." });
  }
};

export default {
  getVentas,
  getVenta,
  createVenta,
  updateVenta,
  deleteVenta,
};
