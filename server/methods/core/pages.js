import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { StaticPages } from "/lib/collections";

Meteor.methods({
    /**
     * 
     * Pages method
     * 
     * @summary creates static pages
     * @param {String} name - The name of the page 
     * @param {String} title - The title of the page
     * @param {String} body - The body of the page 
     */
    'pages.insert'(name, title, body){
        check(name, String);
        check(title, String);
        check(body, String);

        // Generate url using the name of the page
        const url = 'pages/' + name.replace(' ', '-').toLowerCase();
        
        // Hey yo! Insert the data right now!
        StaticPages.insert({
            pageName: name,
            pageRoute: url,
            pageTitle: title,
            pageBody: body,
            pageOwner: Meteor.userId(),
        });
    }
});
