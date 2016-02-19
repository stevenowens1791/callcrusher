  FlowRouter.route('/contacts/new', {
    name: 'Contacts.show',
    action() {
      newContact();
    }
  });
  
    FlowRouter.route('/contacts/edit/:contactId', {
    name: 'Contacts.edit',
    action(params) {
      editContact(params.contactId);
    }
  });

Template.Contacts_show.helpers({
  contacts: function() {
    return Contacts.find();
  }
});

Template.contact_form.helpers({
  verb: function(){
    if(editContactId) { return 'Edit';} else { return 'Create'; }
  },
  editMode: function(){ return (editContactId !== null);},
  name: function(){
    if(editContactId) {
      return Contacts.findOne({_id: editContactId}).name;
    } else return "";
  },
  phone: function(){
    if(editContactId) {
      return Contacts.findOne({_id: editContactId}).phone;
    } else return "";
  }
});

Template.contact_form.onRendered(function() {
  $('.float-label-control').floatLabels();
  $('.float-label-control').trigger('change');
});
editContactId = null;

function editContact(contactId) {
  editContactId = contactId;
        BlazeLayout.render('App_body', {
        main: 'contact_form'
      });
}

function newContact(){
  editContactId = null;
        BlazeLayout.render('App_body', {
        main: 'contact_form'
      });
}


Template.contact_form.events({
  "click #cancelCreateContact": function() {
    document.location = "/contacts";
  },
  "click #deleteContact" : function(){
    Contacts.remove(editContactId);
  },
  "submit .new-contact": function(event) {

    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var nameProp = event.target.name.value;
    var phoneProp = event.target.phone.value;

  if(editContactId) {
    Contacts.update(editContactId, {
      $set: {
        name: nameProp,
        phone: phoneProp
      }
    });
  } else {
    Contacts.insert({
      name: nameProp,
      phone: phoneProp,
      createdBy: Meteor.user().username,
      lastCalled: null,
      everCalled: false,
      createdAt: new Date() // current time
    });
  }
    

    // Clear form
    event.target.name.value = "";
    event.target.phone.value = "";
    document.location = "/contacts";
  }
});

Template.contact.events({

});
