'use strict';


angular.module('VuscreenApp')
    .controller('vuscreenController', function ($scope, $http) {
        $scope.save = function () {
            var parameter = {
                f_type: $scope.f_type,
                base_station: $scope.base_station,
                start_date: $scope.start_date,
                from: $scope.from_station,
                to: $scope.to_station,
                fno: $scope.fno,
                host1: $scope.host1,
                host2: $scope.host2,
                rem: $scope.rem
            }
            $http.post('/api/vuscreen/upload', parameter).then(function (success) {
                $scope.data = success;
                if ($scope.data.status == 200) {
                    alert("Successfully Uploaded.")
                    window.location.reload()
                } else {
                    alert("Somthing went wrong, try again later.")
                }
            });
        };
    });