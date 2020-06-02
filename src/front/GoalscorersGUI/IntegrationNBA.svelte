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
      MyDataGraph.push({ name: x.name, value: x.goals });
    });

    const resDataAPI = await fetch(
      "https://api-nba-v1.p.rapidapi.com/players/teamId/1",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key": "45a177f5c0msh64fa2c118add799p118a18jsn7e63bf635a62"
        }
      });

    if (resDataAPI.ok){
      console.log("Ok, api externa 1 cargada");
      const json = await resDataAPI.json();
      DataGraphAPI = json;
    }else{
      console.log("ERROR");
    }
    DataGraphAPIExterna = DataGraphAPI.api;
    MyData2 = DataGraphAPIExterna.players;
    MyData2.forEach(x => {
      if(parseInt(x.startNba) != 0){
        DataAPI.push({name: x.firstName + " " + x.lastName, value: parseInt(x.startNba)});
      }
    });
    console.log(MyDataGraph);
    console.log(DataAPI);
    Highcharts.chart("container", {
      chart: {
        type: "packedbubble",
        height: "30%"
      },
      title: {
        text:
          "Gráfica con goleadores de la UCL y sus respectivos goles frente a las muertes por accidentes de tráfico según la comunidad autónoma y el año."
      },
      tooltip: {
        useHTML: true,
        pointFormat: "<b>{point.name}:</b> {point.value}"
      },
      plotOptions: {
        packedbubble: {
          minSize: "80%",
          maxSize: "120%",
          zMin: 0,
          zMax: 1000,
          layoutAlgorithm: {
            splitSeries: false,
            gravitationalConstant: 0.02
          },
          dataLabels: {
            enabled: true,
            format: "{point.name}",
            filter: {
              property: "y",
              operator: ">",
              value: 250
            },
            style: {
              color: "black",
              textOutline: "none",
              fontWeight: "normal"
            }
          }
        }
      },
      series: [
        {
          name: "Goles del goleador",
          data: MyDataGraph
        },
        {
          name: "Muertes según comunidad y año",
          data: DataAPI
        }
      ]
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js">

  </script>
  <script src="https://code.highcharts.com/highcharts-more.js">

  </script>
  <script src="https://code.highcharts.com/modules/exporting.js">

  </script>
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadGraph}>

  </script>
</svelte:head>
<main>

  <figure class="highcharts-figure">
    <div id="container" />
    <p class="highcharts-description" align="center">
      Los goleadores están de un color y los accidentes de tráfico según la
      comunidad autónoma y el año de otro color. Integración hecha a la
      dirección http://sos1920-21.herokuapp.com/api/v2/traffic-injuries.
    </p>
  </figure>

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
