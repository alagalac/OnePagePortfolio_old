

function InvestmentManager() {

  this.salaries = [];
  this.portfolios = [];
  this.expenses = [];
  this.mortgages = [];
  this.children = [];

  this.calculateBalancesAndIncomes = function(years) {

    var ret = {
      salaryIncome:[], 
      portfolioIncome: [], 
      expenseIncome: [],
      mortgageIncome: [],
      childIncome: [],
      totalIncome: [], 
      portfolioBalance: [],
      mortgageBalance: [],
      totalBalance: []
    };

    // for each year
    for(var i = 0; i < years; i++){

      // go through and calculate all of the balances and incomes.

      // take the total income and allocate it out based upon the allocation rates.
      var totalIncome = 0;

      //salaries
      var salaryIncome = this.getTotalIncome('Salary', i);
      totalIncome += salaryIncome;

      //portfolios
      var portfolioIncome = this.getTotalIncome('Portfolio', i);
      totalIncome += portfolioIncome;

      //expenses
      var expenseIncome = this.getTotalIncome('Expense', i);
      totalIncome += expenseIncome;

      //mortgages
      var mortgageIncome = this.getTotalIncome('Mortgage', i);
      totalIncome += mortgageIncome;

      //children
      var childIncome = this.getTotalIncome('Child', i);
      totalIncome += childIncome;


      //Now for the balances
      var totalBalance = 0;

      //portfolio
      var portfolioBalance = this.getTotalBalance('Portfolio', i, totalIncome);
      totalBalance += portfolioBalance;

      //mortgage
      var mortgageBalance = this.getTotalBalance('Mortgage', i, totalIncome);
      totalBalance += mortgageBalance;

      // tidy-up
      ret.salaryIncome.push(salaryIncome);
      ret.portfolioIncome.push(portfolioIncome);
      ret.expenseIncome.push(expenseIncome);
      ret.mortgageIncome.push(mortgageIncome);
      ret.childIncome.push(childIncome);
      ret.totalIncome.push(totalIncome);

      ret.portfolioBalance.push(portfolioBalance);
      ret.mortgageBalance.push(mortgageBalance);
      ret.totalBalance.push(totalBalance);
    }

    return ret;
  }

  this.addInvestment = function(investmentType) {
    this.getInvestmentCollection(investmentType).push(this.getNewInvestment(investmentType));
  }

  this.removeInvestment = function(investment, investmentType) {
    var index = this.getInvestmentCollection(investmentType).indexOf(investment)
    this.getInvestmentCollection(investmentType).splice(index, 1);
  }

  this.getInvestmentCollection = function(investmentType) {
    if (investmentType === "Salary") {
      return this.salaries;
    } else if (investmentType === "Portfolio") {
      return this.portfolios;
    } else if (investmentType === "Expense") {
      return this.expenses;
    } else if (investmentType === "Mortgage") {
      return this.mortgages;
    } else if (investmentType === "Child") {
      return this.children;
    }
  }

  this.getNewInvestment = function(investmentType) {
    if (investmentType === "Salary") {
      return new Salary();
    } else if (investmentType === "Portfolio") {
      return new Portfolio();
    } else if (investmentType === "Expense") {
      return new Expense();
    } else if (investmentType === "Mortgage") {
      return new Mortgage();
    } else if (investmentType === "Child") {
      return new Child();
    }
  }

  this.getTotalIncome = function(investmentType, year) {
    var collection = this.getInvestmentCollection(investmentType);

    var totalIncome = 0;
    for(var j = 0; j < collection.length; j++){
      var previousBalance = 0;
      if (year == 0) {
        previousBalance = collection[j].getInitialBalance();
      } else {
        previousBalance = collection[j].previousBalance; //temp property
      }

      var income = collection[j].getIncome(year, previousBalance);
      totalIncome += income;
    }

    return totalIncome;
  }

  this.getTotalBalance = function(investmentType, year, totalIncome) {
    var collection = this.getInvestmentCollection(investmentType);

    var totalBalance = 0;
    for(var j = 0; j < collection.length; j++){
      var previousBalance = 0;
      if (year == 0) {
        previousBalance = collection[j].getInitialBalance();
      } else {
        previousBalance = collection[j].previousBalance; //temp property
      }

      var balance = collection[j].getBalance(year, previousBalance);

      // Now, add our allocation from the total income.
      var actualAllocation = totalIncome * (collection[j].getAllocation() / 100);
      balance += actualAllocation;
      collection[j].previousBalance = balance; // setting temp property.

      totalBalance += balance;
    }

    return totalBalance;
  }

  this.saveInvestments = function() {

    localStorage.setItem('salaries', JSON.stringify(this.salaries));
    localStorage.setItem('portfolios', JSON.stringify(this.portfolios));
    localStorage.setItem('expenses', JSON.stringify(this.expenses));

    
  }

  this.loadInvestments = function() {

    if (localStorage.getItem('salaries') != null) {
      var s = JSON.parse(localStorage.getItem('salaries'));
      for (var i = 0; i < s.length; i++) {
        var j = new Salary();
        j.growthRate = s[i].growthRate;
        j.initialValue = s[i].initialValue;
        this.salaries.push(j);
      }
    }
    if (localStorage.getItem('portfolios') != null) {
      p = JSON.parse(localStorage.getItem('portfolios'));
      for (var i = 0; i < p.length; i++) {
        var j = new Portfolio();
        j.growthRate = p[i].growthRate;
        j.initialValue = p[i].initialValue;
        j.allocation = p[i].allocation;
        this.portfolios.push(j);
      }
    }
    if (localStorage.getItem('expenses') != null) {
      e = JSON.parse(localStorage.getItem('expenses'));
      for (var i = 0; i < e.length; i++) {
        var j = new Expense();
        j.growthRate = e[i].growthRate;
        j.initialValue = e[i].initialValue;
        j.allocation = e[i].allocation;
        j.frequency = e[i].frequency;
        this.expenses.push(j);
      }
    }
  }
}