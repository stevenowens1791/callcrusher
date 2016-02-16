function getRapidCallList(specs) {
  // In the future specs can be used to say get a selection
  // of contacts or the sort order.  For now just get the list
  // starting with those never called then the longest ago call
  return Contacts.find({},{sort: [['everCalled', 'asc'],['lastCalled', 'desc']]}).fetch();
}

var currentRapidList = [];
var currentRapidIndex = 0;

Template.RapidCallStart.events({
  "click .startRapid":function(){
    currentRapidList = getRapidCallList();
    currentRapidIndex = 0;
    console.log(currentRapidList);
  }
});

function nextCall() {}