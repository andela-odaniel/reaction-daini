import { SimpleSchema } from "meteor/aldeed:simple-schema";

/**
 * Reaction Schemas Static Pages
 */

export const Pages = new SimpleSchema({
  pageName: {
    type: String,
    index: 1,
    label: "Page Name"
  },
  pageRoute: {
    type: String,
    index: 1,
    label: "Route to view page"
  },
  pageTitle: {
    type: String,
    index: 1,
    label: "Title of the page"
  },
  pageBody: {
    type: String,
    optional: true,
    index: 1
  },
  pageOwner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    index: 1,
    label: "Page Owner userId"
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue() {
      if (this.isUpdate) {
        return {
          $set: new Date
        };
      } else if (this.isUpsert) {
        return {
          $setOnInsert: new Date
        };
      }
    },
    optional: true
  }
});