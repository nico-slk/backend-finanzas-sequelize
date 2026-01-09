import { Router } from "express";
import { VentaController } from "../controller";
// import { ValidJWT } from "../lodash";

const router = Router();

// const { validJwt } = ValidJWT;

const { getVentas, createVenta, updateVenta, getVenta, deleteVenta } =
  VentaController;

router.get("/", getVentas);
router.get("/:id", getVenta);
router.post("/:id", createVenta);
router.put("/:id", updateVenta);
router.delete("/:id", deleteVenta);

export default router;
