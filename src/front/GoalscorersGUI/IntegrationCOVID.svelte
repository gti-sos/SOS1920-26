<script>
  import { pop } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  let BASE_API_URL = "/api/v3";

  async function loadGraph() {
    let MyData = [];
    let MyDataGraph = [];
    let DataGraphAPI = [];
    var fallecidos;
    let countries = [];
    const resData = await fetch(BASE_API_URL + "/goalscorers");
    MyData = await resData.json();
    console.log(MyData);
    for (const dato of MyData) {
      const resDataAPI = await fetch(
        "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=" +
          dato.country,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
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
      if (DataGraphAPI.message == "OK" && !countries.includes(dato.country)) {
        fallecidos = DataGraphAPI.data.deaths;
        countries.push(dato.country);
        MyDataGraph.push({
          name: dato.country + " - " + dato.name ,
          y: fallecidos,
          drilldown: "null"
        });
      }
    }

    Highcharts.chart("container", {
      chart: {
        type: "column"
      },
      title: {
        text: "Números de muertes por COVID según el país de un jugador"
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
          text: "Muertes totales"
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
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> fallecidos.<br/>'
      },

      series: [
        {
          name: "País de un goleador",
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
      Integración de la API <a href="https://rapidapi.com/KishCom/api/covid-19-coronavirus-statistics" target="_blank">COVID-19 Coronavirus Statistics</a>.
      Gráfico que muestra el número de muertes por país. Si un país de mi API no concuerda con la API externa, no se introduce el dato, y, si el país ya ha
       sido introducido, no vuelve a introducirse. Es posible que los datos tarden unos segundos en cargar.
    </p>
  </figure>
  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
