(function(){

  var app = angular.module("polar.components.analytics.timeVariance");

  app.directive("polarAnalyticsTimeVariance", [function(){
    return{
      scope: {
        filters: "="
      },
      replace: true,

      templateUrl: "app/scripts/components/analytics/time_variance/template.html",
      controller: "polar.components.analytics.timeVariance.Controller",

      link: function($scope, $element, $attributes){
        // your DOM manipulation logic for this component goes here
        $scope.options = {
          "chart": {
            "type": "multiBarChart",
            "height": 450,
            "margin": {
              "top": 20,
              "right": 20,
              "bottom": 45,
              "left": 45
            },
            "clipEdge": true,
            "duration": 500,
            "stacked": true,
            "xAxis": {
              "axisLabel": "Years",
              "showMaxMin": false,
            },
            "yAxis": {
              "axisLabel": "Frequency",
            }
          }
        };
      }
    };
  }]);

}());
