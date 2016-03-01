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
  Chart.defaults.global.responsive = true;
  Chart.defaults.global.maintainAspectRatio = true;
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
  passwordSignupFields: "USERNAME_AND_EMAIL", 
  extraSignupFields: [{
    fieldName: 'first-name',
    fieldLabel: 'First name',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value) {
        errorFunction("Please write your first name");
        return false;
      }
      else {
        return true;
      }
    }
  }, {
    fieldName: 'last-name',
    fieldLabel: 'Last name',
    inputType: 'text',
    visible: true,
  }]
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

formatPointDataForChart = function(pointData) {

  /* 
  var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
  */
  var labelSet = [];
  var dataSet = [];
  pointData.reverse();
  $.each(pointData, function(ind, dataPoint) {
    labelSet.push(moment(dataPoint.date).format('MMM D'));
    dataSet.push(dataPoint.points)
  });
  var data = {
    labels: labelSet,
    datasets: [{
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: dataSet
    }]
  }
  console.log(data);
  return data;
}