<script>
  import Button from "sveltestrap/src/Button.svelte";
  import { pop } from "svelte-spa-router";

  //API EXTERNA  --->     https://rapidapi.com/apidojo/api/tripadvisor1/


  async function loadGraph() {
    const BASE_API_URL  = "/api/v3/global-transfers";
         

    const resData = await fetch(BASE_API_URL);
    const resDataEXT = await fetch("https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=EUR&limit=30&order=asc&lang=en_US&sort=recommended&location_id=293919&adults=1&checkin=%3Crequired%3E&rooms=1&nights=2", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
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
console.log(DataEXT)
    let DataExterna = DataEXT.data;
    console.log(DataExterna)
    DataExterna = DataExterna.slice(0, 15);

    DataExterna.forEach(x => {
      if(x.timezone == "Asia/Bangkok" && x.ranking_category == "hotel"){  
      DataGraphEXT.push({name: x.name, value: parseFloat((x.num_reviews))});
      }
    });


    Highcharts.chart("container", {
      chart: {
        type: "packedbubble",
        height: "30%"
      },
      title: {
        text: "Integración entre las ventas de los equipos por año en el mercado de fichajes, y las reviews de hoteles según tripadvisor"
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
          name: "Número de Ventas",
          data: MyDataGraph,
          tooltip: {
                  valueSuffix: ' Ventas'
          }
        },
        {
          name: "Número de Reviews de hoteles en Bangkok",
          data: DataGraphEXT,
          tooltip: {
                  valueSuffix: ' reviews'
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
        <a href="https://rapidapi.com/apidojo/api/tripadvisor1" target="_blank"> Enlace a la API integrada (tripadvisor) </a>
    </p>
  </figure>

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
