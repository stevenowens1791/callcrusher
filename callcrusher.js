// An Contact class that takes a document in its constructor
Contact = function (doc) {
_.extend(this, doc);
};
_.extend(Contact.prototype, {
  recordCall: function(seconds_length, outcome, comment) {
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
      length_seconds: seconds_length,
      outcome: outcome,
      comment: comment,
      callEnded: new Date() // current time
    });
  }
});


Contacts = new Mongo.Collection("contacts", {transform: function (doc) { return new Contact(doc);}});
Calls = new Mongo.Collection("calls");

// Some things that should be configurable later
pointsPerSecond = 5;
secondsToCall = 30;

