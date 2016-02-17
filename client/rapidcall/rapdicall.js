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
var currentCountdown;

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
  currentCountdown = new ReactiveCountdown(30, {interval: 500}); // TODO: this should be configurable
  if(currentContact.phone.length < 1) goToNextCall();
   BlazeLayout.render('App_body', {
      main: 'callIntro'
    });
}

function goToNextCall() {
  currentRapidIndex++;
  // TODO: stop when at end of list
  nextCall();
}

Template.callIntro.helpers({
  "name" : function(){ return currentContact.name},
  "lastCalled" : function(){ return currentContact.lastCalled},
  getCountdown: function(){return currentCountdown.get()}
})