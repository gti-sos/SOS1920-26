<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
  
    //Grupo 09  ---> (Cors)      https://sos1920-09.herokuapp.com/api/v3/oil-coal-nuclear-energy-consumption-stats
  
  
    async function loadGraph() {
      const BASE_API_URL  = "/api/v3/global-transfers";
      const BASE_API_URL_09 = "https://sos1920-09.herokuapp.com/api/v3/oil-coal-nuclear-energy-consumption-stats";
      
  
      const resData = await fetch(BASE_API_URL);
      const resData09 = await fetch(BASE_API_URL_09);
      let MyDataGraph = [];
      let DataGraph09 = [];
  
      let MyData = await resData.json();
      let Data09 = await resData08.json();
  
      MyData.forEach(x => {
        MyDataGraph.push({ name: x.team + " " + x.year, value: x.balance});
      });
  
      Data08.forEach(x => {
          DataGraph08.push({name: x.country + " " + x.year, value: x.oil-consumption});
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
            data: DataGraph09
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
          <a href="https://sos1920-09.herokuapp.com/api/v3/oil-coal-nuclear-energy-consumption-stats"> Enlace a la API integrada (Grupo 9) </a>
      </p>
    </figure>
  
    <Button outline color="secondary" on:click={pop}>
      <i class="fas fa-arrow-circle-left" />
      Atrás
    </Button>
  </main>
  