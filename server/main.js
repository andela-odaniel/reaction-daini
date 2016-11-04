import "./methods";
import Startup from "./startup";
import Security from "./security";
import RestAPI from "../rest-api";

Meteor.startup(() => {
  Startup();
  Security();
  RestAPI();
});
