Meteor.methods({
  /**
   * Submit a card for Authorization
   * @param  {Object} currencyBase the currecy to get rates for
   * @return {Object} the exchange rates normalized
   */
  "getExchangeRates": function (currencyBase) {
    check(currencyBase, String);
    const openExchangeRateAppId = "306c78e3cdd94ed085ac738e0ef791d2";
    const rateUrl =
        `https://openexchangerates.org/api/latest.json?base=${
        currencyBase}&app_id=${openExchangeRateAppId}`;

    // You will get an error if you use a base other than USD with
    // an Open Exchange Rates API Free Account
    HTTP.call("GET", rateUrl, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
  }
});
