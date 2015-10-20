'use strict';

// Declare app level module which depends on views, and components
angular.module('onePagePortfolio', [])

.directive('integer', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                return parseInt(viewValue, 10);
            });
        }
    };
})

.controller('portfolioController', function($scope) {

  $scope.newInvestmentType = "Salary";
  $scope.yearsToCalculate = 10;

  $scope.InvestmentManager = new InvestmentManager();

  $scope.InvestmentManager.loadInvestments();

  $scope.IncomeChart = new ChartModel();
  $scope.NetWorthChart = new ChartModel();

  $scope.IncomeChart.setDisplayArea("IncomeChart");
  $scope.NetWorthChart.setDisplayArea("NetWorthChart");

  $scope.recalculate = function() {

    var rawData = $scope.InvestmentManager.calculateBalancesAndIncomes($scope.yearsToCalculate);

    var incomeData = [];
    incomeData.push(rawData.salaryIncome);
    incomeData.push(rawData.portfolioIncome);
    incomeData.push(rawData.expenseIncome);
    $scope.IncomeChart.setSeries(incomeData);

    var netWorthData = [];
    netWorthData.push(rawData.totalBalance)
    $scope.NetWorthChart.setSeries(netWorthData);

    var labels = []
    for (var i = 1; i <= $scope.yearsToCalculate; i++) {
      labels.push("Year " + i);
    }
    $scope.IncomeChart.setLabels(labels)
    $scope.NetWorthChart.setLabels(labels)

    $scope.IncomeChart.draw();
    $scope.NetWorthChart.draw();

    $scope.InvestmentManager.saveInvestments();

  }


  $scope.addInvestment = function() {
    $scope.InvestmentManager.addInvestment($scope.newInvestmentType);
  }

  $scope.recalculate();

});