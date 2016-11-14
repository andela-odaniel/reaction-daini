import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Sms",
  name: "reaction-sms",
  icon: "fa fa-mobile",
  autoEnable: true,
  settings: {
    name: "Sms"
  },
  registry: [{
      //Dashboard Card
      provides: "dashboard",
      label: "Sms Gateway",
      description: "Sms",
      icon: "fa fa-mobile",
      priority: 2,
      container: "utilities"
    },
    //Setting panel
    {
    label: "Sms Settings",
    name: "sms/settings",
    provides: "settings",
    template: "smsSettings"
  }]
});
