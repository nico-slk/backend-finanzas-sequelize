import { Router } from "express";
import { GastoRoute, VentasRoute } from "./router";

interface IApiPaths {
  url: string;
  router: Router;
}

export const ApiPaths: IApiPaths[] = [
  {
    url: "/venta",
    router: VentasRoute,
  },
  {
    url: "/gasto",
    router: GastoRoute,
  },
];
