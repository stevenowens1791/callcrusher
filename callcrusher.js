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
    Meteor.call('recordCallToContact', this._id, this.name, details);
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

Meteor.methods({
  recordCallToContact: function(contact_id, contact_name, details) {
    Contacts.update(contact_id, {
      $set: {
        lastCalled: new Date(),
        everCalled: true
      }
    });
    // Create a new call record
    var myReturnId;
    var myReturn = Calls.insert({
      to: contact_name,
      to_id: contact_id,
      from: Meteor.user().username,
      from_id: Meteor.user()._id,
      length_seconds: details.seconds_length,
      outcome: details.outcome,
      comment: details.comment,
      rapidId: details.rapidId,
      callEnded: new Date(), // current time
      callEndedISO: new Date().toISOString()
    });

      myReturnId = myReturn._id;
      var myPointRecord = PointsRecords.insert({
        user: Meteor.user().username,
        user_id: Meteor.user()._id,
        points: details.points,
        created_at: new Date().toISOString(),
        call_id: myReturnId
      });
  },
  pointsForUserDuringTime: function(startTime, endTime) {
    if(!(startTime instanceof Date)) startTime = new Date(startTime);
    if(!(endTime instanceof Date)) endTime = new Date(endTime);

    var pointsRecsDuringTime = PointsRecords.find({
      user_id: Meteor.user()._id,
      created_at: {
        $gte: startTime.toISOString(),
        $lt: endTime.toISOString()
      }
    }).fetch();
    
    var totalPoints = 0;
    pointsRecsDuringTime.forEach(function(pointRec){
      totalPoints += pointRec.points
    })
    return totalPoints;
  }
});
