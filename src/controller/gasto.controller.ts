import { Request, Response } from "express";
import { GastoService } from "../services";

const getGastos = async (req: Request, res: Response) =>
  GastoService.getGastos(req, res);

const getGasto = async (req: Request, res: Response) =>
  GastoService.getGasto(req, res);

const createGasto = async (req: Request, res: Response) =>
  GastoService.createGasto(req, res);

const updateGasto = async (req: Request, res: Response) =>
  GastoService.updateGasto(req, res);

const deleteGasto = async (req: Request, res: Response) =>
  GastoService.deleteGasto(req, res);

const restoreGasto = async (req: Request, res: Response) =>
  GastoService.restoreGasto(req, res);

const gastosBorrados = async (req: Request, res: Response) =>
  GastoService.gastosBorrados(req, res);

export default {
  getGastos,
  getGasto,
  createGasto,
  updateGasto,
  deleteGasto,
  restoreGasto,
  gastosBorrados,
};
