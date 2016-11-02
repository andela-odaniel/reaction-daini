import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Reaction, Logger } from "/server/api";
import { ProductSearch, OrderSearch, AccountSearch } from "/lib/collections";

const supportedCollections = ["products", "orders", "accounts"];

function checkPriceRange(priceRange, shopId, searchTerm) {
  let findTerm = {};
  switch(priceRange) {
    case "10-55":
      findTerm = {
        "price.min":{ $gt: 10.00},
        "price.max":{ $lt: 55.00},
        shopId: shopId,
        $text: {$search: searchTerm}
      };
      break;
    case "55-100":
      findTerm = {
        "price.min":{ $gt: 55.00},
        "price.max":{ $lt: 100.00},
        shopId: shopId,
        $text: {$search: searchTerm}
      };
      break;
    case "55-100":
      findTerm = {
        "price.min":{ $gt: 55.00},
        "price.max":{ $lt: 100.00},
        shopId: shopId,
        $text: {$search: searchTerm}
      };
      break;
    case "100-500":
      findTerm = {
        "price.min":{ $gt: 100.00},
        "price.max":{ $lt: 500.00},
        shopId: shopId,
        $text: {$search: searchTerm}
      };
      break;
    case "500-1000":
      findTerm = {
        "price.min":{ $gt: 500.00},
        "price.max":{ $lt: 1000.00},
        shopId: shopId,
        $text: {$search: searchTerm}
      };
      break;
    case "1000-above":
      findTerm = {
        "price.min":{ $gt: 1000.00},
        "price.max":{ $lt: 10000000.00},
        shopId: shopId,
        $text: {$search: searchTerm}
      };
      break;
    default:
      findTerm = {
        shopId: shopId,
        $text: {$search: searchTerm}
      };
  }

  return findTerm;
}

function getProductFindTerm(searchTerm, searchTags,priceRange, userId) {
  console.log(priceRange);
  const shopId = Reaction.getShopId();
  const findTerm = checkPriceRange(priceRange, shopId, searchTerm);
  if (searchTags.length) {
    findTerm.hashtags = {$all: searchTags};
  }
  if (!Roles.userIsInRole(userId, ["admin", "owner"], shopId)) {
    findTerm.isVisible = true;
  }
  return findTerm;
}

export const getResults = {};

getResults.products = function (searchTerm, facets,priceRange, maxResults, userId) {
  const searchTags = facets || [];
  const findTerm = getProductFindTerm(searchTerm, searchTags,priceRange, userId);
  const productResults = ProductSearch.find(findTerm,
    {
      fields: {
        score: {$meta: "textScore"},
        title: 1,
        hashtags: 1,
        description: 1,
        handle: 1,
        price:1
      },
      sort: {score: {$meta: "textScore"}},
      limit: maxResults
    }
  );
  return productResults;
};

getResults.orders = function (searchTerm, facets, maxResults, userId) {
  let orderResults;
  const searchPhone = _.replace(searchTerm, /\D/g, "");
  const shopId = Reaction.getShopId();
  const findTerm = {
    $and: [
      { shopId: shopId },
      {$or: [
        { _id: searchTerm },
        { userEmails: {
          $regex: searchTerm,
          $options: "i"
        } },
        { shippingName: {
          $regex: searchTerm,
          $options: "i"
        } },
        { billingName: {
          $regex: searchTerm,
          $options: "i"
        } },
        { billingPhone: {
          $regex: "^" + searchPhone + "$",
          $options: "i"
        } },
        { shippingPhone: {
          $regex: "^" + searchPhone + "$",
          $options: "i"
        } }
      ] }
    ]};
  if (Reaction.hasPermission("orders", userId)) {
    orderResults = OrderSearch.find(findTerm, { limit: maxResults });
    Logger.debug(`Found ${orderResults.count()} orders searching for ${searchTerm}`);
  }
  return orderResults;
};

getResults.accounts = function (searchTerm, facets, maxResults, userId) {
  let accountResults;
  const shopId = Reaction.getShopId();
  const searchPhone = _.replace(searchTerm, /\D/g, "");
  if (Reaction.hasPermission("reaction-accounts", userId)) {
    const findTerm = {
      $and: [
        {shopId: shopId},
        {$or: [
          { emails: {
            $regex: searchTerm,
            $options: "i"
          } },
          { "profile.firstName": {
            $regex: "^" + searchTerm + "$",
            $options: "i"
          } },
          { "profile.lastName": {
            $regex: "^" + searchTerm + "$",
            $options: "i"
          } },
          { "profile.phone": {
            $regex: "^" + searchPhone + "$",
            $options: "i"
          } }
        ] }
      ]};
    accountResults = AccountSearch.find(findTerm, {
      limit: maxResults
    });
    Logger.debug(`Found ${accountResults.count()} accounts searching for ${searchTerm}`);
  }
  return accountResults;
};

Meteor.publish("SearchResults", function (collection, searchTerm, facets, priceRange = "", maxResults = 99) {
  check(collection, String);
  check(collection, Match.Where((coll) => {
    return _.includes(supportedCollections, coll);
  }));
  check(priceRange, Match.OneOf(String, undefined, null));
  check(searchTerm, Match.Optional(String));
  check(facets, Match.OneOf(Array, undefined));
  Logger.debug(`Returning search results on ${collection}. SearchTerm: |${searchTerm}|. Facets: |${facets}|.`);
  if (!searchTerm) {
    return this.ready();
  }
  return getResults[collection](searchTerm, facets,priceRange, maxResults, this.userId);
});
