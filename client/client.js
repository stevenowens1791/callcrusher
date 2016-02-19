/* global FlowRouter Contacts*/
Template.body.helpers({

  activePage: function() {
    return FlowRouter.getRouteName();
  },

  onDashboard: function() {
    return FlowRouter.getRouteName() == 'Dashboard.show';
  },

  onContacts: function() {
    return FlowRouter.getRouteName() == 'Contacts.show';
  },

  onAbout: function() {
    return FlowRouter.getRouteName() == 'About.show';
  },

  onRapidCall: function() {
    return FlowRouter.getRouteName() == 'RapidCall';
  },
  
  onCall: function() {
    return FlowRouter.getRouteName() == 'Call';
  },

  contacts: function() {
    return Contacts.find();
  }

});

// Add US Phone Validation
jQuery.validator.addMethod('phoneUS', function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, ''); 
    return this.optional(element) || phone_number.length > 9 &&
        phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, 'Please enter a valid phone number.');

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
