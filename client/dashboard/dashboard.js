buildPointsChart = function() {
    Meteor.call('pointsForUserOverLastDays', 7, function(error, result) {
        console.log(error);
        console.log(result);
        var ctx = $("#pointsChart").get(0).getContext("2d");
        // This will get the first returned node in the jQuery collection.
        var data = formatPointDataForChart(result);
        console.log(data);
        var myNewChart = new Chart(ctx).Line(data);
    });

}

Template.Dashboard.helpers({
    user: function() {
        if (Meteor.user()) {
            return Meteor.user().username
        }
        else {
            return '';
        }
    }
})
Template.Dashboard.events({

});
Template.Dashboard.onRendered(function() {

//    Tracker.autorun(function() {
//        if (Meteor.user()) {
    //        console.log(Meteor.user())
            buildPointsChart();
  //      }
 //   });
})