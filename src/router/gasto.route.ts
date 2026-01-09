import { Router } from "express";
import { GastoController } from "../controller";
// import { ValidJWT } from "../lodash";

const router = Router();

// const { validJwt } = ValidJWT;

const {
  getGastos,
  getGasto,
  createGasto,
  updateGasto,
  deleteGasto,
  restoreGasto,
  gastosBorrados,
} = GastoController;

router.get("/", getGastos);
router.get("/deleted", gastosBorrados);
router.get("/:id", getGasto);
router.post("/", createGasto);
router.put("/:id", updateGasto);
router.delete("/:id", deleteGasto);
router.put("/restore/:id", restoreGasto);

export default router;
