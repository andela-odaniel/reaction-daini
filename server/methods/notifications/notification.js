import * as NotificationMethods from "./notificationMethods";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "notification/send": NotificationMethods.sendNotification,
  "notification/markAsRead": NotificationMethods.markAsRead
});
