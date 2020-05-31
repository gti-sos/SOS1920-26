<script>
import { pop } from "svelte-spa-router";
import Button from "sveltestrap/src/Button.svelte";
let BASE_API_URL = "/api/v3";
async function loadGraph() {
    let MyData = [];
        let MyDataGraph = [];
        const resData = await fetch(BASE_API_URL + "/goalscorers");
        MyData = await resData.json();
        MyData.forEach( (x) => {
            MyDataGraph.push({name: x.name, y: x.goals, drilldown: 'null'});
        });
// Create the chart
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Goles de los máximos goleadores de la UCL'
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: 'Goles totales'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> goles desde que debutó.<br/>'
    },

    series:  [
        {
            name: "Goleadores",
            colorByPoint: true, 
            dataSorting: {
                enabled: true
            },
            data: MyDataGraph
        }
    ]
});
}
</script>
<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/data.js"></script>
    <script src="https://code.highcharts.com/modules/drilldown.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
</svelte:head>
<main>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Gráfico que muestra los goles marcados por los máximos goleadores.
    </p>
</figure>
<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</main>