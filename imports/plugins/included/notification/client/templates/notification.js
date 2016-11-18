import { NotificationDropdown } from "../components";
import { Reaction } from "/client/api";
import { Meteor } from "meteor/meteor";
import { Template } from 'meteor/templating';
import { Notification } from "/lib/collections";


const userId = Meteor.userId();
const sub = Meteor.subscribe("NotificationList", userId).ready();

function toggleMarkAsRead() {
  const notifyList = Notification.find().fetch();
  notifyList.map((notify)=>{
      Meteor.call('notification/markAsRead', notify._id);
  })
};

function toggleMarkOneAsRead(notifyId) {
    Meteor.call('notification/markAsRead', notifyId);
};


Template.notifications.helpers({
    notificationsDrop() {
        let notifyCount = Notification.find({statusRead:'unread'}).fetch();

        const badge = notifyCount.length.toString();
        let notificationList = Notification.find({}, {sort:{sentAt:-1}}).fetch();
        if(notificationList.length <= 0) {
            notificationList.push({
                message:"No notifications yet",
                sentAt:""
            });
        }
        return {
            component:NotificationDropdown,
            notificationList,
            markAllAsRead:toggleMarkAsRead,
            badge,
            markOneAsRead:toggleMarkOneAsRead
        };
    }
})