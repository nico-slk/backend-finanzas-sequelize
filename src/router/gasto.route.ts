import { Router } from "express";
import { GastoController } from "../controller";
import { RolCkecker, ValidJWT } from "../lodash";

const router = Router();

const { validJwt } = ValidJWT;
const { rolCkecker } = RolCkecker;

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
router.get("/deleted", validJwt, gastosBorrados);
router.get("/:id", getGasto);
router.post("/", validJwt, createGasto);
router.put("/:id", validJwt, updateGasto);
router.delete("/:id", [validJwt, rolCkecker], deleteGasto);
router.put("/restore/:id", [validJwt, rolCkecker], restoreGasto);

export default router;
