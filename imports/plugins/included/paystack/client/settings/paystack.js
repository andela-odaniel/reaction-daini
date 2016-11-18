import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Packages } from "/lib/collections";
import { PaystackPackageConfig } from "../../lib/collections/schemas";

import "./paystack.html";


Template.exampleSettings.helpers({
  PaystackPackageConfig() {
    return PaystackPackageConfig;
  },
  packageData() {
    return Packages.findOne({
      name: "reaction-paystack",
      shopId: Reaction.getShopId()
    });
  }
});


Template.example.helpers({
  packageData: function () {
    return Packages.findOne({
      name: "reaction-paystack",
      shopId: Reaction.getShopId()
    });
  }
});

Template.example.events({
  "click [data-event-action=showExampleSettings]": function () {
    Reaction.showActionView();
  }
});

AutoForm.hooks({
  "example-update-form": {
    onSuccess: function () {
      Alerts.removeSeen();
      return Alerts.add("Paystack settings saved.", "success");
    },
    onError: function (operation, error) {
      Alerts.removeSeen();
      return Alerts.add("Paystack settings update failed. " + error, "danger");
    }
  }
});
