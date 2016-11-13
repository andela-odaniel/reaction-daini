import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "Pages",
  name: "static-pages",
  icon: "fa fa-th",
  autoEnable: true,
  settings: {
    name: "Pages"
  },
  registry: [{
    route: "/dashboard/pages",
    provides: "dashboard",
    workflow: "corePagesWorkflow",
    name: "Static Pages",
    label: "Pages",
    description: "Create and manage static pages",
    icon: "fa fa-th",
    priority: 1,
    container: "core",
    template: "staticPage"
  }],
  layout: [{
    layout: "coreLayout",
    workflow: "corePagesWorkflow",
    theme: "default",
    enabled: true,
    structure: {
      template: "staticPage",
      layoutHeader: "layoutHeader",
      layoutFooter: "",
      notFound: "notFound",
      dashboardHeader: "dashboardHeader",
      dashboardControls: "dashboardControls",
      adminControlsFooter: "adminControlsFooter"
    }
  }]
});
