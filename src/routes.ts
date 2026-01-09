import { Router } from "express";
import ventaRouter from "./router/venta.route";

interface IApiPaths {
  url: string;
  router: Router;
}

export const ApiPaths: IApiPaths[] = [
  {
    url: "/venta",
    router: ventaRouter,
  },
];
