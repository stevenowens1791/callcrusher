// An Contact class that takes a document in its constructor
Contact = function (doc) {
  _.extend(this, doc);
};
_.extend(Contact.prototype, {
  recordCall: function() {
     Contacts.update(this._id, {
      $set: {
        lastCalled: new Date(),
        everCalled: true
      }
    });
  }
});


Contacts = new Mongo.Collection("contacts", {transform: function (doc) { return new Contact(doc);}});

// Some things that should be configurable later
pointsPerSecond = 5;
secondsToCall = 30;

/*Meteor.methods({
  recordCall: function(contact) {
     Contacts.update(contact._id, {
      $set: {
        lastCalled: new Date(),
        everCalled: true
      }
    })
}});*/



