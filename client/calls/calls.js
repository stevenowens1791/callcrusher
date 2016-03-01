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

Template.Calls_show.helpers({
  calls: function() {
    if(rapidCallSessionId) {
      return Calls.find({rapidId: rapidCallSessionId},{sort:{callEnded: -1}});
    } else {
    return Calls.find({},{sort:{callEnded: -1}});
    }
  }
});

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