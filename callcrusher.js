Contacts = new Mongo.Collection("contacts");

// Some things that should be configurable later
pointsPerSecond = 5;
secondsToCall = 30;

Meteor.methods({
  recordCall: function(contact) {
     Contacts.update(contact._id, {
      $set: {
        lastCalled: new Date(),
        everCalled: true
      }
    })
}});



