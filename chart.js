/*

  this is responsible for maintaining and updating a chart.

*/

Chart.defaults.global.animation = false;



function ChartModel() {

    this.series = [];
    this.labels = [];
    this.displayArea = "";
    this.stackData = false;

    this.options = {
      // Don't draw the line chart points
      showPoint: false,
      // Disable line smoothing
      lineSmooth: false,
      // X-Axis specific configuration
      axisX: {
        // We can disable the grid for this axis
        showGrid: false,
        // and also don't show the label
        showLabel: false
      },
      // Y-Axis specific configuration
      axisY: {
        // Lets offset the chart a bit from the labels
        offset: 40,
        // The label interpolation function enables you to modify the values
        // used for the labels on each axis. Here we are converting the
        // values into million pound.
        labelInterpolationFnc: function(value) {
          return '$' + value + 'm';
        }
      }
    };

    this.setSeries = function(series) {
      this.series = series;
    }

    this.setLabels = function(labels) {
      this.labels = labels;
    }

    this.setDisplayArea = function(displayArea) {
      this.displayArea = displayArea;
    }

    this.setStackData = function(stackData) {
      this.stackData = stackData;
    }

    this.getSeries = function() {
      var data = [];

      if (this.stackData) {
        // stack the lines
        for (var i = 0; i < this.series.length; i++) {
          for (var j = 0; j < i; j++) {
            for (var k = 0; k < data[j].length; k++) {
              data[j][k] += this.series[i][k];
            }
          }
          data.push(this.series[i]);
        }
      } else {
        data = this.series;
      }

      // Round it to the nearest integers
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          data[i][j] = Math.round(data[i][j]);
        }
      }

      return data;
    }

    this.draw = function() {
      this.drawForChartjs();
    }

    this.drawForChartist = function() {

      var data = this.getSeries();

      new Chartist.Line(this.displayArea, {labels: this.labels, series: data}, this.options);
    }

    this.drawForChartjs = function() {

      var incomeData = {datasets: [], labels: []};

      var data = this.getSeries();

      for (var i = 0; i < data.length; i++) {

        incomeData.datasets.push({
          label: this.labels[i],
          fillColor: "rgba(151,187,205,0)",
          strokeColor: "rgba(151,187,205,0.8)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: data[i]
        })

      }

      incomeData.labels = this.labels;

      var ctx = document.getElementById(this.displayArea).getContext("2d");

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx).Line(incomeData);

    
    }


  }