import { CreateAccountsRoute } from "./collections/accounts";
import { CreateAnalyticsEventsRoute } from "./collections/analyticsEvents";
import { CreateAssetsRoute } from "./collections/assets";
import { CreateCartRoute } from "./collections/cart";
import { CreateDiscountsRoute } from "./collections/discounts";
import { CreateEmailsRoute } from "./collections/emails";
import { CreateInventoryRoute } from "./collections/inventory";
import { CreateOrdersRoute } from "./collections/orders";
import { CreatePackagesRoute } from "./collections/packages";
import { CreateProductsRoute } from "./collections/products";
import { CreateRevisionsRoute } from "./collections/revisions";
import { CreateShippingRoute } from "./collections/shipping";
import { CreateShopsRoute } from "./collections/shops";
import { CreateTagsRoute } from "./collections/tags";
import { CreateTemplatesRoute } from "./collections/templates";
import { CreateThemesRoute } from "./collections/themes";
import { CreateTranslationsRoute } from "./collections/translations";
import { Meteor } from "meteor/meteor";


if (Meteor.isServer) {
const Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true
});

export default function () {
  CreateAccountsRoute(Api);
  CreateAnalyticsEventsRoute(Api);
  CreateAssetsRoute(Api);
  CreateCartRoute(Api);
  CreateDiscountsRoute(Api);
  CreateEmailsRoute(Api);
  CreateInventoryRoute(Api);
  CreateOrdersRoute(Api);
  CreatePackagesRoute(Api);
  CreateProductsRoute(Api);
  CreateRevisionsRoute(Api);
  CreateShippingRoute(Api);
  CreateShopsRoute(Api);
  CreateTagsRoute(Api);
  CreateTemplatesRoute(Api);
  CreateThemesRoute(Api);
  CreateTranslationsRoute(Api);
}
}

