  /* global FlowRouter Calls BlazeLayout outcomes*/
  FlowRouter.route('/calls', {
    name: 'Call',
    action() {
      BlazeLayout.render('App_body', {
        main: 'Calls_show'
      });
    }
  });
  
  var rapidCallSessionId=null;
  
FlowRouter.route('/calls/rapidcall/:rapidCallSessionId', {
    name: 'Call',
    action(params) {
      rapidCallSessionId = params.rapidCallSessionId;
      BlazeLayout.render('App_body', {
        main: 'Calls_show'
      });
    }
  });


Template.Calls_show.onRendered(function(){
  Session.set('displayMode','table')
});

Template.Calls_show.helpers({
  calls: function() {
    if(rapidCallSessionId) {
      return Calls.find({rapidId: rapidCallSessionId},{sort:{callEnded: -1}});
    } else {
    return Calls.find({},{sort:{callEnded: -1}});
    }
  },
  isTable: function(){
    return Session.get('displayMode') == 'table';
  },
  isDetails: function(){
    return Session.get('displayMode') == 'details';
  }
});

Template.Calls_show.events({
  "click .showTable": function(){
    Session.set('displayMode','table');
  },
  "click .showDetails": function(){
    Session.set('displayMode','details');
  },
  "click .emailMe" : function(){
    var html = inlineCSS($('#__blaze-root').html()).html()
  
    var options = {
      html: html,
      subject: 'Your call report'
    }
    Meteor.call('sendCallReportEmail', options);
  }
})

Template.outcomes_display.onRendered(function(){
  this.$('[data-toggle="popover"]').popover({
    html: true,
    placement: 'auto',
    container: 'body'
  })
})

Template.outcomes_display.helpers({
  outcome_count: function(){
    if(!this.outcomes) return '';
    return this.outcomes.length;
  },
  outcomesExist: function(){
    if(!this.outcomes) return false;
    return this.outcomes.length > 0;
  }
})