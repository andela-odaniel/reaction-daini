import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { Reaction } from "/client/api";
import { ReactiveDict } from "meteor/reactive-dict";
import { Tracker } from "meteor/tracker";
import { Template } from "meteor/templating";
import { i18next } from "/client/api";
import { Orders } from "/lib/collections";

Template.coreOrderShippingSummary.onCreated(() => {
  const template = Template.instance();
  const currentData = Template.currentData();

  template.orderDep = new Tracker.Dependency;
  function getOrder(orderId, shipmentId) {
    template.orderDep.depend();
    return Orders.findOne({
      "_id": orderId,
      "shipping._id": shipmentId
    });
  }

  Tracker.autorun(() => {
    template.order = getOrder(currentData.orderId, currentData.fulfillment._id);
  });
});

/*
 * automatically start order processing on first view
 */

Template.coreOrderShippingSummary.onRendered(function () {
  const template = Template.instance();
  const order = template.order;

  if (order.workflow) {
    if (order.workflow.status === "coreOrderCreated") {
      order.workflow.status = "coreOrderCreated";
      Meteor.call("workflow/pushOrderWorkflow", "coreOrderWorkflow", "coreOrderCreated", order);
    }
  }
});

Template.coreOrderShippingSummary.helpers({
  order() {
    return Template.instance().order;
  },
  shipment() {
    return Template.instance().order.shipping[0];
  },

  paymentProcessor() {
    const processor = Template.instance().order.billing[0].paymentMethod.processor;
    return {
      name: processor.toLowerCase(),
      label: processor
    };
  },

  tracking() {
    const shipment = Template.instance().order.shipping[0];
    if (shipment.tracking) {
      return shipment.tracking;
    }

    return i18next.t("orderShipping.noTracking");
  },
  shipmentStatus() {
    const order = Template.instance().order;
    const shipment = Template.instance().order.shipping[0];
    const shipped = _.every(shipment.items, (shipmentItem) => {
      for (const fullItem of order.items) {
        if (fullItem._id === shipmentItem._id) {
          if (fullItem.workflow) {
            if (_.isArray(fullItem.workflow.workflow)) {
              return _.includes(fullItem.workflow.workflow, "coreOrderItemWorkflow/shipped");
            }
          }
        }
      }
    });

    if (shipped) {
      return {
        shipped: true,
        status: "success",
        label: i18next.t("orderShipping.shipped")
      };
    }

    return {
      shipped: false,
      status: "info",
      label: i18next.t("orderShipping.notShipped")
    };
  },
  showCancel() {
    const filter = Reaction.Router.getQueryParam("filter");
    return filter === "cancelled" || filter === "completed";
  }
});

/**
 * orderCancelButton onCreated
 */
Template.orderCancelButton.onCreated(() => {
  const template = Template.instance();
  template.cancellationReasons = [
    "No reason",
    "Failed delivery",
    "Damaged in transit",
    "Wrong Item",
    "Customer changed mind",
    "Item out of stock"
  ];
  // Set reactive vars here.
  template.state = new ReactiveDict();
  template.state.set("show", false);
  template.state.set("selected", "none");
});

/**
 * orderCancelButton helpers
 */
Template.orderCancelButton.helpers({
  getCancellationReasons() {
    return Template.instance().cancellationReasons;
  },
  isVisible() {
    return Template.instance().state.get("show");
  },
  isSelected(reason) {
    return Template.instance().state.get("selected") === reason;
  }
});

/**
 * orderCancelButton events
 *
 */
Template.orderCancelButton.events({
  "click .cancel": function () {
    if (Template.instance().state.get("selected") === "none") {
      alert("You have not yet selected a reason why you are cancelling");
    } else {
      const reason = Template.instance().state.get("selected");
      Meteor.call("orders/cancel", this.cartId, this.email, reason, function (err) {
        if (err) {
          alert("sorry your cannot cancel customer order at this moment");
        } else {
          alert("Customer order cancelled successfully");
        }
      });
    }
  },
  "click .complete": function () {
    //@TODO check status to make sure order is shipped
    Meteor.call("orders/complete", this, this.shipping[0]);
  },
  "click .toggle-options": function () {
    Template.instance().state.set("show", !Template.instance().state.get("show"));
  },
  "click .reason": function (event) {
    Template.instance().state.set("selected", event.target.innerHTML.trim());
  }
});

