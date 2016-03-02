/* global PointsRecords Contacts Calls */


_pointsForUserDuringTime = function(startTime, endTime) {
  if (!(startTime instanceof Date)) startTime = new Date(startTime);
  if (!(endTime instanceof Date)) endTime = new Date(endTime);

  var pointsRecsDuringTime = PointsRecords.find({
    user_id: Meteor.user()._id,
    created_at: {
      $gte: startTime.toISOString(),
      $lt: endTime.toISOString()
    }
  }).fetch();

  var totalPoints = 0;
  pointsRecsDuringTime.forEach(function(pointRec) {
    totalPoints += pointRec.points
  })
  return totalPoints;
}

Meteor.methods({
  sendCallReportEmail: function(options) {
    // you should probably validate options using check before actually
    // sending email
    var APIoptions = {
      apiKey: 'key-b1f674ae623a95d9317c445b86f70a98',
      domain: 'sandbox01f86f3b33b64b9b9d5e3e17e5a1b78c.mailgun.org'
    }
    var MyMailGun = new Mailgun(APIoptions);
    options.from = 'CallCrusher@callcrusher.com';
    options.to = Meteor.user().emails[0].address;
    MyMailGun.send(options);
  },
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
      outcomes: details.outcomes,
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
    return _pointsForUserDuringTime(startTime, endTime);
  },
  pointsForUserOverLastDays: function(numDays) {
    var arrPoints = [];
    for (var i = 0; i < numDays; i++) {
      var myDay = moment();
      myDay.subtract(i, 'd');
      var startOfDay = myDay.clone();
      var endOfDay = myDay.clone();
      startOfDay.set({
        'hour': 0,
        'minute': 0,
        'second': 0
      });
      endOfDay.set({
        'hour': 23,
        'minute': 59,
        'second': 59
      });
      var points = _pointsForUserDuringTime(startOfDay.toISOString(), endOfDay.toISOString());
      arrPoints.push({
        'date': myDay.toISOString(),
        'points': points
      });
    }
    return arrPoints;
  }
});

Meteor.methods({
  sendShareEmail: function(options) {
    // you should probably validate options using check before actually
    // sending email
    check(options, {
      from: String,
      // etc...
    });
    Email.send(options);
  }
});
