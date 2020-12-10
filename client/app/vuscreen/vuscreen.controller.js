'use strict';


angular.module('VuscreenApp')
    .controller('vuscreenController', function ($scope, $http, $location) {
        $scope.name = $location.search().name
        $scope.mobile_no = $location.search().mobile_no
        console.log($scope.mobile_no)
        console.log($scope.name)
        $scope.save = function () {
            if ($scope.from_station === $scope.to_station) {
                alert("From and To cannot be Same");

            } else if ($scope.host1 === $scope.host2) {
                alert("Host1 and Host2 cannot be same");
            } else {
                var parameter = {
                    name: $scope.name,
                    mobile_no: $scope.mobile_no,
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
            }
        };
    });