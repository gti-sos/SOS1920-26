<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";

  //Grupo 08  ---> (Cors)      http://sos1920-08.herokuapp.com/api/v2/ucl_stats


  async function loadGraph() {
    const BASE_API_URL  = "/api/v3/global-transfers";
    const BASE_API_URL_08 = "http://sos1920-08.herokuapp.com/api/v2/ucl_stats";
    

    const resData = await fetch(BASE_API_URL);
    const resData08 = await fetch(BASE_API_URL_08);
    let MyDataGraph = [];
    let DataGraph08 = [];

    let MyData = await resData.json();
    let Data08 = await resData08.json();

    MyData.forEach(x => {
      MyDataGraph.push({ name: x.team, value: x.balance});
    });

    Data08.forEach(x => {
        DataGraph08.push({name: x.team, value: x.title});
    });


    Highcharts.chart("container", {
      chart: {
        type: "packedbubble",
        height: "30%"
      },
      title: {
        text: "Integración entre el balance de los equipos, y sus títulos de UEFA Champions League"
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
          name: "Balance total",
          data: MyDataGraph
        },
        {
          name: "Títulos UCL",
          data: DataGraph08
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
    <p class="highcharts-description">
        <a href="http://sos1920-08.herokuapp.com/api/v2/ucl_stats"> Enlace a la API integrada (Grupo 8) </a>
    </p>
  </figure>

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
