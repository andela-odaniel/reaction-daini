import { HTTP } from "meteor/http";
import { Reaction } from "/client/api";

export function isLocaleNaira() {
  const currentLocale = Reaction.Locale.get();
  return currentLocale.locale.currency !== "NGN";
}

// export function convertToNaira() {
//   const currentLocale = Reaction.Locale.get();
//   const localeCurrencyCode = currentLocale.locale.currency;

//   try {
//     const exchangeRates = Meteor.call("getExchangeRates", localeCurrencyCode);
//   } catch (error) {

//   }
//     // conversionRate = rateResults.rates.NGN;
//     // console.log(conversionRate);
// }
