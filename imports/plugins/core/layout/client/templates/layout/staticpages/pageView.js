import { Reaction } from "/client/api";
import { StaticPages } from "/lib/collections";


Template.pageView.onCreated(function () {
    // Subscription to Pages publication 
    this.subscribe('Pages');
});


Template.pageView.helpers({
    /**
     * 
     * 
     * @param {String} pageRoute - The pageRoute of the page that is to be returned
     * @returns {Array} An Array of the page's data returned from the db
     */
    singlePage(pageRoute) {
        let page =  StaticPages.findOne({pageRoute: 'pages/'+pageRoute});
        let arr = [page];
        return arr;
    }
   
});