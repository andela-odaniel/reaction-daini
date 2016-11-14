import { Reaction } from "/client/api";
import { StaticPages, Accounts } from "/lib/collections";


Template.staticPage.onCreated(function () {
    // Subscription to Pages publication 
    this.subscribe('Pages');
});


Template.staticPage.events({
    'submit .new_page'(event){
        event.preventDefault();

        // Gets form values 
        const target = event.target;
        const name = target.name.value;
        const title = target.title.value;
        const body = target.body.value;

        console.log(name, title, body, Meteor.userId());

        // Calls the freaking page insert method with the form values as params
        Meteor.call('pages.insert', name, title, body);

        // Empties form values
        target.name.value = ""; target.title.value = ""; target.body.value = "";


    }
});


Template.staticPage.helpers({
    displayPages() {
        // Displays pages fetched from db
        return StaticPages.find();
    }
})