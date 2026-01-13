import { Router } from "express";
import { LineChartController } from "../controller";

const router = Router();

const { linecharts } = LineChartController;

router.get("/line-chart", linecharts);

export default router;
