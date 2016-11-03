import { Inventory } from "/lib/collections/collections";

export function CreateInventoryRoute(Api) {
  Api.addCollection(Inventory);
}
