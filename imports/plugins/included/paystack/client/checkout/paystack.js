/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Cart, Shops, Accounts } from "/lib/collections";
import { PaystackPackage } from "../../lib/api";
import { PaystackSchema } from "../../lib/collections/schemas";
import { formatPriceString } from "/client/api";

import "./paystack.html";

let submitting = false;

function uiEnd(template, buttonText) {
  template.$(":input").removeAttr("disabled");
  template.$("#btn-complete-order").text(buttonText);
  return template.$("#btn-processing").addClass("hidden");
}

function paymentAlert(errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
}

function hidePaymentAlert() {
  return $(".alert").addClass("hidden").text("");
}

function handleExampleSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 4);
  }
}


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
  submitPayment() {
    console.log("submit payment called");
    const subFunc = function (response) { console.log(response); };
    console.log(typeof subFunc);
    return subFunc;
  },
  handlePayment(transactionId) {
    HTTP.call("GET", `https://api.paystack.co/transaction/verify/${transactionId}`, {headers: {Authorization: "Bearer sk_test_4d6f0342aaa82bf364b4c2f4b9e70dbb57965f1d"}}, function (error, response) {
      if (error) {
        console.log(error);
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
        console.log(paystackMethod);
        Meteor.call("cart/submitPayment", paystackMethod);
      }
    });
  }
});

// AutoForm.addHooks("paystack-form", {
//   onSubmit: function (doc) {
//     submitting = true;
//     const template = this.template;
//     hidePaymentAlert();
//     const form = {
//       name: doc.payerName,
//       number: doc.cardNumber,
//       expireMonth: doc.expireMonth,
//       expireYear: doc.expireYear,
//       cvv2: doc.cvv,
//       type: Reaction.getCardType(doc.cardNumber)
//     };
//     const storedCard = form.type.charAt(0).toUpperCase() + form.type.slice(1) + " " + doc.cardNumber.slice(-4);

//     PaystackPackage.authorize(form, {
//       total: Cart.findOne().cartTotal(),
//       currency: Shops.findOne().currency
//     }, function (error, transaction) {
//       submitting = false;
//       let paymentMethod;
//       if (error) {
//         handleExampleSubmitError(error);
//         uiEnd(template, "Resubmit payment");
//       } else {
//         if (transaction.saved === true) {
//           submitting = false;
//           paymentMethod = {
//             processor: "Example",
//             storedCard: storedCard,
//             method: "Example Payment",
//             transactionId: transaction.transactionId,
//             currency: transaction.currency,
//             amount: transaction.amount,
//             status: transaction.status,
//             mode: "authorize",
//             createdAt: new Date(),
//             transactions: []
//           };
//           paymentMethod.transactions.push(transaction.response);
//           Meteor.call("cart/submitPayment", paymentMethod);
//         } else {
//           handleExampleSubmitError(transaction.error);
//           uiEnd(template, "Resubmit payment");
//         }
//       }
//     });
//     return false;
//   },
//   beginSubmit: function () {
//     this.template.$(":input").attr("disabled", true);
//     this.template.$("#btn-complete-order").text("Submitting ");
//     return this.template.$("#btn-processing").removeClass("hidden");
//   },
//   endSubmit: function () {
//     if (!submitting) {
//       return uiEnd(this.template, "Complete your order");
//     }
//   }
// });
