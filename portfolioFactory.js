

function Salary() {
    this.growthRate = 5; // In %
    this.initialValue = 0;

    this.getIncome = function (year, previousBalance) {
      // present value of inital salary, + present value of contributions...
      return this.initialValue * Math.pow(1 + (this.growthRate / 100), year);
    }

    this.getBalance = function (year, previousBalance) {
      return 0;
    }

    this.getInitialBalance = function() {
      return 0;
    }

    this.getAllocation = function(year) {
      return 0;
    }
}

function Portfolio() {
    this.growthRate = 5;
    this.initialValue = 0;
    this.allocation = 0;

    this.getIncome = function (year, previousBalance) {
      return previousBalance * (this.growthRate / 100);
    }

    this.getBalance = function (year, previousBalance) {
      return previousBalance;
    }

    this.getInitialBalance = function() {
      return this.initialValue;
    }

    this.getAllocation = function(year) {
      return this.allocation;
    }

}

function Expense() {

    this.growthRate = 5; // In % per annum
    this.initialValue = 0;
    this.allocation = 0;
    this.frequency = "Annual"; // Weekly, Fortnightly, Monthly, Annual

    this.getIncome = function (year, previousBalance)
    {
      if (this.frequency === "Annual")
      {
        return this.initialValue * Math.pow(1 + (this.growthRate / 100), year) * -1;
      } else if (this.frequency === "Monthly")
      {
        return this.initialValue * 1;
      }
    }

    this.getBalance = function (year, previousBalance) {
      return 0;
    }

    this.getInitialBalance = function() {
      return 0;
    }

    this.getAllocation = function(year) {
      return 0;
    }
}


function Mortgage() {
    this.annualRent = 9360;
    this.startYear = 10;

    this.mortgagePrincipal = 400000;
    this.mortgageRate = 4; // In %
    this.mortgageTerm = 20; // In years

    this.getIncome = function (year, previousBalance) {
      var interestInDecimal = (this.mortgageRate / 100);
      var payments = (interestInDecimal * this.mortgagePrincipal) / (1 - Math.pow((1 + interestInDecimal), -this.mortgageTerm));
      
      if (year < this.startYear)
      {
          return 0; //house not bought yet.
      }

      if (year > this.startYear + this.mortgageTerm)
      {
          // The mortgage is paid off.
          return this.annualRent;
      }

      return this.annualRent - payments;
    }

    this.getBalance = function (year, previousBalance) {

      if (year < this.startYear)
      {
          return 0; //house not bought yet.
      }
      var yearsPaid = year - this.startYear;
      var interestInDecimal = (this.mortgageRate / 100);
      var outstandingBalance = this.mortgagePrincipal * (1 - ((Math.pow(1 + interestInDecimal, yearsPaid - 1)) / (Math.pow(1 + interestInDecimal, this.mortgageTerm - 1))));

      var principalPaid = this.mortgagePrincipal - outstandingBalance;

      return -this.mortgagePrincipal +  - outstandingBalance;
    }

    this.getInitialBalance = function() {
      return 0;
    }

    this.getAllocation = function(year) {
      return 0;
    }
}


function Child() {

    this.startYear = 10;
    this.annualCost = 10000;

    this.getIncome = function (year, previousBalance)
    {
        if (year < this.startYear)
        {
            return 0; // Not born yet.
        }
        if (year > this.startYear + 18) {
            // They've left home.
            return 0;
        }

        return this.annualCost * -1; // From some statistics.
    }

    this.getBalance = function (year, previousBalance) {
      return 0;
    }

    this.getInitialBalance = function() {
      return 0;
    }

    this.getAllocation = function(year) {
      return 0;
    }
}

