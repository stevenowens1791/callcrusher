function getRapidCallList(specs) {
  // In the future specs can be used to say get a selection
  // of contacts or the sort order.  For now just get the list
  // starting with those never called then the longest ago call
  return Contacts.find({},{sort: [['everCalled', 'asc'],['lastCalled', 'desc']]}).fetch();
}

var currentRapidList = [];
var currentRapidIndex = 0;
var currentContact;

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
   BlazeLayout.render('App_body', {
      main: 'callIntro'
    });
}

Template.callIntro.helpers({
  "name" : currentContact.name,
  "lastCalled" : currentContact.lastCalled
})