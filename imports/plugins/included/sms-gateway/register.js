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
      label: "SMS Notify",
      description: "Notifications",
      icon: "fa fa-mobile",
      priority: 2,
      container: "utilities",
      permissions:[{
        label:"Sms",
        permission:"dashboard/sms"
      }]
    },
    //Setting panel
    {
    label: "Sms Settings",
    name: "sms/settings",
    provides: "settings",
    template: "smsSettings"
  }],
  layout: [{
    layout: "coreLayout",
    theme: "default",
    enabled: true,
    structure: {
      template: "email",
      layoutHeader: "layoutHeader",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      // dashboardHeaderControls: "emailDashboardTabs", // removed until needed for nav
      dashboardControls: "dashboardControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
