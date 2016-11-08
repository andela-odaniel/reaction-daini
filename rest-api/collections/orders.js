import { Orders } from "/lib/collections/collections";

export function CreateOrdersRoute(Api) {
  Api.addCollection(Orders);
}
