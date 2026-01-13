import { Request, Response } from "express";
import { LineChartService } from "../services";

const linecharts = (req: Request, res: Response) =>
  LineChartService.getLineChartData(req, res);

const importJsonFile = async (req: Request, res: Response) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "Por favor, sube un archivo JSON" });
    const result = await LineChartService.importJsonFile(req.file.path);
    res.json({
      message: "Importación completada con éxito",
      detalle: result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  linecharts,
  importJsonFile,
};
