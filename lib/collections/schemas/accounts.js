import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { shopIdAutoValue } from "./helpers";
import { Address } from "./address";
import { Metafield } from "./metafield";

/**
 * Accounts Schemas
 */

export const Profile = new SimpleSchema({
  addressBook: {
    type: [Address],
    optional: true
  },
  name: {
    type: String,
    optional: true
  },
  picture: {
    type: String,
    optional: true
  }
});

export const Email = new SimpleSchema({
  provides: {
    type: String,
    defaultValue: "default",
    optional: true
  },
  address: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  verified: {
    type: Boolean,
    defaultValue: false,
    optional: true
  }
});

export const WalletTransaction = new SimpleSchema({
  transactionType: {
    type: String,
    optional: false,
    allowedValues: ["credit", "debit"]
  },
  amount: {
    type: Number,
    decimal: true,
    optional: false
  },
  createdAt: {
    type: Date,
    autoValue() {
      return new Date;
    }
  }
});

export const Wallet = new SimpleSchema({
  balance: {
    type: Number,
    decimal: true,
    optional: false,
    defaultValue: 0.0
  },
  transactions: {
    type: [WalletTransaction],
    optional: false,
    defaultValue: []
  }
});

/**
 * Reaction Schemas Accounts
 */

export const Accounts = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    index: 1,
    label: "Accounts ShopId"
  },
  sessions: {
    type: [String],
    optional: true,
    index: 1
  },
  shopId: {
    type: String,
    autoValue: shopIdAutoValue,
    regEx: SimpleSchema.RegEx.Id,
    index: 1
  },
  emails: {
    type: [Email],
    optional: true
  },
  acceptsMarketing: {
    type: Boolean,
    defaultValue: false,
    optional: true
  },
  state: {
    type: String,
    defaultValue: "new",
    optional: true
  },
  note: {
    type: String,
    optional: true
  },
  takenTour: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  profile: {
    type: Profile,
    optional: true
  },
  wallet: {
    type: Wallet,
    defaultValue: {
      balance: 0.0,
      transactions: []
    },
    optional: true
  },
  metafields: {
    type: [Metafield],
    optional: true
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
