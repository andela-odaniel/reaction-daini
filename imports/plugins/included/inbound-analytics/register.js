import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Inbound Analytics",
  name: "inbound-analytics",
  icon: "fa fa-line-chart",
  autoEnable: true,
  settings: {
    name: "analytics"
  },
  registry: [{
    route: "/dashboard/analytics",
    provides: "dashboard",
    workflow: "coreAnalyticsWorkflow",
    name: "Inbound Analytics",
    label: "InboundAnalytics",
    description: "View analytics based on product sales peformance",
    icon: "fa fa-line-chart",
    priority: 1,
    container: "core",
    template: "InboundAnalytics"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "coreAnalyticsWorkflow",
    theme: "default",
    enabled: true,
    structure: {
      template: "InboundAnalytics",
      layoutHeader: "layoutHeader",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardControls: "dashboardControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
