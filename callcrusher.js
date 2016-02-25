// An Contact class that takes a document in its constructor
/* global Contact Contacts _ */

Contact = function(doc) {
  _.extend(this, doc);   
};
_.extend(Contact.prototype, {
  /* 
  details :
  seconds_length : integer
  outcome : string (for now)
  comment : string (for now)
  rapidId: guid for the rapid session
  points: points awarded
  */
  recordCall: function(details) {
    Contacts.update(this._id, {
      $set: {
        lastCalled: new Date(),
        everCalled: true
      }
    });
    // Create a new call record
    var myReturn = Calls.insert({
      to: this.name,
      to_id: this._id,
      from: Meteor.user().username,
      from_id: Meteor.user()._id,
      length_seconds: details.seconds_length,
      outcome: details.outcome,
      comment: details.comment,
      rapidId: details.rapidId,
      callEnded: new Date() // current time
    });
    
    var myPointRecord = PointsRecords.insert({
      user: Meteor.user().username,
      user_id : Meteor.user()._id,
      points: details.points,
      call_id: myReturn._id
    })
  },
  delete: function() {
    Contacts.remove(this._id);
  }
});


Contacts = new Mongo.Collection("contacts", {
  transform: function(doc) {
    return new Contact(doc);
  }
});
Calls = new Mongo.Collection("calls");
PointsRecords = new Mongo.Collection("pointsRecords");
LogEntries = new Mongo.Collection("logEntries");

// Some things that should be configurable later
pointsPerSecond = 5;
secondsToCall = 30;


