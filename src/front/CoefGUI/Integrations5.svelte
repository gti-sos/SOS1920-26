<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";

  //Grupo 30  ---> (Proxy)       https://sos1920-30.herokuapp.com/api/v3/indice_de_masa_corporal


  async function loadGraph() {
    const BASE_API_URL  = "/api/v3/global-coef";
    const BASE_API_URL_30 = "/api/v3/indice_de_masa_corporal";
    

    const resData = await fetch(BASE_API_URL);
    const resData30 = await fetch(BASE_API_URL_30);
    let MyDataGraph = [];
    let DataGraph30 = [];

    let MyData = await resData.json();
    let Data30 = await resData30.json();

    MyData.forEach(x => {
      MyDataGraph.push({ name: x.country+" " + x.team + " " + x.year, value: x.coefficient});
    });

    Data30.forEach(x => {
        DataGraph30.push({name: x.place + " " + x.year, value: x.indice_de_masa_corporal});
    });


    Highcharts.chart("container", {
      chart: {
        type: "packedbubble",
        height: "30%"
      },
      title: {
        text: "Integración entre los coeficientes de los países y equipos pertenecientes a la UEFA, y índice de masa corporal de cada país"
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
          name: "Índice de masa corporal",
          data: DataGraph30,
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
        <a href="https://sos1920-30.herokuapp.com/api/v3/indice_de_masa_corporal" target="_blank"> Enlace a la API integrada (Grupo 30) </a>
    </p>
  </figure>

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
