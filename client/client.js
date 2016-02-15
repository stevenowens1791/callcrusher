
Template.body.helpers({

  activePage: function() {
    return FlowRouter.getRouteName();
  },

  onDashboard: function() {
    return FlowRouter.getRouteName() == 'Dashboard.show'
  },

  onContacts: function() {
    return FlowRouter.getRouteName() == 'Contacts.show'
  },

  onAbout: function() {
    return FlowRouter.getRouteName() == 'About.show'
  },

  onRapidCall: function() {
    return FlowRouter.getRouterName() == 'RapidCall'
  },

  contacts: function() {
    return Contacts.find();
  }

});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
