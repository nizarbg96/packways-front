function sticksChart( listDateLivree, listDataLivree, max, listDateTaux, listDataTaux ) {
  (function($) {
    'use strict';
    $(function() {
      if ($("#sales-chart").length) {
        var SalesChartCanvas = $("#sales-chart").get(0).getContext("2d");
        var SalesChart = new Chart(SalesChartCanvas, {
          type: 'bar',
          data: {
            labels: listDateLivree,
            datasets: [{
              label: 'Nombre de Colis livree',
              data: listDataLivree,
              backgroundColor: '#8EB0FF'
            }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 20,
                bottom: 0
              }
            },
            scales: {
              yAxes: [{
                display: true,
                gridLines: {
                  display: false,
                  drawBorder: false
                },
                ticks: {
                  display: false,
                  min: 0,
                  max: max
                }
              }],
              xAxes: [{
                stacked: false,
                ticks: {
                  beginAtZero: true,
                  fontColor: "#9fa0a2"
                },
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                  display: false
                },
                barPercentage: 1
              }]
            },
            legend: {
              display: false
            },
            elements: {
              point: {
                radius: 0
              }
            }
          },
        });
        document.getElementById('sales-legend').innerHTML = SalesChart.generateLegend();
      }


      if ($("#order-chart").length) {
      var areaData = {
        labels: listDateTaux,
        datasets: [
          {
            data: listDataTaux,
            backgroundColor: [
              'rgba(255, 193, 2, .8)'
            ],
            borderColor: [
              'transparent'
            ],
            borderWidth:3,
            fill: 'origin',
            label: "Success rate"
          }
        ]
      };
      var areaOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          filler: {
            propagate: true
          }
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              display: true
            },
            gridLines: {
              display: true,
              drawBorder: true,
              color: 'transparent',
              zeroLineColor: '#eeeeee'
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              display: true,
              autoSkip: true,
              maxRotation: 0,
              stepSize: 50,
              min: 0,
              max: 100
            },
            gridLines: {
              drawBorder: true
            }
          }]
        },
        legend: {
          display: true
        },
        tooltips: {
          enabled: true
        },
        elements: {
          line: {
            tension: .45
          },
          point: {
            radius: 0
          }
        }
      }
      var salesChartCanvas = $("#order-chart").get(0).getContext("2d");
      var salesChart = new Chart(salesChartCanvas, {
        type: 'line',
        data: areaData,
        options: areaOptions
      });
    }



    });
  })(jQuery);
}
