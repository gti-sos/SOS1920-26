<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
  
    //API EXTERNA  --->     https://rapidapi.com/montanaflynn/api/fifa-world-cup
  
  
    async function loadGraph() {
      const BASE_API_URL  = "/api/v3/global-transfers";
      
      async function cargaApiExterna(){
        fetch("https://montanaflynn-fifa-world-cup.p.rapidapi.com/teams", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "montanaflynn-fifa-world-cup.p.rapidapi.com",
		    "x-rapidapi-key": "bdae1e0e15mshd965fc5b898b015p1064f1jsn280cf3b661d7",
		    "accepts": "json"
	        }
        })
        .then(response => {
	        console.log(response);
        })
        .catch(err => {
    	    console.log(err);
            });
        }
      
  
      const resData = await fetch(BASE_API_URL);
      const resDataEXT = await cargaApiExterna();
      let MyDataGraph = [];
      let DataGraphEXT = [];
  
      let MyData = await resData.json();
      let DataEXT = await resDataEXT.json();
  
      MyData.forEach(x => {
        MyDataGraph.push({ name: x.team + " " + x.year, value: x.balance});
      });
  
      DataEXT.forEach(x => {
          DataGraphEXT.push({name: x.code + " - " + x.country_id, value: x.title});
      });
  
  
      Highcharts.chart("container", {
        chart: {
          type: "packedbubble",
          height: "30%"
        },
        title: {
          text: "Integración entre el balance de los equipos en el mercado de fichajes, y la demanda segun gobierno y año de las plazas universitarias en Andalucía"
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
            }
          },
          {
            name: "Equipos copa del mundo con su código",
            data: DataGraphEXT
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
          <a href="https://rapidapi.com/montanaflynn/api/fifa-world-cup" target="_blank"> Enlace a la API integrada (WorldCup) </a>
      </p>
    </figure>
  
    <Button outline color="secondary" on:click={pop}>
      <i class="fas fa-arrow-circle-left" />
      Atrás
    </Button>
  </main>
  