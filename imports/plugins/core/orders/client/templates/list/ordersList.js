import moment from "moment";
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Orders, Shops, Audio, Video, Software, Book, Products } from "/lib/collections";

/**
 * dashboardOrdersList helpers
 *
 */
Template.dashboardOrdersList.helpers({
  orderStatus(expectedStatus) {
    return this.workflow.status.substr(this.workflow.status.indexOf("/") + 1) === expectedStatus;
  },
  showCancel() {
    const status = this.workflow.status.substr(this.workflow.status.indexOf("/") + 1);
    return (status !== "cancelled") && (status !== "completed");
  },
  showDigitalFileDownload() {
    const productId = this.items[0].productId;
    const sub = Meteor.subscribe("Product", productId);
    if (sub.ready()) {
      const product = Products.findOne(productId);

      if (product.digitalInfo.category === "audio") {
        Meteor.subscribe(product.digitalInfo.category, productId).ready();
        const result = Audio.findOne({
          "metadata.productId": productId
        });
        console.log(result);
        return result;
      }
      if (product.digitalInfo.category === "video") {
        Meteor.subscribe(product.digitalInfo.category, productId).ready();
        const result = Video.findOne({
          "metadata.productId": productId
        });
        console.log(result);
        return result;
      }
      if (product.digitalInfo.category === "book") {
        Meteor.subscribe(product.digitalInfo.category, productId).ready();
        const result = Book.findOne({
          "metadata.productId": productId
        });
        console.log(result);
        return result;
      }
      if (product.digitalInfo.category === "software") {
        Meteor.subscribe(product.digitalInfo.category, productId).ready();
        const result = Software.findOne({
          "metadata.productId": productId
        });
        console.log(result);
        return result;
      }

      return product.productType;
    }
    return null;
  },
  orders(data) {
    if (data.hash.data) {
      return data.hash.data;
    }
    return Orders.find({
      userId: Meteor.userId()
    }, {
      sort: {
        createdAt: -1
      },
      limit: 25
    });
  },
  orderAge() {
    return moment(this.createdAt).fromNow();
  },
  shipmentTracking() {
    return this.shipping[0].shipmentMethod.tracking;
  },
  shopName() {
    const shop = Shops.findOne(this.shopId);
    return shop !== null ? shop.name : void 0;
  }
});

/**
 * dashboardOrdersList events
 *
 */
Template.dashboardOrdersList.events({
  "click .cancel-order": function () {
    Meteor.call("orders/cancel", this.cartId, this.email, function (err) {
      if (err) {
        alert("sorry your order cannot be cancelled at this moment");
      } else {
        alert("Your order has been cancelled successfully");
      }
    });
  }
});
