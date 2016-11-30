import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Cart, Accounts } from "/lib/collections";
import { i18next, formatPrice } from "/client/api";
import Alert from "sweetalert2";

import "./wallet.html";

Template.walletPaymentForm.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.autorun(() => {
    this.subscribe("LoggedInUserAccount");
    const accountDetails = Accounts.find(Meteor.userId()).fetch();
    this.state.set("accountDetails", accountDetails);
  });
});

Template.walletPaymentForm.helpers({
  getAccountBalance() {
    const accountDetails = Template.instance().state.get("accountDetails");
    return accountDetails[0].wallet.balance;
  }
});

Template.walletPaymentForm.events({
  "click #wallet-pay-btn": (event) => {
    console.log("clicked the payment button");
    event.preventDefault();
    const cart = Cart.findOne();
    const orderPrice = parseInt(cart.cartTotal(), 10);
    const balance = Template.instance().state.get("accountDetails")[0].wallet.balance;
    console.log(balance);
    console.log(orderPrice);
    // const balance = 0;
    if (orderPrice > balance) {
      Alert(i18next.t("app.error"), "Your wallet balance is not sufficient for this transaction", "error");
    } else {
      Meteor.call("account/createWalletTransaction", orderPrice, "debit", function (err, res) {
        if (err) {
          Alert(i18next.t("app.error"), "An error occured. Could not contact the server", "error");            
        } else {
          if (res) {
            const transactionId = Random.id();
            paymentMethod = {
              processor: "Wallet",
              storedCard: "",
              method: "Wallet",
              transactionId: transactionId,
              currency: "USD",
              amount: orderPrice,
              status: "passed",
              mode: "authorize",
              createdAt: new Date(),
              transactions: []
            };
            const transactionObject = {
              amount: orderPrice,
              transactionId: transactionId,
              currency: "USD"
            };
            paymentMethod.transactions.push(transactionObject);
            Meteor.call("cart/submitPayment", paymentMethod);
          } else {
            Alert(i18next.t("app.error"), "Transaction failed. Please confirm your balance is enough for this transaction and try again.", "error");      
          }
        }
      });
    }
  }
});
