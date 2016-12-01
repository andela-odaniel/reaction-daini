import { SimpleSchema } from "meteor/aldeed:simple-schema";

/**
 * Reaction Schema for Inbound Analytics
 */
export const InboundAnalyticsEvents = new SimpleSchema({
  "brand": {
    type: String
  },
  "action": {
    type: String
  },
  "productId": {
    type: String
  },
  "user.id": {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function () {
      return Meteor.userId();
    }
  },
  "createdAt": {
    type: Date,
    autoValue: function () {
      return new Date;
    }
  }
});
