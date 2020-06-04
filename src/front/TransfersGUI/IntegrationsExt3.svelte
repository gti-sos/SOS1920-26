<script>
  import { pop } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  let BASE_API_URL = "/api/v3";

  async function loadGraph() {
    let MyData = [];
    let MyDataGraph = [];
    let DataGraphAPI = [];
    let ciudades = [];
    let paises = [];
    const resData = await fetch(BASE_API_URL + "/global-transfers");
    MyData = await resData.json();
    console.log(MyData);
    for (const dato of MyData) {
      const resDataAPI = await fetch(
        "https://andruxnet-world-cities-v1.p.rapidapi.com/?query="+ dato.country +"&searchby=country",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "andruxnet-world-cities-v1.p.rapidapi.com",
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
      for (const datoAPI of DataGraphAPI){
        if(!ciudades.includes(datoAPI.state)){
          ciudades.push(datoAPI.state);
        }
      }
      console.log(ciudades);
      if (ciudades.length > 0 && !paises.includes(dato.country)) {
        MyDataGraph.push({
          name: dato.country + " - " + dato.name,
          y: ciudades.length,
          drilldown: "null"
        });
        paises.push(dato.country);
      }
      ciudades = [];
    }

    Highcharts.chart("container", {
      chart: {
        type: "column"
      },
      title: {
        text: "Números de ciudades en los países de cada jugador"
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
          text: "Ciudades totales"
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
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> ciudades.<br/>'
      },

      series: [
        {
          name: "Ciudades",
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
        href="https://rapidapi.com/andruxnet/api/world-cities"
        target="_blank">
        World Cities
      </a>
      . Gráfico que muestra el número de ciudades que tiene el país de cada jugador.
      Si el país es repetido o el nombre de país de las APIs no coinciden, no se añaden los datos.
      <b>Es posible que los datos tarden unos segundos en cargar.</b>
    </p>
  </figure>
  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
