  /* global FlowRouter BlazeLayout */


  FlowRouter.route('/contacts', {
    name: 'Contacts.show',
    action() {
      BlazeLayout.render('App_body', {
        main: 'Contacts_show'
      });
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