import { FlatButton } from "/imports/plugins/core/ui/client/components";
import { NotificationDropdown } from "/imports/plugins/included/notification/client/components";
import { Reaction } from "/client/api";
import { FlowRouter as Router } from "meteor/kadira:flow-router-ssr";
import { BlazeLayout } from "meteor/kadira:blaze-layout";
import { StaticPages, Tags, Notification } from "/lib/collections";
import { Meteor } from "meteor/meteor";
import { Template } from 'meteor/templating';

const permissions = ['guest', 'accounts'];
const userId = Meteor.userId();
const sub = Meteor.subscribe("NotificationList", userId).ready();
Reaction.hasPermission(permissions);

function toggleMarkAsRead() {
  const notifyList = Notification.find().fetch();
  notifyList.map((notify)=>{
      Meteor.call('notification/markAsRead', notify._id);
  })
};

function toggleMarkOneAsRead(notifyId) {
    Meteor.call('notification/markAsRead', notifyId);
};

Template.CoreNavigationBar.onCreated(function () {
  this.state = new ReactiveDict();
});

/**
 * layoutHeader events
 */
Template.CoreNavigationBar.events({
  "click .navbar-accounts .dropdown-toggle": function () {
    return setTimeout(function () {
      return $("#login-email").focus();
    }, 100);
  },
  "click .header-tag, click .navbar-brand": function () {
    return $(".dashboard-navbar-packages ul li").removeClass("active");
  },
  "click .searchIcon": function (event, template) {
    const userId = Meteor.userId();
    const shopId = Reaction.getShopId();
    // Meteor.call('notification/send', 'admin', userId, 'Your payment is here', 'paymentRecieved', 'http://localhost:3000/dasboard');
    // Meteor.call('sms/sendSms', '+2349096191371', 'welcome to reaction', shopId);
    Blaze.renderWithData(Template.searchModal, {
    }, $("body").get(0));
    $("body").css("overflow", "hidden");
    $("#search-input").focus();
  }
});

Template.CoreNavigationBar.helpers({
  SearchButtonComponent() {
    return {
      component: FlatButton,
      icon: "fa fa-search",
      kind: "flat"
      // onClick() {
      //   Blaze.renderWithData(Template.searchModal, {
      //   }, $("body").get(0));
      //   $("body").css("overflow-y", "hidden");
      //   $("#search-input").focus();
      // }
    };
  },
  NotificationButtonComponent() {
    let notifyIcon;
    let notifyCount = Notification.find({statusRead:'unread'}).fetch();
    let badge = notifyCount.length.toString();
    if(badge === '0') {
      badge = '';
    }
    if(badge.length >= 1) {
      notifyIcon = true;
    } else {
      notifyIcon = false;
    }
    
    return {
      component: FlatButton,
      icon: "fa fa-bell",
      badge,
      notifyIcon,
      kind: "flat"
    };
  },
  NotificationDropdownComponent() {
    let notifyCount = Notification.find({statusRead:'unread'}).fetch();

    const badge = notifyCount.length.toString();
    let notificationList = Notification.find({}, {sort:{sentAt:-1}, limit:5}).fetch();
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
  },
  onMenuButtonClick() {
    const instance = Template.instance();
    return () => {
      if (instance.toggleMenuCallback) {
        instance.toggleMenuCallback();
      }
    };
  },

  tagNavProps() {
    const instance = Template.instance();
    let tags = [];

    tags = Tags.find({
      isTopLevel: true
    }, {
      sort: {
        position: 1
      }
    }).fetch();

    return {
      name: "coreHeaderNavigation",
      editable: Reaction.hasAdminAccess(),
      isEditing: true,
      tags: tags,
      onToggleMenu(callback) {
        // Register the callback
        instance.toggleMenuCallback = callback;
      }
    };
  }
});

Template.pages.onCreated(function () {
  this.subscribe('Pages');
})

Template.pages.helpers({
  pagesDisplay(){
    return StaticPages.find();
  },

  /**
   * 
   * 
   * @returns The url to each page from the db
   */
   pathForPage() {

        const routeName = this.pageRoute;
        const path = FlowRouter.path(routeName);

        return path;
  }
})
