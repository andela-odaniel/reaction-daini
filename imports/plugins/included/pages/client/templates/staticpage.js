import { Reaction } from "/client/api";
import { StaticPages } from "/lib/collections";


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
