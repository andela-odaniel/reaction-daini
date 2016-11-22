import { SimpleSchema } from "meteor/aldeed:simple-schema";

export const Notification = new SimpleSchema({
  from: {
    type: String,
  },
  message: {
    type: String,
    optional: true
  },
  urlLink : {
    type:String,
    optional:true
  },
  sentAt: {
    type: Date,
    autoValue: function () {
      if (this.isUpdate && !this.isSet) {
        return new Date;
      }
      this.unset();
    },
    denyUpdate: true
  },
  caseType: {
    type: String,
    optional: true
  },

  statusRead: {
    type: Boolean,
    optional: true
  }
}).validator();
