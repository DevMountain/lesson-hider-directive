angular.module('directivePractice').controller('lessonCtrl', function($scope){

    $scope.name = "Ya Bad";
    $scope.lessons = ['Services', 'Routing', 'Directives', 'Review', 'Firebase', 'No server project', 'Node', 'Express', 'Mongo'];
    $scope.test = 'Two-way dat binding!';
    $scope.announceDay = function(lesson, day){
            alert(lesson + ' is active on ' + day + '.')
    }

})