import { Emails } from "/lib/collections/collections";

export function CreateEmailsRoute(Api) {
  Api.addCollection(Emails);
}
