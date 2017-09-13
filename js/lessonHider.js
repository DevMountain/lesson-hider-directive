angular.module('directivePractice').directive('lessonHider', function(){

        return{
            templateUrl: "../lessonHider.html",
            restrict: "E",
            scope: {
                lesson: '=',
                dayAlert: '&'
            },
            link: function(scope, elems , attrs){
                // scope.lesson = 'test';
                scope.getSchedule.then(function( response ) {
                    scope.schedule = response.data;

                    scope.schedule.forEach(function( scheduleDay ) {
                        if (scheduleDay.lesson === scope.lesson) {
                          elems.css('text-decoration', 'line-through');
                          scope.lessonDay = scheduleDay.weekday;
                          return;
                        }
                      });
                
            })
        },
            controller: function($scope, lessonService){
                $scope.getSchedule = lessonService.getSchedule()
            }
        }

})


