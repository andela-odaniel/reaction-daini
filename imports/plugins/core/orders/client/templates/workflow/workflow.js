import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Orders } from "/lib/collections";

/**
 * coreOrderWorkflowHelpers
 */
Template.coreOrderWorkflow.helpers({
  /**
   * orderFulfillmentData
   * @summary Creates an Object with order id and a fulfillment object
   * @param  {String} orderId - An order id
   * @param  {Object} fulfillment - An order fulfillment. e.g. a shipment
   * @return {Object} An object witht the order id and fulfillment
   */
  orderFulfillmentData(orderId, fulfillment) {
    let currentOrder = Orders.findOne(orderId);
    return {
      cartId: currentOrder.cartId,
      email: currentOrder.email,
      orderId: orderId,
      fulfillment: fulfillment
    };
  },
  /**
   * order
   * @return {Object|Boolean} An order or false
   */
  order() {
    const id = Reaction.Router.getQueryParam("_id");
    if (id) {
      return Orders.findOne(id);
    }
    return false;
  },

  /**
   * fulfillmentNumber
   * @param  {Number} index - A number
   * @return {Number} index + 1
   */
  fulfillmentNumber(index) {
    return index + 1;
  },

  /**
   * orderStatus
   * This function checks the current status of the order workflow
   */
  orderStatus(expectedStatus) {
    return this.workflow.status.substr(this.workflow.status.indexOf("/") + 1) === expectedStatus;
  },

  /**
   * loadTemplates
   * This function loads the template suite for the curent workflow
   */
  loadTemplate() {
    const filter = Reaction.Router.getQueryParam("filter");
    return filter === "cancelled" && this.label === "Shipment Tracking" ? false : true;
  }
});
