   FlowRouter.route('/calls', {
  name: 'Call',
  action() {
    BlazeLayout.render('App_body', {main: 'Calls_show'});
  }
});

  FlowRouter.route('/contacts', {
  name: 'Contacts.show',
  action() {
    BlazeLayout.render('App_body', {main: 'Contacts_show'});
  }
});

  FlowRouter.route('/contacts/new', {
  name: 'Contacts.show',
  action() {
    BlazeLayout.render('App_body', {main: 'contact_form'});
  }
});
FlowRouter.route('/rapid', {
  name: 'RapidCall',
  action() {
    BlazeLayout.render('App_body', {
      main: 'RapidCallStart'
    });
  }
});
FlowRouter.route('/about', {
  name: 'About.show',
  action() {
    BlazeLayout.render('App_body', {
      main: 'About'
    });
  }
});
FlowRouter.route('/', {
  name: 'Dashboard.show',
  action() {
    BlazeLayout.render('App_body', {
      main: 'Dashboard'
    });
  }
});