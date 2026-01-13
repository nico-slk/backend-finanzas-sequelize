import { Router } from "express";
import { FileRoute, GastoRoute, LinechartRoute, VentasRoute } from "./router";

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
  {
    url: "/dashboard",
    router: LinechartRoute,
  },
  {
    url: "/import-json",
    router: FileRoute,
  },
];
