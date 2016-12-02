import * as AudioMethods from "./audioMethods";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "Audio/getFile": AudioMethods.getFile
});
