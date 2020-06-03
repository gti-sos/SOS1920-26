<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";
  
    //API EXTERNA  --->     https://rapidapi.com/api-sports/api/api-football
  
  
    async function loadGraph() {
      const BASE_API_URL  = "/api/v3/global-transfers";
           
  
      const resData = await fetch(BASE_API_URL);
      const resDataEXT = await fetch("https://api-football-v1.p.rapidapi.com/v2/transfers/team/33", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
		"x-rapidapi-key": "bdae1e0e15mshd965fc5b898b015p1064f1jsn280cf3b661d7"
	}
        });

      let MyDataGraph = [];
      let DataGraphEXT = [];
  
      let MyData = await resData.json();
      let DataEXT = await resDataEXT.json();
  
      MyData.forEach(x => {
        MyDataGraph.push({ name: x.team + " - " + x.year, value: x.signing});
      });

      let DataExterna = DataEXT.api;
      let DataExternaFichajes = DataExterna.transfers;
      //console.log(DataExternaFichajes);

      function extEquipoComp (x){
          let aux = x.team_in
          return aux.team_name
      }

      function quitarcaracteres (x){
        let aux = x.replace('€', '')
        //aux = aux.replace('M', '')
        if (aux.includes('K')){
          let parseao = parseFloat(aux)
          parseao = parseao * 0.001
          return parseao
        }
        return aux
      }

      DataExternaFichajes.forEach(x => {
          //let aux = x.team_in
          //let equipoComprado = aux.team_name
          //console.log(equipoComprado)
          console.log(extEquipoComp(x))
          if (x.type != null && x.type != "Loan" && x.type != "N/A" && x.type != "Swap" && x.type != "Free" ){
          DataGraphEXT.push({name: extEquipoComp(x) + " - " + x.player_name, value: parseFloat(quitarcaracteres(x.type))});
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
            name: "Número de Fichajes",
            data: MyDataGraph,
            tooltip: {
                    valueSuffix: ' Fichajes'
            }
          },
          {
            name: "Fichaje",
            data: DataGraphEXT,
            tooltip: {
                    valueSuffix: ' M'
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
          <a href="https://rapidapi.com/api-sports/api/api-football" target="_blank"> Enlace a la API integrada (APIFootball) </a>
      </p>
    </figure>
  
    <Button outline color="secondary" on:click={pop}>
      <i class="fas fa-arrow-circle-left" />
      Atrás
    </Button>
  </main>
  