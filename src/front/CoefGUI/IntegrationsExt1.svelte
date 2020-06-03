<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";


  async function loadGraph() {
    const BASE_API_URL = "/api/v3/global-coef";


    const resData = await fetch(BASE_API_URL);
    const resDataEXT = await fetch("https://food-calorie-data-search.p.rapidapi.com/api/search?keyword=hotdog", {
      "method":
        "GET",
      "headers": {
        "x-rapidapi-host": "food-calorie-data-search.p.rapidapi.com",
        "x-rapidapi-key": "d4b6d198e8msh7cb79ab7000e2a0p1da3b3jsn01fefb4e5a73"
      }
    });

    let MyDataGraph = [];
    let DataGraphEXT = [];

    let MyData = await resData.json();
    let DataEXT = await resDataEXT.json();

    MyData.forEach(x => {
      MyDataGraph.push({ name: x.team + " " + x.year, value: x.coefficient });
    });

    let DataExterna = DataEXT;

    
    DataExterna.forEach(x => {


      DataGraphEXT.push({ name: x.shrt_desc, value: parseFloat(x.energ_kcal) });

    });

console.log(DataExterna);


    Highcharts.chart("container", {
      chart: {
        type: "packedbubble",
        height: "30%"
      },
      title: {
        text: "Integración entre los fichajes de los equipos por año en el mercado de fichajes, y los fichajes de algunos equipos por su nombre y valor"
      },
      tooltip: {
        useHTML: true,
        pointFormat: "<b>{point.name}:</b> {point.value}"
      },
      plotOptions: {
        packedbubble: {
          minSize: "50%",
          maxSize: "180%",
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
          name: "Coeficiente",
          data: MyDataGraph,
          tooltip: {
            valueSuffix: ' '
          }
        },
        {
          name: "Calorías",
          data: DataGraphEXT,
          tooltip: {
            valueSuffix: ' enegía aportada'
          }
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
  <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}>

  </script>
</svelte:head>
<main>

  <figure class="highcharts-figure">
    <div id="container" />
    <p class="highcharts-description">
      <a href="https://rapidapi.com/kenpi04/api/food-calorie-data-search" target="_blank"> Enlace a la API integrada
        (API calorías) </a>
    </p>
  </figure>

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>