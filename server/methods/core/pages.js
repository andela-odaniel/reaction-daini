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

        const url = 'page/' + name.replace(' ', '-').toLowerCase();
        
        StaticPages.insert({
            pageName: name,
            pageRoute: url,
            pageTitle: title,
            pageBody: body,
            pageOwner: Meteor.userId(),
        });
    }
});
