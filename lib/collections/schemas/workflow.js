import { SimpleSchema } from "meteor/aldeed:simple-schema";

/**
 * workflow schema for attaching to collection where
 * PackageWorkflow is controlling view flow
 * Shop defaultWorkflow is defined in Shop
 */

export const Workflow = new SimpleSchema({
  status: {
    type: String,
    defaultValue: "new",
    index: 1
  },
  cancelledMessage: {
    type: String,
    defaultValue: "No reason yet",
    optional: true
  },
  workflow: {
    type: [String],
    optional: true
  }
});
