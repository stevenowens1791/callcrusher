function getRapidCallList(specs) {
  // In the future specs can be used to say get a selection
  // of contacts or the sort order.  For now just get the list
  // starting with those never called then the longest ago call
  return Contacts.find({},{sort: [['everCalled', 'asc'],['lastCalled', 'desc']]}).fetch();
}

var currentRapidList = [];
var currentRapidIndex = 0;
var currentContact;
var currentCountdown;
var currentCallLengthTimer;
var callTimer;

Template.RapidCallStart.events({
  "click .startRapid":function(){
    currentRapidList = getRapidCallList();
    currentRapidIndex = 0;
    console.log(currentRapidList);
    nextCall();
  }
});

function nextCall() {
  currentContact = currentRapidList[currentRapidIndex];
   if(currentContact.phone.length < 1) {
     goToNextCall();
   } else {
  currentCountdown = new ReactiveCountdown(secondsToCall);
  console.log(currentCountdown);
   BlazeLayout.render('App_body', {
      main: 'callIntro'
    });
   }
}

function goToNextCall() {
  currentRapidIndex++;
  // TODO: stop when at end of list
  nextCall();
}

Template.callIntro.helpers({
  "name" : function(){ return currentContact.name},
  "lastCalled" : function(){ return currentContact.lastCalled},
  getCountdown: function(){return currentCountdown.get()},
  getPoints: function(){return currentCountdown.get() * pointsPerSecond}
});

Template.callIntro.onRendered(function(){
  currentCountdown.start();
});

var callStart;

Template.callIntro.events({
  "click .callNow" : function(){
    currentCountdown.stop();
    // TODO: start call timer
    // TODO: credit the points
    document.location.href = 'tel:' + currentContact.phone;
    Meteor.call("recordCall", currentContact);
    callStart = new Date();
    currentCallLengthTimer = new ReactiveCountdown(0, {steps: -1});
     BlazeLayout.render('App_body', {
      main: 'callDone'
    });
  }
});

Template.callDone.onRendered(function(){
  currentCallLengthTimer.start();
});

Template.callDone.helpers({
  getTimer: function(){return  currentCallLengthTimer.get()}
});