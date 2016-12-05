/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Cart, Shops, Accounts } from "/lib/collections";
import { PaystackPackage } from "../../lib/api";
import { PaystackSchema } from "../../lib/collections/schemas";
import { formatPriceString } from "/client/api";

import "./paystack.html";

// let submitting = false;

// function uiEnd(template, buttonText) {
//   template.$(":input").removeAttr("disabled");
//   template.$("#btn-complete-order").text(buttonText);
//   return template.$("#btn-processing").addClass("hidden");
// }

// function paymentAlert(errorMessage) {
//   return $(".alert").removeClass("hidden").text(errorMessage);
// }

// function hidePaymentAlert() {
//   return $(".alert").addClass("hidden").text("");
// }

// function handleExampleSubmitError(error) {
//   const serverError = error !== null ? error.message : void 0;
//   if (serverError) {
//     return paymentAlert("Oops! " + serverError);
//   } else if (error) {
//     return paymentAlert("Oops! " + error, null, 4);
//   }
// }


Template.paystackForm.helpers({
  PaystackSchema() {
    return PaystackSchema;
  },
  generateTransactionID() {
    return Random.id();
  },
  getOrderPrice() {
    const cart = Cart.findOne();
    const shop = Shops.find({_id: cart.shopId}).fetch();
    const exchangeRate =  shop[0].currencies.NGN.rate;
    const orderPrice = cart.cartTotal() * exchangeRate;
    const localPrice = parseInt(orderPrice * 100, 10);
    return localPrice;
  },
  getCustomerEmail() {
    const user = Meteor.users.findOne(Meteor.userId());
    return user.emails[0].address;
  },
  handlePayment(transactionId) {
    HTTP.call("GET", `https://api.paystack.co/transaction/verify/${transactionId}`, {headers: {Authorization: "Bearer sk_test_4d6f0342aaa82bf364b4c2f4b9e70dbb57965f1d"}}, function (error, response) {
      if (error) {
        // console.log(error)
      } else {
        const paystackResponse = response.data.data;
        paystackMethod = {
          processor: "Paystack",
          storedCard: paystackResponse.authorization.last4,
          method: "Paystack",
          transactionId: paystackResponse.reference,
          currency: paystackResponse.currency,
          amount: paystackResponse.amount,
          status: paystackResponse.status,
          mode: "authorize",
          createdAt: new Date(),
          transactions: []
        };
        const transactionObject = {
          amount: (paystackResponse.amount / 100),
          transactionId: paystackResponse.reference,
          currency: paystackResponse.currency
        };
        paystackMethod.transactions.push(transactionObject);
        Meteor.call("cart/submitPayment", paystackMethod);
      }
    });
  }
});
