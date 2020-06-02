<script>
  import { pop } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  let BASE_API_URL = "/api/v3";

  async function loadGraph() {
    let DataAPI = [];
    let MyData = [];
    let MyData2 = [];
    let MyDataGraph = [];
    let DataGraphAPI = [];
    let DataGraphAPIExterna = [];
    const resData = await fetch(BASE_API_URL + "/goalscorers");
    MyData = await resData.json();
    MyData.forEach(x => {
      MyDataGraph.push({name: x.name, y: 2020 - x.debut, drilldown: 'null'});
    });

    const resDataAPI = await fetch(
      "https://api-nba-v1.p.rapidapi.com/players/teamId/1",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key": "45a177f5c0msh64fa2c118add799p118a18jsn7e63bf635a62"
        }
      }
    );

    if (resDataAPI.ok) {
      console.log("Ok, api externa 1 cargada");
      const json = await resDataAPI.json();
      DataGraphAPI = json;
    } else {
      console.log("ERROR");
    }
    DataGraphAPIExterna = DataGraphAPI.api;
    MyData2 = DataGraphAPIExterna.players;
    MyData2.forEach(x => {
      if (parseInt(x.startNba) != 0) {
        DataAPI.push({name: x.firstName + " " + x.lastName, y: 2020 - parseInt(x.startNba), drilldown: 'null'});
      }
    });
    console.log(MyDataGraph);
    console.log(DataAPI);

Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Años que han pasado desde que debutaron los jugadores.'
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
            text: 'Años desde su debut'
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
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> años desde que debutó.<br/>'
    },

    series:  [
        {
            name: "Jugadores",
            colorByPoint: true, 
            dataSorting: {
                enabled: true
            },
            data: MyDataGraph.concat(DataAPI)
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
    <div id="container" />
    <p class="highcharts-description" align="center">
      Integración de la API https://rapidapi.com/api-sports/api/api-nba, se comparan los años pasados desde
      el debut de los jugadores del Atlanta Hawks y los años pasados desde el debut de los máximos goleadores de la UCL.
    </p>
  </figure>

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
