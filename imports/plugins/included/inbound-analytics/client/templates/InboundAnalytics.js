// import { Meteor } from "meteor/meteor";
// @TODO import collection and tools

Template.InboundAnalytics.onCreated(function () {
  // Load Charts and the corechart package.
  google.charts.load("current", {packages: ["corechart", "line", "table"]});

  // Draw the pie chart for Sarah"s pizza when Charts is loaded.
  google.charts.setOnLoadCallback(drawLineChart);

  // Draw the pie chart for the Anthony"s pizza when Charts is loaded.
  google.charts.setOnLoadCallback(drawPieChart);

  // Callback that draws the pie chart.
  function drawPieChart() {
    // Create the data table for Sarah"s pizza.
    const data = new google.visualization.DataTable();
    data.addColumn("string", "Topping");
    data.addColumn("number", "Slices");
    data.addRows([
        ["Sales", 9],
        ["In Cart", 5],
        ["Views", 18]
    ]);

    // Set options for Sarah"s pie chart.
    const options = {
      title: "Product peformance stats overview",
      height: 500,
      pieHole: 0.3

    };

    // Instantiate and draw the chart for Sarah"s pizza.
    const chart = new google.visualization.PieChart(document.getElementById("piechart"));
    chart.draw(data, options);
  }

  // Callback that draws the line chart
  function drawLineChart() {
    const data = new google.visualization.DataTable();
    data.addColumn("date", "Days");
    data.addColumn("number", "Views");
    data.addColumn("number", "Sales");
    data.addColumn("number", "In Cart");

    data.addRows([
        [new Date(2015, 0, 1),  37.8, 80.8, 41.8],
        [new Date(2015, 0, 2),  30.9, 69.5, 32.4],
        [new Date(2015, 0, 3),  25.4,   57, 25.7],
        [new Date(2015, 0, 4),  11.7, 18.8, 10.5],
        [new Date(2015, 0, 5),  11.9, 17.6, 10.4],
        [new Date(2015, 0, 6),   8.8, 13.6,  7.7],
        [new Date(2015, 0, 7),   7.6, 12.3,  9.6],
        [new Date(2015, 0, 8),  12.3, 29.2, 10.6],
        [new Date(2015, 0, 9),  16.9, 42.9, 14.8],
        [new Date(2015, 0, 10), 12.8, 30.9, 11.6],
        [new Date(2015, 0, 11),  5.3,  7.9,  4.7],
        [new Date(2015, 0, 12),  6.6,  8.4,  5.2],
        [new Date(2015, 0, 13),  4.8,  6.3,  3.6],
        [new Date(2015, 0, 14),  4.2,  6.2,  3.4]
    ]);

    const options = {
      chart: {
        title: "Product peformance for all products",
        subtitle: "in Quantity over time"
      },
      width: 900,
      height: 500
    };

    const chart = new google.charts.Line(document.getElementById("linechart"));
    chart.draw(data, options);
  }
});

