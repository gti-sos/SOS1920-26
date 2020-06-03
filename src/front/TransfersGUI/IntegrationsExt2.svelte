<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
  
    //API EXTERNA  --->     https://rapidapi.com/ebappa1971/api/amazon-price
  
  
    async function loadGraph() {
      const BASE_API_URL  = "/api/v3/global-transfers";
           
  
      const resData = await fetch(BASE_API_URL);
      const resDataEXT = await fetch("https://amazon-price.p.rapidapi.com/azapi-azSearch?prime=false&query=affiliate%20marketing&page=1", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "amazon-price.p.rapidapi.com",
		"x-rapidapi-key": "bdae1e0e15mshd965fc5b898b015p1064f1jsn280cf3b661d7"
	}
        });

      let MyDataGraph = [];
      let DataGraphEXT = [];
  
      let MyData = await resData.json();
      let DataEXT = await resDataEXT.json();
      
  
      MyData.forEach(x => {
        MyDataGraph.push({ name: x.team + " - " + x.year, value: x.sale});
      });

      let DataExterna = DataEXT.results;
      console.log(DataExterna)
      

      function quitarcaracteres (x){
        let aux = x.replace('$', '')
        
        return aux
      }

      DataExterna.forEach(x => {
        if(quitarcaracteres(x.price) != 0){  
        DataGraphEXT.push({name: x.asin, value: parseFloat(quitarcaracteres(x.price))});
        }
      });

      DataGraphEXT = DataGraphEXT.slice(0, 20);
      console.log(DataGraphEXT);
  
  
      Highcharts.chart("container", {
        chart: {
          type: "packedbubble",
          height: "30%"
        },
        title: {
          text: "Integración entre las ventas de los equipos por año en el mercado de fichajes, y los precios de los productos vendidos en amazon por referencia"
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
            name: "Número de Fichajes",
            data: MyDataGraph,
            tooltip: {
                    valueSuffix: ' Ventas'
            }
          },
          {
            name: "Producto en Amazon",
            data: DataGraphEXT,
            tooltip: {
                    valueSuffix: ' $'
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
          <a href="https://rapidapi.com/ebappa1971/api/amazon-price" target="_blank"> Enlace a la API integrada (amazon-price) </a>
      </p>
    </figure>
  
    <Button outline color="secondary" on:click={pop}>
      <i class="fas fa-arrow-circle-left" />
      Atrás
    </Button>
  </main>
  