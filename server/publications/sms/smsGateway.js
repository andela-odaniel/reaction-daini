import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { EJSON } from "meteor/ejson";
import { Reaction, Logger } from "/server/api";
import { SmsSetting } from "/lib/collections";

function smsDetails( shopId ) {
    const field = {
        shopId:shopId
    };

    const details = SmsSetting.find(field);

    return details;
};



Meteor.publish('SmsSettings', function ( shopId ) {
    check(shopId, String);

    if( !shopId ) {
        return this.ready();
    }

    return smsDetails(shopId);
});