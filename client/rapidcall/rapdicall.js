/* global BlazeLayout Contacts ReactiveCountdown  secondsToCall pointsPerSecond */
function getRapidCallList(specs) {
  // In the future specs can be used to say get a selection
  // of contacts or the sort order.  For now just get the list
  // starting with those never called then the longest ago call
  return Contacts.find({}, {
    sort: [
      ['everCalled', 'asc'],
      ['lastCalled', 'desc']
    ]
  }).fetch();
}

var currentRapidList = [];
var currentRapidIndex = 0;
var currentContact;
var currentCountdown;
var currentCallLengthTimer;
var callTimer;
var RapidCallSessionId;

Template.RapidCallStart.events({
  "click .startRapid": function() {
    startRapid();
  }
});

Template.RapidDone.events({
  "click .startRapid": function() {
    startRapid();
  }
});

Template.RapidDone.helpers({
  rapidSessionId: function() {
    return RapidCallSessionId;
  }
})



function startRapid() {
  currentRapidList = getRapidCallList();
  currentRapidIndex = 0;
  RapidCallSessionId = guid();
  nextCall();
}

function nextCall() {
  currentContact = currentRapidList[currentRapidIndex];
  if (currentContact.phone.length < 1) {
    goToNextCall();
  }
  else {
    currentCountdown = new ReactiveCountdown(secondsToCall);
    BlazeLayout.render('App_body', {
      main: 'callIntro'
    });
  }
}

function goToNextCall() {
  currentRapidIndex++;
  if (currentRapidIndex >= currentRapidList.length) {
    BlazeLayout.render('App_body', {
      main: 'RapidDone'
    });
  }
  else {
    nextCall();
  }
}

function recordCall() {
  currentContact.recordCall(currentCallRecord);
  goToNextCall();
}

Template.callIntro.helpers({
  "name": function() {
    return currentContact.name;
  },
  "details": function() {
    var myDetails = (currentContact.company) ? currentContact.company + ' - ' : '';
    if (currentContact.role) myDetails = myDetails + currentContact.role;
    return myDetails;
  },
  "lastCalled": function() {
    return currentContact.lastCalled;
  },
  getCountdown: function() {
    if (isNaN(currentCountdown.get())) {
      return secondsToCall;
    }
    else {
      return currentCountdown.get();
    }
  },
  getPoints: function() {
    if (isNaN(currentCountdown.get())) {
      return secondsToCall * pointsPerSecond;
    }
    else {
      return currentCountdown.get() * pointsPerSecond;
    }
  }
});

Template.callIntro.onRendered(function() {
  currentCountdown.start();
});

var callStart;

Template.callIntro.events({
  "click .callNow": function() {
    currentCountdown.stop();
    // TODO: credit the points
    document.location.href = 'tel:' + currentContact.phone;

    callStart = new Date();
    currentCallLengthTimer = new ReactiveCountdown(0, {
      steps: -1
    });
    currentCallLengthTimer.start();
    BlazeLayout.render('App_body', {
      main: 'callDone'
    });
  }
});

function onFocus(myFunc) {
  if (document.hasFocus()) {
    myFunc();
  }
}

var currentCallLength;
var currentPointsToAward;
var currentCallRecord;
Template.callDone.onRendered(function() {

  var checkFocus = setInterval(function() {
    onFocus(function() {
      currentCallLengthTimer.stop();
      currentCallLength = currentCallLengthTimer.get();
      currentPointsToAward = currentCallLength * pointsPerSecond;
      clearInterval(checkFocus);
      // Create the basic call record
      currentCallRecord = {
        seconds_length: currentCallLengthTimer.get(),
        rapidId: RapidCallSessionId,
        points: currentPointsToAward,
        outcomes: []
      };
      $('.follow_up').removeClass('hidden');
      $('.callLengthDisplay').removeClass('hidden');
    })
  }, 200);

});

Template.callDone.helpers({
  getTimer: function() {
    return currentCallLengthTimer.get()
  },
  "name": function() {
    return currentContact.name
  },
  phone_number: function() {
    return currentContact.phone
  }
});

Template.callDone.events({
  "click .keepCrushing": function() {
    var myNewOutcome = {
      outcome: 'Keep Crushing',
      comment: ''
    };
    currentCallRecord.outcomes.push(myNewOutcome);
    recordCall();
  },
  "click .leftMessage": function(event) {
    var myNewOutcome = {
      outcome: event.target.text,
      comment: ''
    };
    currentCallRecord.outcomes.push(myNewOutcome);
    BlazeLayout.render('App_body', {
      main: 'FollowUp2'
    });
  },
  "click .followUp": function() {
    BlazeLayout.render('App_body', {
      main: 'FollowUp'
    });
  }
});

Template.FollowUp.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();
})

Template.FollowUp.events({
  "click .goBack": function() {
    BlazeLayout.render('App_body', {
      main: 'callDone'
    });
  },
  "click .followUpAction": function(event) {
    var myDate = $('[name=datetime]').val();
    var myDetails = $('[name=details]').val();
    var myNote = (myDate) ? myDate + ' - ' : '';
    myNote = myNote + myDetails;
    var myNewOutcome = {
      outcome: event.target.text,
      comment: ''
    };
    currentCallRecord.outcomes.push(myNewOutcome);
    BlazeLayout.render('App_body', {
      main: 'FollowUp2'
    });
  }
});

Template.FollowUp2.events({
  "click .nextCall": function() {
    recordCall();
  },
  "click .goBack": function() {
    BlazeLayout.render('App_body', {
      main: 'FollowUp'
    });
  }
});