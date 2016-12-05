import { Packages } from "/lib/collections";

export const PaystackPackage = {
  accountOptions: function () {
    const settings = Packages.findOne({
      name: "reaction-paystack"
    }).settings;
    if (!settings.apiKey) {
      throw new Meteor.Error("403", "Invalid Credentials");
    }
    return settings.apiKey;
  },

  authorize: function (cardInfo, paymentInfo, callback) {
    Meteor.call("paystackSubmit", "authorize", cardInfo, paymentInfo, callback);
  }
};
