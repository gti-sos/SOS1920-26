<script>
  import { pop } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  let BASE_API_URL = "/api/v3";
  let BASE_API_URL_G22 = "http://sos1920-22.herokuapp.com/api/v2/formula-stats";
  async function loadGraph() {
    let DataAPI = [];
    let MyData = [];
    let MyDataGraph = [];
    let DataGraphAPI = [];
    const resData = await fetch(BASE_API_URL + "/goalscorers");
    MyData = await resData.json();
    MyData.forEach(x => {
      MyDataGraph.push({ name: x.name, value: x.goals});
    });

    const resDataAPI = await fetch(BASE_API_URL_G22);
    DataAPI = await resDataAPI.json();
    DataAPI.forEach(x => {
        DataGraphAPI.push({name: x.country + ", " + x.year, value: x.totalpointnumber});
    });

    Highcharts.chart("container", {
      chart: {
        type: "packedbubble",
        height: "100%"
      },
      title: {
        text: "Gráfica con goleadores de la UCL y sus respectivos goles frente a los puntos obtenidos en F1 cada año por país."
      },
      tooltip: {
        useHTML: true,
        pointFormat: "<b>{point.name}:</b> {point.value}"
      },
      plotOptions: {
        packedbubble: {
          minSize: "30%",
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
          name: "Puntos totales según año y país",
          data: DataGraphAPI
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
      Packed bubble charts are visualizations where the size and optionally the
      color of the bubbles are used to visualize the data. The positioning of
      the bubbles is not significant, but is optimized for compactness. Try
      dragging the bubbles in this chart around, and see the effects.
    </p>
  </figure>

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
