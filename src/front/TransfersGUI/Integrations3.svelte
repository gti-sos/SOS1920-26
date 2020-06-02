<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
  
    //Grupo 10  ---> (Cors)      https://sos1920-10.herokuapp.com/api/v2/global-divorces
  
  
    async function loadGraph() {
      const BASE_API_URL  = "/api/v3/global-transfers";
      const BASE_API_URL_10 = "https://sos1920-10.herokuapp.com/api/v2/global-divorces";
      
  
      const resData = await fetch(BASE_API_URL);
      const resData10 = await fetch(BASE_API_URL_10);

      let MyDataGraph = [];
      let DataGraph10 = [];
  
      let MyData = await resData.json();
      let Data10 = await resData10.json();
      console.log(Data10);
  
      MyData.forEach(x => {
        MyDataGraph.push({ name: x.team + " " + x.year, value: x.balance});
      });
  
      Data10.forEach(x => {
          DataGraph10.push({name: x.country + " " + x.year, value: x.divorce});
      });
  
  
      Highcharts.chart("container", {
        chart: {
          type: "packedbubble",
          height: "30%"
        },
        title: {
          text: "Integración entre el balance de los equipos en el mercado de fichajes, y el número de divorcios por país y año"
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
            data: MyDataGraph,
            tooltip: {
                  valueSuffix: ' M'
          },
          },
          {
            name: "Divorcios en ese año",
            data: DataGraph10, 
            tooltip: {
                  valueSuffix: ' Divorcios'
          },
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
          <a href="https://sos1920-10.herokuapp.com/api/v2/global-divorces" target="_blank"> Enlace a la API integrada (Grupo 10) </a>
      </p>
    </figure>
  
    <Button outline color="secondary" on:click={pop}>
      <i class="fas fa-arrow-circle-left" />
      Atrás
    </Button>
  </main>
  