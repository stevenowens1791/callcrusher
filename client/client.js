  FlowRouter.route('/contacts', {
  name: 'Contacts.show',
  action() {
    BlazeLayout.render('App_body', {main: 'Contacts_show'});
  }
});

  FlowRouter.route('/about', {
  name: 'About.show',
  action() {
    BlazeLayout.render('App_body', {main: 'About'});
  }
});
    FlowRouter.route('/', {
  name: 'Dashboard.show',
  action() {
    BlazeLayout.render('App_body', {main: 'Dashboard'});
  }
});
	Template.body.helpers({

    activePage: function(){
      return FlowRouter.getRouteName();
    },

    onDashboard: function(){
     return FlowRouter.getRouteName() == 'Dashboard.show'
  },

     onContacts: function(){
     return FlowRouter.getRouteName() == 'Contacts.show'
  },

       onAbout: function(){
     return FlowRouter.getRouteName() == 'About.show'
  },

    contacts: function(){
			return Contacts.find();
		}

	});

	  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

