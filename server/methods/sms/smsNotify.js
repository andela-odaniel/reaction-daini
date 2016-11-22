import * as SmsMethods from "./smsMethods";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "sms/settings": SmsMethods.smsSettings,
  "sms/saveDetails":SmsMethods.saveDetails,
  "sms/sendSms": SmsMethods.sendSms
});
