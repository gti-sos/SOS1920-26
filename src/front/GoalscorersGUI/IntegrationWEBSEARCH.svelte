<script>
  import { pop } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  let BASE_API_URL = "/api/v3";

  async function loadGraph() {
    let MyData = [];
    let MyDataGraph = [];
    let DataGraphAPI = [];
    var apariciones;
    const resData = await fetch(BASE_API_URL + "/goalscorers");
    MyData = await resData.json();
    console.log(MyData);
    for (const dato of MyData) {
      const resDataAPI = await fetch(
        "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?autoCorrect=true&pageNumber=1&pageSize=10&q=" +
          dato.name +
          "&safeSearch=false",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "contextualwebsearch-websearch-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "45a177f5c0msh64fa2c118add799p118a18jsn7e63bf635a62"
          }
        }
      );
      if (resDataAPI.ok) {
        const json = await resDataAPI.json();
        DataGraphAPI = json;
        console.log(DataGraphAPI);
      } else {
        console.log("ERROR");
      }
      apariciones = DataGraphAPI.totalCount;
      if (apariciones > 0) {
        MyDataGraph.push({
          name: dato.name,
          y: apariciones,
          drilldown: "null"
        });
      }
    }

    Highcharts.chart("container", {
      chart: {
        type: "column"
      },
      title: {
        text: "Números de apariciones del nombre del jugador en una búsqueda"
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        type: "category"
      },
      yAxis: {
        title: {
          text: "Apariciones del nombre del jugador"
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: "{point.y}"
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> apariciones.<br/>'
      },

      series: [
        {
          name: "Apariciones",
          colorByPoint: true,
          dataSorting: {
            enabled: true
          },
          data: MyDataGraph
        }
      ]
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js">

  </script>
  <script src="https://code.highcharts.com/modules/data.js">

  </script>
  <script src="https://code.highcharts.com/modules/drilldown.js">

  </script>
  <script src="https://code.highcharts.com/modules/exporting.js">

  </script>
  <script src="https://code.highcharts.com/modules/export-data.js">

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
      Integración de la API
      <a
        href="https://rapidapi.com/contextualwebsearch/api/web-search"
        target="_blank">
        Web Search
      </a>
      . Gráfico que muestra el número de veces que aparece el nombre de un jugador en las 10 webs de la primera página de una búsqueda web. <b>Es posible que los datos
      tarden unos segundos en cargar.</b>
    </p>
  </figure>
  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
