import { Reaction } from "/client/api";
import { StaticPages, Accounts } from "/lib/collections";


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

        console.log(name, title, body, Meteor.userId());

        // Calls the freaking insert method with the form values as params
        Meteor.call('pages.insert', name, title, body);

        // Empties form after submission
        target.name.value = ""; target.title.value = "";
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

    // Update the page
    'click .update'(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const title = document.getElementById('title').value;
        const body = CKEDITOR.instances.body.getData();


        /**
         * Call update method
         */
        Meteor.call('pages.update', currentPage, name, title, body);

        // Empties form values after update
        document.getElementById('name').value = ""; 
        document.getElementById('title').value = "";
        CKEDITOR.instances.body.setData('');

        // Reset button innerHTML
        document.getElementById('btn-update').innerHTML = 'Create Page';
    },

    // Oh buddy please! Delete the freaking page
    'click .delete'() {
        Meteor.call('pages.delete', this._id);
    }
});


Template.staticPage.helpers({
    displayPages() {
        // Displays pages fetched from db
        return StaticPages.find();
    }
})