import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
// import { InboundAnalyticsEvents } from "/lib/collections";

Meteor.methods({
  /**
   * inbound-analytics/capture
   * @summary records a shopper's event'
   * @param data contains information about shopper activity
   */
  "inbound-analytics/capture": function (data) {
    check(data, Object);
    data.createdAt = Date.now();

    console.log(data);
    // @TODO save captured data to database.
  }

});
