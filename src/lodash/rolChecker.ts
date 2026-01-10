import { NextFunction, Request, Response } from "express";

const rolCkecker = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;

  if (!user) {
    res.status(401).json({ msg: "Usuario no identificado" });
    return;
  }

  if (user.rol === "admin") {
    next();
  } else {
    res.status(403).json({
      msg: `Acceso denegado: El rol '${user.rol}' no tiene permisos para esta acción`,
    });
  }
};

export default { rolCkecker };
