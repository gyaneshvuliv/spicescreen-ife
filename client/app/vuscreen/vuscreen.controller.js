'use strict';


angular.module('VuscreenApp')
    .controller('vuscreenController', function ($scope, $http) {
        $scope.save = function () {
            $http({
                method: 'GET',
                url: '/api/vuscreen/send-sms?number=' + $scope.mob
            }).then(function (response) {
                console.log(response.data)
                var retVal = prompt("Enter your otp : ", "your otp here");
                if (retVal == null || retVal == "") {
                    console.log('User cancelled the prompt.')
                } else {
                    if (response.data.secureVal == retVal) {
                        var parameter = {
                            name: $scope.name,
                            mob: $scope.mob,
                            base_station: $scope.base_station,
                            start_date: $scope.start_date,
                            from: $scope.from_station,
                            to: $scope.to_station,
                            fno: $scope.fno,
                            host1: $scope.host1,
                            host2: $scope.host2,
                            rem: $scope.rem
                        }
                        console.log(parameter)
                        $http.post('/api/vuscreen/upload', parameter).then(function (success) {
                            $scope.data = success;
                            if ($scope.data.status == 200) {
                                alert("Successfully Uploaded.")
                                window.location.reload()
                            } else {
                                alert("Somthing went wrong, try again later.")
                            }
                        });
                    } else {
                        alert("Wrong OTP! Please Try Again")
                    }
                }
            }, function (error) {
                alert('Error: ' + error);
                console.log('Error: ' + error);
            });
        };
    });