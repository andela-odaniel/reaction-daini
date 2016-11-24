/* eslint camelcase: 0 */
import { Template } from "meteor/templating";
import { Packages, Accounts } from "/lib/collections";
import { PaypalPackageConfig } from "../../../lib/collections/schemas";

Template.paypalSettings.helpers({
  PaypalPackageConfig: function () {
    return PaypalPackageConfig;
  },
  packageData: function () {
    return Packages.findOne({
      name: "reaction-paypal"
    });
  }
});

AutoForm.hooks({
  "paypal-update-form": {
    onSuccess: function () {
      Alerts.removeSeen();
      return Alerts.add("Paypal settings saved.", "success", {
        autoHide: true
      });
    },
    onError: function (operation, error) {
      Alerts.removeSeen();
      return Alerts.add("Paypal settings update failed. " + error, "danger");
    }
  }
});

Template.paypalSettings.events({
  'mouseenter .paypalTour'(){

    const currentUser = Accounts.findOne(Meteor.userId());
    const myintro = introJs("#paypal-config");

    if(!currentUser.paypalSettingsTour){
      myintro.start();
    }

    myintro.oncomplete(function() { 
      Accounts.update({_id: Meteor.userId()}, {$set:{paypalSettingsTour: true}}, function (error, res) {
      });
        
    });
  },

  'mouseleave .paypalTour'(){
     const myintro = introJs("#paypal-config");
     myintro.exit();
  },
});