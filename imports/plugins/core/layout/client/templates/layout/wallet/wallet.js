import { Accounts } from "/lib/collections";
import { Meteor } from "meteor/meteor";
import Alert from "sweetalert2";
import { formatPrice, i18next } from "/client/api";

Template.userwallet.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.autorun(() => {
    this.subscribe("LoggedInUserAccount");
    const accountDetails = Accounts.find(Meteor.userId()).fetch();
    this.state.set("accountDetails", accountDetails);
  });
});

Template.userwallet.events({
  "click #transfer-btn": (event) => {
    event.preventDefault();
    const amount = document.getElementById("transfer_amount").value;
    const userEmail = document.getElementById("transfer_email").value;

    const isValid = [amount, userEmail].filter((current) => {
      return current !== undefined && current !== "";
    }).length === 2;

    if (isValid) {
      Meteor.call("accounts/walletTransfer", userEmail, parseInt(amount, 10), (err, result) => {
        if (err) {
          Alert(i18next.t("app.error"),
            i18next.t("An error occured. Please check that you are connected to the internet and try again"),
            "error");
        }

        if (result) {
          Alert({
            title: i18next.t("app.success"),
            text: i18next.t("Your transaction was successful"),
            type: "success",
            timer: 1700
          }).catch(() => null);
        } else {
          Alert(i18next.t("app.error"),
            "An error during the transaction. Please check the email address and make sure you have sufficient balance for the transaction",
            "error");
        }
      });
    }
  }
});


Template.userwallet.helpers({
  accountDetails() {
  },
  getAccountBalance() {
    const accountDetails = Template.instance().state.get("accountDetails");
    return accountDetails[0].wallet.balance;
  },
  getTransactions() {
    const accountDetails = Template.instance().state.get("accountDetails");
    return accountDetails[0].wallet.transactions;
  },
  capitalizeFirstLetter(word) {
    return word.replace(/^[a-z]/, (match) => {
      return match.toUpperCase();
    });
  },
  formatDate(date) {
    return date.toString();
  },
  getCustomerEmail() {
    const accountDetails = Template.instance().state.get("accountDetails");
    return accountDetails[0].emails[0].address;
  },
  generateTransactionID() {
    return Random.id();
  },
  getTransactionAmount() {
    const amount = document.getElementById("topUp_amount").value();
    return parseInt(amount, 10);
  },
  handlePayment(transactionId) {
    HTTP.call("GET", `https://api.paystack.co/transaction/verify/${transactionId}`, {headers: {Authorization: "Bearer sk_test_4d6f0342aaa82bf364b4c2f4b9e70dbb57965f1d"}}, function (error, response) {
      if (error) {
        Alert(i18next.t("app.error"), "An error occured connecting to the server. Please try again", "error");
      } else {
        Meteor.call("account/createWalletTransaction", (response.data.data.amount / 100), "credit");
        Alert("Success", "Your account was topped up ", "success");
      }
    });
  }
});
