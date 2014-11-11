angular.module('monthlyPie', ['facebook-factory'])

.directive('monthlyPie', function(facebookdata) {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'assets/js/templates/monthly-pie.html',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.value, function(newValue) {
        if (newValue) {
          var response = newValue;
          var monthLabel = 0;
          var messageMonthlyCount = [];
          for (var prop in response.monthCount) {
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            messageMonthlyCount.push({
              label: month[monthLabel++],
              value: response.monthCount[prop]
            })
          }
          nv.addGraph(function() {
            var chart = nv.models.pieChart()
              .x(function(d) {
                return d.label
              })
              .y(function(d) {
                return d.value
              })
              .showLabels(true);

            d3.select("#monthlyPie svg")
              .datum(messageMonthlyCount)
              .transition().duration(350)
              .call(chart);

            return chart;
          })
        }
      })
    }
  }
});
