buildPointsChart = function() {
    Meteor.call('pointsForUserOverLastDays', 7, function(error, result) {
        var ctx = $("#pointsChart").get(0).getContext("2d");
        // This will get the first returned node in the jQuery collection.
        var data = formatPointDataForChart(result);
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
    buildPointsChart();
})