<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
    //Grupo 05  ---> (Cors)    https://sos1920-05.herokuapp.com/api/v1/books-exports
    async function loadGraph() {
      const BASE_API_URL  = "/api/v3/global-coef";
      const BASE_API_URL_05 = "https://sos1920-05.herokuapp.com/api/v1/books-exports";
      
      const resData = await fetch(BASE_API_URL);
      const resData05 = await fetch(BASE_API_URL_05);
      let MyDataGraph = [];
      let DataGraph05 = [];
      let MyData = await resData.json();
      let Data05 = await resData05.json();
      MyData.forEach(x => {
        MyDataGraph.push({ name: x.country + " " + x.year, value: x.coefficient});
      });
      Data05.forEach(x => {
          DataGraph05.push({name: x.country + " " + x.year, value: x.exp_graphic_sector});
      });
      Highcharts.chart("container", {
        chart: {
          type: "packedbubble",
          height: "30%"
        },
        title: {
          text:  "Integración entre los coeficientes de los países pertenecientes a la UEFA, y la exportación de libros"
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
            name: "Libros exportados",
            data: DataGraph05,
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
          <a href="https://sos1920-05.herokuapp.com/api/v1/books-exports" target="_blank"> Enlace a la API integrada (Grupo 5) </a>
      </p>
    </figure>
  
    <Button outline color="secondary" on:click={pop}>
      <i class="fas fa-arrow-circle-left" />
      Atrás
    </Button>
  </main>