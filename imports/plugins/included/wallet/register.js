/* eslint camelcase: 0 */
import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Wallet",
  name: "wallet",
  icon: "fa fa-credit-card-alt",
  autoEnable: true,
  settings: {
    mode: false,
    apiKey: ""
  },
  registry: [
    // Payment form for checkout
    {
      template: "walletPaymentForm",
      provides: "paymentMethod"
    }
  ]
});
