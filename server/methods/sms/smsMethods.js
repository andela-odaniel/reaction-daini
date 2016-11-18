import { Logger } from "/server/api";
import { SmsSetting } from "/lib/collections";
import Jusibe from 'jusibe';
import { Meteor } from 'meteor/meteor';
import Twilio from 'twilio';
import { check } from "meteor/check";

export function smsSettings(appId, appToken, phone, shopId) {
    check(appId, String);
    check(appToken, String);
    check(phone, String);

    const field = {
        appId,
        appToken,
        phone,
        shopId
    };

    SmsSettings.insert(field);
};

export function saveDetails(settings, shopId) {
    check(settings, {
        appId: String,
        appToken: String,
        phone: String,
        smsProvider:String,
    });
    check(shopId, String);

    const field = {
        appId:settings.appId,
        appToken:settings.appToken,
        phone:settings.phone,
        shopId: shopId,
        smsProvider:settings.smsProvider
    }

    if( SmsSetting.findOne({shopId:shopId}) ) {
        SmsSetting.update({shopId:shopId}, field);
    } else {
        SmsSetting.insert(field);
    }
}

export function sendSms(phone, message, shopId) {
    check(phone, String);
    check(message, String);
    check(shopId, String);
    const sub = Meteor.subscribe("SmsSettings", shopId).ready();

    var settingResult = SmsSetting.find().fetch();

    if(settingResult[0].smsProvider == 'twilio') {
        const appId = settingResult[0].appId;
        const myPhone = settingResult[0].phone;
        const appToken = settingResult[0].appToken;
        let client = new Twilio(appId, appToken);
        // console.log(client);

        client.sendSms({
            to:phone,
            from:myPhone,
            body:message
        }, (err, responseData) => {
            if(err) {
                return err
            }
        });
    } else if(settingResult[0].smsProvider == 'jusibe') {
        const appId = settingResult[0].appId;
        const myPhone = settingResult[0].phone;
        const appToken = settingResult[0].appToken;
        let client = new Jusibe(appId, appToken);

        let payload = {
            to:phone,
            from:'Reaction Commerce',
            message:message
        };

        client.sendSMS(payload, (err, res) => {
            if(err) {
                console.log(err);
            }
            console.log(res.statusCode);
        });
    }
}