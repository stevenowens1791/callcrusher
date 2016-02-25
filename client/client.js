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

Template.body.onRendered(function() {
  $(function() {
    var navMain = $("#navbar");
    navMain.on("click", "a", null, function() {
      navMain.collapse('hide');
    });
  });
});




// Add US Phone Validation
jQuery.validator.addMethod('phoneUS', function(phone_number, element) {
  phone_number = phone_number.replace(/\s+/g, '');
  return this.optional(element) || phone_number.length > 9 &&
    phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, 'Please enter a valid phone number.');

Template.registerHelper('FormatTimeLength', function(seconds) {
  if (seconds == null) return "";

  return moment().startOf('day').seconds(seconds).format('mm:ss');;
});

Template.registerHelper('FormatDate', function(date) {
  if (date == null) return "";
  return moment(date).format("MM/DD/YYYY")
});

Template.registerHelper('FormatDatetime', function(date) {
  if (date == null) return "";
  return moment(date).format("MM/DD/YYYY h:mma")
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

pointsForUserDuringTime = function(startTime, endTime) {
  var pointsRecsDuringTime = PointsRecords.aggregate({
    $match: {
      user_id: Meteor.user()._id,
      created_at: {
        $gte: startTime,
        $lt: endTime
      },
      totalPoints: {
        $sum: '$points'
      }
    }
  });
}