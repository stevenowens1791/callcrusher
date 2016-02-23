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

function startRapid() {
  currentRapidList = getRapidCallList();
  currentRapidIndex = 0;
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

Template.callIntro.helpers({
  "name": function() {
    return currentContact.name;
  },
  "lastCalled": function() {
    return currentContact.lastCalled;
  },
  getCountdown: function() {
    return currentCountdown.get();
  },
  getPoints: function() {
    return currentCountdown.get() * pointsPerSecond;
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

Template.callDone.onRendered(function() {
  currentCallLengthTimer.start();

  var checkFocus = setInterval(function() {
    onFocus(function() {
      currentCallLengthTimer.stop();
      currentCallLength = currentCallLengthTimer.get();
      clearInterval(checkFocus);
      $('.follow_up').removeClass('hidden');
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
  // TODO: This should be cleaned up/modularized
  "click .positiveCall": function() {
    currentContact.recordCall(currentCallLengthTimer.get(), 'positive');
    goToNextCall();
  },
  "click .negativeCall": function() {
    currentContact.recordCall(currentCallLengthTimer.get(), 'negative');
    goToNextCall();
  },
  "click .keepCrushing": function() {
    currentContact.recordCall(currentCallLengthTimer.get(), '');
    goToNextCall();
  },
  "click .followUp": function() {
    BlazeLayout.render('App_body', {
      main: 'FollowUp'
    });
  },
  "click .leftMessage": function() {
    currentContact.recordCall(currentCallLengthTimer.get(), 'leftMessage');
    goToNextCall();
  }
});

Template.FollowUp.onRendered(function() {
  this.$('.datetimepicker').datetimepicker();
})