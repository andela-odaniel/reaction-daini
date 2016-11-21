import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Notification } from "/lib/collections";

function getUserNotifications(userId) {
  const field = {
    to: userId
  };

  const notificationList = Notification.find(field);

  return notificationList;
}



Meteor.publish("NotificationList", function (userId, limit = "5") {
  check(userId, Match.OneOf(String, undefined, null));
  check(limit, String);

  if (!userId) {
    return this.ready();
  }

  return getUserNotifications(userId, limit);
});
