import { Accounts } from "/lib/collections/collections";

export function CreateAccountsRoute(Api) {
  Api.addCollection(Accounts);
}
