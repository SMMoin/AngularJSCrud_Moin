/// <reference path="../angular.min.js" />
/// <reference path="../angular-route.min.js" />


var app = angular.module('MainModule', ['ngRoute']);


var baseUrl = 'https://localhost:44386/api/Student/';



app.config(function ($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', { templateUrl: '/Pages/Home.html' })
        .when('/Student', { templateUrl: '/Pages/Student.html', controller: 'StudentCtrl' })
        .otherwise({ redirectTo: '/' });

    $locationProvider.hashPrefix('');
})

app.factory('StudentFact', function ($http) {
    var factory = {};
    factory.GetStudents = function () {
        return $http.get(baseUrl);
    }

    factory.SaveStudents = function (obj) {
        return $http.post(baseUrl, obj);
    }

    factory.UpdateStudents = function (obj) {
        return $http.put(baseUrl + obj.ID, obj);
    }

    factory.DeleteStudents = function (id) {
        return $http.delete(baseUrl + id);
    }

    return factory;
});

app.controller('StudentCtrl', function ($scope, StudentFact) {

    Init();
    function Init() {

        StudentFact.GetStudents().then(function (res) {
            $scope.StudentList = res.data;
        })
    }

    $scope.SaveStudent = function () {
        StudentFact.SaveStudents($scope.objStudent).then(function () {
            Init();
            Clear();
        })
    }

    $scope.EditStudent = function (p) {
        $scope.objStudent = p;
    }

    $scope.UpdateStudent = function () {
        StudentFact.UpdateStudents($scope.objStudent).then(function () {
            Init();
            Clear();
        })
    }

    $scope.DeleteStudent = function (id) {
        StudentFact.DeleteStudents(id).then(function () {
            Init();
        })
    }

    function Clear() {
        $scope.objStudent = null;
    }
});
