import { Router } from "express";
import { VentaController } from "../controller";
import { RolCkecker, ValidJWT } from "../lodash";

const router = Router();

const { validJwt } = ValidJWT;
const { rolCkecker } = RolCkecker;

const {
  getVentas,
  createVenta,
  updateVenta,
  getVenta,
  deleteVenta,
  restoreVenta,
  ventasBorradas,
} = VentaController;

router.get("/", getVentas);
router.get("/deleted", validJwt, ventasBorradas);
router.get("/:id", getVenta);
router.post("/", validJwt, createVenta);
router.put("/:id", validJwt, updateVenta);
router.delete("/:id", [validJwt, rolCkecker], deleteVenta);
router.put("/restore/:id", [validJwt, rolCkecker], restoreVenta);

export default router;
