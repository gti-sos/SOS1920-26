<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
  
    //Grupo 21  ---> (Cors)      https://sos1920-21.herokuapp.com/api/v2/driving-licenses
  
  
    async function loadGraph() {
      const BASE_API_URL  = "/api/v3/global-transfers";
      const BASE_API_URL_21 = "https://sos1920-21.herokuapp.com/api/v2/driving-licenses";
      
  
      const resData = await fetch(BASE_API_URL);
      const resData21 = await fetch(BASE_API_URL_21);

      let MyDataGraph = [];
      let DataGraph21 = [];
  
      let MyData = await resData.json();
      let Data21 = await resData21.json();
      console.log(Data21);
  
      MyData.forEach(x => {
        MyDataGraph.push({ name: x.team + " " + x.year, value: x.balance});
      });
  
      Data21.forEach(x => { if(x.aut_com == "andalusia"){
          DataGraph21.push({name: x.aut_com + " " + x.year, value: x.total_cars});
      }
      });
  
  
      Highcharts.chart("container", {
        chart: {
          type: "packedbubble",
          height: "30%"
        },
        title: {
          text: "Integración entre el balance de los equipos en el mercado de fichajes, y el número de licencias por año en Andalucía"
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
            zMax: 2210,
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
            name: "Licencias de conducir",
            data: DataGraph21, 
            tooltip: {
                  valueSuffix: ' Coches totales'
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
          <a href="https://sos1920-21.herokuapp.com/api/v2/driving-licenses" target="_blank"> Enlace a la API integrada (Grupo 21) </a>
      </p>
    </figure>
  
    <Button outline color="secondary" on:click={pop}>
      <i class="fas fa-arrow-circle-left" />
      Atrás
    </Button>
  </main>
  