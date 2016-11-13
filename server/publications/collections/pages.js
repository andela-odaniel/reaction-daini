import { StaticPages } from "/lib/collections";
import { Reaction } from "/server/api";

// StaticPages Publication
Meteor.publish("StaticPages", function () {

    console.log('testing...');
    if (this.userId === null) {
        return this.ready();
    }


    return StaticPages.find({
      pageOwner: this.userId
    });

  });
