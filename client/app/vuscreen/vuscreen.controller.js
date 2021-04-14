'use strict';


angular.module('VuscreenApp')
    .controller('vuscreenController', function ($scope, $http, $location,$filter) {
        $scope.name = $location.search().name
        $scope.mobile_no = $location.search().mobile_no;
        $scope.ifeData;
        $scope.departure_time;
        $scope.arrival_time;
        $scope.from_station;
        $scope.to_station;
        $scope.tail_number;
        $scope.change = function() {
            $scope.start_date =$filter("date")($scope.start_date, 'yyyy-MM-dd');
            $http({
                url: 'http://testsupport.spicejet.com:8080/FlightType/flightType/getflightInfo',
                method: "POST",
                headers : { "Content-Type": "application/json" },
                data: {
                    "key": "%#Flight#@Details&*A",
                    "FromDateTime": $scope.start_date + " 00:00",
                    "ToDateTime": $scope.start_date +" 23:59",
                    "FlightNumber": "",
                    "Origin": "",
                    "Destination": "",
                    "ServiceType": "",
                    "TailNo": ""
                }
            })
            .then(function(response) {
                    // success
                    if (response.status == 200 && response.data.length > 0) {
                        $scope.ifeData = response.data
                    }else{
                        alert("No data available on selected date.")
                    }
            }, 
            function(response) { // optional
                    // failed
                    alert("Somthing went wrong, try again later.")
            });
          };
          $scope.changeBase = function(station){
            $scope.flightNumbers= [];
            for (let index = 0; index < $scope.ifeData.length; index++) {
                const element = $scope.ifeData[index];
                if(element.depStation === station){
                    $scope.flightNumbers.push(element.flightNo)
                    $scope.flightNumbers = [...new Set($scope.flightNumbers)];
                }
            }
        }    
        $scope.changeFlight = function(flightNo){
            let obj = $scope.ifeData.find(o => o.flightNo === flightNo);
            $scope.departure_time = obj.std
            $scope.arrival_time = obj.sta
            $scope.from_station = obj.depStation
            $scope.to_station = obj.arrStation
            $scope.tail_number = obj.registrationNo
        }  
        $scope.save = function () {
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            if ($scope.from_station === $scope.to_station) {
                document.getElementById("myModal").style.display = "block";
                document.getElementById("m1").innerHTML = "<b>From</b> and <b>To</b> cannot be Same";
                document.getElementById("m2").innerHTML = "Invalide Data";
                setTimeout(function () {
                    document.getElementById("myModal").style.display = "none";
                }, 3000);
            } else if ($scope.host1 === $scope.host2) {
                document.getElementById("myModal").style.display = "block";
                document.getElementById("m1").innerHTML = "<b>Host1</b> and <b>Host2</b> cannot be same";
                document.getElementById("m2").innerHTML = "Invalide Data";
                setTimeout(function () {
                    document.getElementById("myModal").style.display = "none";
                }, 3000);
            } else {
                var parameter = {
                    name: $scope.fulname,
                    mobile_no: $scope.phn,
                    f_type: $scope.f_type,
                    airCrafType: $scope.airCrafType,
                    base_station: $scope.base_station,
                    start_date: $scope.start_date,
                    from: $scope.from_station,
                    to: $scope.to_station,
                    fno: $scope.fno,
                    ftime: $scope.ftime,
                    host1: $scope.host1,
                    host2: $scope.host2,
                    rem: $scope.rem,
                    tail_number: $scope.tail_number,
                    departure_time: $scope.departure_time,
                    arrival_time: $scope.arrival_time,
                    type: "web"
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