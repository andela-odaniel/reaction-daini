import Alert from "sweetalert2";
import { Reaction, i18next } from "/client/api";

export default {

  /**
   * Open the email settings menu
   * @return {Boolean} returns true if action view toggled
   */
  toggleSettings() {
    Reaction.showActionView({
      label: "Sms Settings",
      template: "smsSettings"
    });
    return true;
  },

  /**
   * Save sms settings
   * @param {Object} settings - object of sms provider settings
   * @param {Function} callback - optional callback
   * @return {Boolean} returns true if all fields provided and update method called
   */
  saveSettings(settings, callback) {
    const { appId, appToken, phone } = settings;

    if (!appId || !appToken || !phone) {
      Alert(i18next.t("app.error"), i18next.t("mail.alerts.missingService"), "error");
      return callback();
    }

    Meteor.call("sms/saveDetails", settings, (err) => {
        if (err) {
          return Alert(i18next.t("app.error"),
            i18next.t("mail.alerts.saveFailed", { error: err.reason }),
            "error");
        }
        return Alert({
          title: i18next.t("app.success"),
          text: i18next.t("mail.alerts.saveSuccess"),
          type: "success",
          timer: 1700
        }).catch(() => null);
    });

    return true;
  }
};
