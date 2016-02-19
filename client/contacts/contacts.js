Template.Contacts_show.helpers({
  contacts: function() {
    return Contacts.find();
  }
});



Template.contact_form.onRendered(function() {
  $('.float-label-control').floatLabels()
});


Template.contact_form.events({
  "click #cancelCreateContact": function() {
    document.location = "/contacts";
  },
  "submit .new-contact": function(event) {

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var nameProp = event.target.name.value;
    var phoneProp = event.target.phone.value;

    Contacts.insert({
      name: nameProp,
      phone: phoneProp,
      createdBy: Meteor.user().username,
      lastCalled: null,
      everCalled: false,
      createdAt: new Date() // current time
    });

    // Clear form
    event.target.name.value = "";
    event.target.phone.value = "";
    document.location = "/contacts";
  }
});

Template.contact.events({
  "click": function() {
    //TODO: Edit contact here
    /*document.location.href = 'tel:' + this.phone;
    Meteor.call("recordCall", this._id);*/
  }
});
