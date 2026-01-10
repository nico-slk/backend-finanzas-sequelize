import { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import config from "../config/config.js";

const { secret } = config;

const validJwt = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    secret || "test",
    (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(403).json({
          msg: "Failed to authenticate token",
          error: err.message,
        });
      }

      (req as any).user = decoded;

      next();
    }
  );
};

export default { validJwt };
