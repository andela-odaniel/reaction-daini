import { composeWithTracker, composeAll } from "react-komposer";
import { useDeps } from "react-simple-di";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import { Notification } from "./lib/collections";
import NotificationDropdown from "../components/notificationDropdown";

const composer = ({}, onData) => {
  if (Meteor.subscribe("Packages").ready()) {
      let userId = Meteor.userId();
      let sub = Meteor.subscribe('NotificationList', userId); 
      
      if( sub.ready() ) {
          const limit = 5;
          const notificationList = Notification.find({},{sort:{sentAt:-1},limit:limit}).fetch();
          console.log(notificationList);
          return onData(null, { notificationList});
      }

       
  }
};

function markAsRead (notificationList) {
    notificationList.map((notify) => {
        Meteor.call('notification/markAsRead', notify._id);
    });
    return true;
}

const depsMapper = () => ({
  markAsRead: markAsRead()
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(NotificationDropdown);
