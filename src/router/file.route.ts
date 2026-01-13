import { Router } from "express";
import { LineChartController } from "../controller";
import { RolCkecker, ValidJWT } from "../lodash";
import { upload } from "../lodash/multer";

const router = Router();

const { validJwt } = ValidJWT;
const { rolCkecker } = RolCkecker;

const { importJsonFile } = LineChartController;

router.post(
  "/a",
  [validJwt, rolCkecker, upload.single("archivo")],
  importJsonFile
);

export default router;
