function f7(nbColisLivree,nbColisRetour,nbColisAutreTentative,nbColisLivraisonEncours, listDate, listData ) {
  var nbColisTotale = nbColisLivree+nbColisRetour+nbColisAutreTentative+nbColisLivraisonEncours;
  (function($) {
    'use strict';
    $(function() {
      if ($("#north-america-chart").length) {
        var areaData = {
          labels: ["Colis Livrés", "Colis à Retourner", "Colis à livrer", "Colis en cours de livraison" ],
          datasets: [{
            data: [(nbColisLivree/nbColisTotale*200), (nbColisRetour/nbColisTotale*200), (nbColisAutreTentative/nbColisTotale*200), (nbColisLivraisonEncours/nbColisTotale*200)],
            backgroundColor: [
              "#71c016", "#8caaff", "#248afd","#ffc33e"
            ],
            borderColor: "rgba(0,0,0,0)"
          }
          ]
        };
        var areaOptions = {
          responsive: true,
          maintainAspectRatio: true,
          segmentShowStroke: false,
          cutoutPercentage: 78,
          elements: {
            arc: {
              borderWidth: 4
            }
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          legendCallback: function(chart) {
            var text = [];
            text.push('<div class="report-chart">');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[0] + '"></div><p class="mb-0">Colis Livrés</p></div>');
            text.push('<p class="mb-0">'+nbColisLivree+'</p>');
            text.push('</div>');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[1] + '"></div><p class="mb-0">Colis Retour</p></div>');
            text.push('<p class="mb-0">'+nbColisRetour+'</p>');
            text.push('</div>');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[2] + '"></div><p class="mb-0">Colis à livrer</p></div>');
            text.push('<p class="mb-0">'+nbColisAutreTentative+'</p>');
            text.push('</div>');
            text.push('<div class="d-flex justify-content-between mx-4 mx-xl-5 mt-3"><div class="d-flex align-items-center"><div class="mr-3" style="width:20px; height:20px; border-radius: 50%; background-color: ' + chart.data.datasets[0].backgroundColor[3] + '"></div><p class="mb-0">Colis en cours de livraison</p></div>');
            text.push('<p class="mb-0">'+nbColisLivraisonEncours+'</p>');
            text.push('</div>');
            text.push('</div>');
            return text.join("");
          },
        }
        var northAmericaChartPlugins = {
          beforeDraw: function(chart) {
            var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = 3.125;
            ctx.font = "600 " + fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#000";

            var text = nbColisTotale,
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        }
        var northAmericaChartCanvas = $("#north-america-chart").get(0).getContext("2d");
        var northAmericaChart = new Chart(northAmericaChartCanvas, {
          type: 'doughnut',
          data: areaData,
          options: areaOptions,
          plugins: northAmericaChartPlugins
        });
        document.getElementById('north-america-legend').innerHTML = northAmericaChart.generateLegend();
      }

    });
  })(jQuery);
}
