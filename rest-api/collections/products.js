import { Products } from "/lib/collections/collections";

export function CreateProductsRoute(Api) {
  Api.addCollection(Products);
}
