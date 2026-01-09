import { Router } from "express";
import { VentaController } from "../controller";
// import { ValidJWT } from "../lodash";

const router = Router();

// const { validJwt } = ValidJWT;

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
router.get("/deleted", ventasBorradas);
router.get("/:id", getVenta);
router.post("/", createVenta);
router.put("/:id", updateVenta);
router.delete("/:id", deleteVenta);
router.put("/restore/:id", restoreVenta);

export default router;
