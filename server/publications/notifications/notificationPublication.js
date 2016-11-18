import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { EJSON } from "meteor/ejson";
import { Reaction, Logger } from "/server/api";
import { Notification } from "/lib/collections";

function getUserNotifications( userId, limit) {
    const field = {
        to:userId
    };

    let notificationList = Notification.find(field);

    return notificationList;
};



Meteor.publish('NotificationList', function ( userId, limit="5") {
    console.log(typeof userId);
    check(userId, Match.OneOf(String, undefined, null));
    check(limit, String);

    if( !userId ) {
        return this.ready();
    }

    return getUserNotifications(userId, limit);
});