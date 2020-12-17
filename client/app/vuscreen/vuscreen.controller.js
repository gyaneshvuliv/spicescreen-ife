'use strict';


angular.module('VuscreenApp')
    .controller('vuscreenController', function ($scope, $http, $location) {
        $scope.name = $location.search().name
        $scope.mobile_no = $location.search().mobile_no
        $scope.save = function () {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            console.log($scope.from_station);
            console.log($scope.hostife1);
            console.log($scope.hostife2);
            if ($scope.from_station === $scope.to_station) {
                document.getElementById("myModal").style.display = "block";
                document.getElementById("m1").innerHTML = "<b>From</b> and <b>To</b> cannot be Same";
                document.getElementById("m2").innerHTML = "Invalide Data";
                setTimeout(function () {
                    document.getElementById("myModal").style.display = "none";
                }, 3000);
            } else if ($scope.hostife1 === $scope.hostife2) {
                document.getElementById("myModal").style.display = "block";
                document.getElementById("m1").innerHTML = "<b>Host1</b> and <b>Host2</b> cannot be same";
                document.getElementById("m2").innerHTML = "Invalide Data";
                setTimeout(function () {
                    document.getElementById("myModal").style.display = "none";
                }, 3000);
            } else {
                var parameter = {
                    name: $scope.name,
                    mobile_no: $scope.mobile_no,
                    f_type: $scope.f_type,
                    airCrafType: $scope.airCrafType,
                    base_station: $scope.base_station,
                    start_date: $scope.start_date,
                    from: $scope.from_station,
                    to: $scope.to_station,
                    fno: $scope.fno,
                    host1: $scope.hostife1,
                    host2: $scope.hostife2,
                    rem: $scope.rem
                }
                $http.post('/api/vuscreen/upload', parameter).then(function (success) {
                    $scope.data = success;
                    if ($scope.data.status == 200) {
                        document.getElementById("m1").innerHTML = "";
                        document.getElementById("m2").innerHTML = "Form Submitted Successfully.";
                        document.getElementById("myModal").style.display = "block";
                        setTimeout(function () {
                            document.getElementById("myModal").style.display = "none";
                            window.location.reload()
                        }, 2000);
                        
                    } else {
                        alert("Somthing went wrong, try again later.")
                    }
                });
            }
        };
    });