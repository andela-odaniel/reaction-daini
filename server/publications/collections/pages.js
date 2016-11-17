import { StaticPages } from "/lib/collections";
import { Reaction } from "/server/api";

// StaticPages Publication
Meteor.publish("Pages", function () {

    if (this.userId === null) {
        return this.ready();
    }


    return StaticPages.find({});

  });
