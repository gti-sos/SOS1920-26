<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";


  async function loadGraph() {
    const BASE_API_URL = "/api/v3/global-coef";


    const resData = await fetch(BASE_API_URL);
    const resDataEXT = await fetch("https://restcountries-v1.p.rapidapi.com/region/africa", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
        "x-rapidapi-key": "c30851ea3emshe9d9a8e76f6e8fdp199665jsn2c72771dbd6e"
      }
    });

    let MyDataGraph = [];
    let DataGraphEXT = [];

    let MyData = await resData.json();
    let DataEXT = await resDataEXT.json();

    MyData.forEach(x => {
      MyDataGraph.push({ name: x.country + " " + x.year, value: x.coefficient });
    });

    let DataExterna = DataEXT;


    DataExterna.forEach(x => {


      DataGraphEXT.push({ name: x.name, value: parseFloat(x.gini) });

    });

    console.log(DataExterna);


    Highcharts.chart("container", {
      chart: {
        type: "packedbubble",
        height: "30%"
      },
      title: {
        text: "Integración entre los coeficientes por países, y la desigualdad en los países africanos"
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
          name: "Gini",
          data: DataGraphEXT,
          tooltip: {
            valueSuffix: ' '
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
      <a href="https://rapidapi.com/apilayernet/api/rest-countries-v1?endpoint=53aa5a09e4b051a76d24136a"
        target="_blank"> Enlace a la API integrada
        (API REST Countries v1) </a>
    </p>
  </figure>

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>