<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";

  //Grupo 6  ---> (Proxy)       https://sos1920-06.herokuapp.com/api/v2/accstats


  async function loadGraph() {
    const BASE_API_URL  = "/api/v3/global-coef";
    const BASE_API_URL_06 = "/api/v2/accstats";
    

    const resData = await fetch(BASE_API_URL);
    const resData06 = await fetch(BASE_API_URL_06);
    let MyDataGraph = [];
    let DataGraph06 = [];

    let MyData = await resData.json();
    let Data06 = await resData06.json();

    MyData.forEach(x => {
      MyDataGraph.push({ name: x.country+" " + x.team + " " + x.year, value: x.coefficient});
    });

    Data06.forEach(x => {
        DataGraph06.push({name: x.province + " " + x.year, value: x.accvictotal});
    });


    Highcharts.chart("container", {
      chart: {
        type: "packedbubble",
        height: "30%"
      },
      title: {
        text: "Integración entre los coeficientes de los países y equipos pertenecientes a la UEFA, y los accidentes de tráfico totales por provincias"
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
          name: "Coeficiente",
          data: MyDataGraph,
          tooltip: {
                  valueSuffix: ' '
          }
        },
        {
          name: "Accidentes de tráfico",
          data: DataGraph06,
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
  <script
    src="https://code.highcharts.com/modules/accessibility.js"
    on:load={loadGraph}>

  </script>
</svelte:head>
<main>

  <figure class="highcharts-figure">
    <div id="container" />
    <p class="highcharts-description">
        <a href="https://sos1920-06.herokuapp.com/api/v2/accstats" target="_blank"> Enlace a la API integrada (Grupo 6) </a>
    </p>
  </figure>

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
