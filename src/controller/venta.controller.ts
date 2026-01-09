import { Request, Response } from "express";
import { VentaService } from "../services";

const getVentas = async (req: Request, res: Response) =>
  VentaService.getVentas(req, res);

const createVenta = async (req: Request, res: Response) =>
  VentaService.createVenta(req, res);

const updateVenta = async (req: Request, res: Response) =>
  VentaService.updateVenta(req, res);

const getVenta = async (req: Request, res: Response) =>
  VentaService.getVenta(req, res);

const deleteVenta = async (req: Request, res: Response) =>
  VentaService.deleteVenta(req, res);

const restoreVenta = async (req: Request, res: Response) =>
  VentaService.restoreVenta(req, res);

const ventasBorradas = async (req: Request, res: Response) =>
  VentaService.ventasBorradas(req, res);

export default {
  getVentas,
  createVenta,
  updateVenta,
  getVenta,
  deleteVenta,
  restoreVenta,
  ventasBorradas,
};
