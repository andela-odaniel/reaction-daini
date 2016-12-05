import { HTTP } from "meteor/http";

Paystack = {
  authorize: function (transactionType, cardData, paymentData) {
    const result = HTTP.call("GET", "https://got-quotes.herokuapp.com/quotes");
    console.log(result.data.quote);
    if (transactionType === "authorize") {
      const results = {
        success: true,
        id: Random.id(),
        cardNumber: cardData.number.slice(-4),
        amount: paymentData.total,
        currency: "USD"
      };
      return results;
    }
    return {
      success: false
    };
  },
  capture: function (authorizationId, amount) {
    return {
      authorizationId: authorizationId,
      amount: amount,
      success: true
    };
  },
  refund: function (transactionId, amount) {
    return {
      sucess: true,
      transactionId: transactionId,
      amount: amount
    };
  },
  listRefunds: function (transactionId) {
    return {
      transactionId: transactionId,
      refunds: [
        {
          type: "refund",
          amount: 3.99,
          created: 1454034562000,
          currency: "usd",
          raw: {}
        }
      ]
    };
  }
};

// This is the "wrapper" functions you should write in order to make your code more
// testable. You can either mirror the API calls or normalize them to the authorize/capture/refund/refunds
// that Reaction is expecting
export const PaystackAPI = {};
PaystackAPI.methods = {};

export const cardSchema = new SimpleSchema({
  number: { type: String },
  name: { type: String },
  cvv2: { type: String },
  expireMonth: { type: String },
  expireYear: { type: String },
  type: { type: String }
});

paymentDataSchema = new SimpleSchema({
  total: { type: String },
  currency: { type: String }
});


PaystackAPI.methods.authorize = new ValidatedMethod({
  name: "PaystackAPI.methods.authorize",
  validate: new SimpleSchema({
    transactionType: { type: String },
    cardData: { type: cardSchema },
    paymentData: { type: paymentDataSchema }
  }).validator(),
  run({ transactionType, cardData, paymentData }) {
    const results = Paystack.authorize(transactionType, cardData, paymentData);
    return results;
  }
});


PaystackAPI.methods.capture = new ValidatedMethod({
  name: "PaystackAPI.methods.capture",
  validate: new SimpleSchema({
    authorizationId: { type: String },
    amount: { type: Number, decimal: true }
  }).validator(),
  run(args) {
    const transactionId = args.authorizationId;
    const amount = args.amount;
    const results = Paystack.capture(transactionId, amount);
    return results;
  }
});


PaystackAPI.methods.refund = new ValidatedMethod({
  name: "PaystackAPI.methods.refund",
  validate: new SimpleSchema({
    transactionId: { type: String },
    amount: { type: Number, decimal: true  }
  }).validator(),
  run(args) {
    const transactionId = args.transactionId;
    const amount = args.amount;
    const results = Paystack.refund(transactionId, amount);
    return results;
  }
});


PaystackAPI.methods.refunds = new ValidatedMethod({
  name: "PaystackAPI.methods.refunds",
  validate: new SimpleSchema({
    transactionId: { type: String }
  }).validator(),
  run(args) {
    const { transactionId } = args;
    const results = Paystack.listRefunds(transactionId);
    return results;
  }
});
