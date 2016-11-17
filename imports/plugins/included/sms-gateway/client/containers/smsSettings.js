// import { composeWithTracker, composeAll } from "react-komposer";
// import { useDeps } from "react-simple-di";
// import { Meteor } from "meteor/meteor";
// import { Reaction } from "/client/api";
// import { SmsSetting } from '/lib/collections';
// import { Loading } from "/imports/plugins/core/ui/client/components";
// import actions from "../actions";
// import SmsSettings from "../components/SmsSettings";

// const composer = ( {}, onData ) => {
//   if (Meteor.subscribe("Packages").ready()) {
//     const sub = Meteor.subscribe("SmsSettings", Meteor.userId()).ready();

//     const settingsResult =  SmsSetting.find().fetch();
//     if(settingsResult.length <= 0) {
//       let settings = {
//         appId:"",
//         appToken:"",
//         phone:""
//       };
//     } else {
//       let setting = {};
//       settingsResult.map((setting) => {
//           settings.appId = setting.appId;
//           settings.appToken = setting.appToken;
//           settings.phone = setting.phone;
//       });

//     }

//     const { appId, appToken, phone } = settings;

//     onData( null, { settings } );
//   }
// };

// const depsMapper = () => ({
//   saveSettings: actions.smsActions.saveSettings
// });

// export default composeAll(
//   composeWithTracker(composer, Loading),
//   useDeps(depsMapper)
// )(SmsSettings);
