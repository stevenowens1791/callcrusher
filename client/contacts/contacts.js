  /* global FlowRouter, BlazeLayout */
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

  var editContactId = null;

  Template.contact_form.helpers({
    verb: function() {
      if (editContactId) {
        return 'Edit';
      }
      else {
        return 'Create';
      }
    },
    editMode: function() {
      return (editContactId !== null);
    },

  });

  function editContact(contactId) {
    editContactId = contactId;
    BlazeLayout.render('App_body', {
      main: 'contact_form'
    });
  }

  function newContact() {
    editContactId = null;
    BlazeLayout.render('App_body', {
      main: 'contact_form'
    });
  }

  Template.contact_form.onRendered(function() {
    if (editContactId) {
      
      var myContact = Contacts.findOne({
        _id: editContactId
      });
      if (myContact) {
        $('input[name=name]').val(myContact.name);
        $('input[name=phone]').val(myContact.phone);
        $('input[name=company]').val(myContact.company);
        $('input[name=role]').val(myContact.role);
        $('input[name=email]').val(myContact.email);
      }
    }
    $('.float-label-control').floatLabels();
    $('.float-label-control').trigger('change');
  });


  Template.contact_form.events({
    "click #cancelCreateContact": function() {
      document.location = "/contacts";
    },
    "click #deleteContact": function() {
      Contacts.remove(editContactId);
    },
    "submit .new-contact": function(event) {

      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var nameProp = event.target.name.value;
      var phoneProp = event.target.phone.value;
      var emailProp = event.target.email.value;
      var companyProp = event.target.company.value;
      var roleProp = event.target.role.value;

      if (editContactId) {
        Contacts.update(editContactId, {
          $set: {
            name: nameProp,
            phone: phoneProp,
            email: emailProp,
            company: companyProp,
            role: roleProp
          }
        });
      }
      else {
        Contacts.insert({
          name: nameProp,
          phone: phoneProp,
          email: emailProp,
          company: companyProp,
          role: roleProp,
          createdBy: Meteor.user().username,
          lastCalled: null,
          everCalled: false,
          createdAt: new Date() // current time
        });
      }


      // Clear form
      event.target.name.value = "";
      event.target.phone.value = "";
      event.target.company.value = "";
      event.target.role.value = "";
      event.target.email.value = "";
      document.location = "/contacts";
    }
  });

  Template.contact.events({

  });