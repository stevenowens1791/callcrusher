Template.Calls_show.helpers({
  calls: function() {
    return Calls.find({},{sort:{callEnded: -1}});
  }
});