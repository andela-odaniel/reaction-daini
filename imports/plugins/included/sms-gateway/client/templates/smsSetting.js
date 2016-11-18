import SmsSettings from '../components/smsSettings';
import { SmsSetting } from '/lib/collections';
import { Meteor } from "meteor/meteor";
import Alert from "sweetalert2";
import { Reaction, i18next } from "/client/api";
import actions from "../actions";
    

function saveSettings(settings, callback) {
    const { appId, appToken, phone } = settings;

    if (!appId || !appToken || !phone) {
      Alert(i18next.t("app.error"), i18next.t("mail.alerts.missingService"), "error");
      return callback();
    }
    const shopId = Reaction.getShopId();
    Meteor.call("sms/saveDetails", settings , shopId, (err) => {
        if (err) {
          Alert(i18next.t("app.error"),
            i18next.t("mail.alerts.saveFailed", { error: err.reason }),
            "error");
            return callback();
        }
        Alert({
          title: i18next.t("app.success"),
          text: i18next.t("mail.alerts.saveSuccess"),
          type: "success",
          timer: 1700
        }).catch(() => null);
        return callback();
    });

    return true;
  };

Template.smsSettings.helpers({
    SmsSetting() {
        const shop = Reaction.getShopId();
        const sub = Meteor.subscribe("SmsSettings", shop).ready();
        const settingsResult =  SmsSetting.find().fetch();
        if( settingsResult.length != 0 ) {
          const settings = {}
          settings.appId = settingsResult[0].appId;
          settings.appToken = settingsResult[0].appToken,
          settings.phone = settingsResult[0].phone;

          return {
            component:SmsSettings,
            settings:settings,
            saveSettings:saveSettings
          };
        }
        settings = {
          appId:"",
          appToken: "",
          phone: ""
        };
        return {
          component:SmsSettings,
          settings:settings,
          saveSettings:saveSettings
        }
        
    }
})