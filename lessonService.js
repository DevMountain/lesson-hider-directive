angular.module('directivePractice').service('lessonService', function($http) {
// getRequest
    this.getSchedule = function() {
// returning file JSON
        return $http.get('schedule.json');
    }
// getRequest
})
