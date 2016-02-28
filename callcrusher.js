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

