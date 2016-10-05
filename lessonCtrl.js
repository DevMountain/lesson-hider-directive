angular.module('directivePractice').controller('lessonCtrl', function($scope, lessonService) {
    // lesson array
    $scope.lessons = ['Services', 'Routing', 'Directives', 'Review', 'Firebase', 'No server project', 'Node', 'Express', 'Mongo'];
    // test
    $scope.test = 'Two-way data binding!';

    $scope.announceDay = function(lesson, day) {
      if (day === 'undefined'){
    alert(lesson + ' is active on '+ 'Friday');
      }
            alert(lesson + ' is active on ' + day + '.');
        }

})
