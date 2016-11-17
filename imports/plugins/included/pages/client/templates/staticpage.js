import { Reaction } from "/client/api";
import { StaticPages } from "/lib/collections";


Template.staticPage.onCreated(function () {
    // Subscription to Pages publication 
    this.subscribe('Pages');
    let currentPage = [];
});


Template.staticPage.events({
    'submit .new_page'(event){
        event.preventDefault();

        // Gets form values 
        const target = event.target;
        const name = target.name.value;
        const title = target.title.value;
        const body = target.body.value;


        const btnAction = document.getElementById('btn-update').innerHTML;
        
        if(btnAction === 'Create Page'){

            // Calls the freaking insert method with the form values as params
            Meteor.call('pages.insert', name, title, body);
            
        }else{

            //Call update method
            Meteor.call('pages.update', currentPage, name, title, body);

            // Reset button innerHTML
            document.getElementById('btn-update').innerHTML = 'Create Page';
        }
            

        // Empties form after submission
        target.name.value = ""; 
        target.title.value = "";
        CKEDITOR.instances.body.setData('');

    },

    // Edit that page 
    'click .edit'(event) {
        // Prevent browser default
        event.preventDefault();

        // Update form values with page data
        document.getElementById('name').value = this.pageName;
        document.getElementById('title').value = this.pageTitle;
        CKEDITOR.instances.body.setData(this.pageBody);

        // Change button innerHTML
        document.getElementById('btn-update').innerHTML = 'Update';

        currentPage = this._id;

    },

    // Oh buddy please! Delete the freaking page
    'click .delete'() {
        Meteor.call('pages.delete', this._id);
    }
});


Template.staticPage.helpers({
    // Makes StaticPages data available to the template
    displayPages() {
        return StaticPages.find();
    }
});