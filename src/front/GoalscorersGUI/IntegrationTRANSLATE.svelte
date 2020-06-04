<script>
  import { pop } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  let BASE_API_URL = "/api/v3";

  async function loadGraph() {
    var text = "";
    let MyData = [];
    let MyDataGraph = [];
    var traducido = "";
    let DataGraphAPI = [];

    const resData = await fetch(BASE_API_URL + "/goalscorers");
    MyData = await resData.json();
    for (const x of MyData) {
      text = text.concat(x.country + " ");
      const resDataAPI = await fetch(
        "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?mt=1&onlyprivate=0&langpair=en|es&q=" + x.country,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host":
              "translated-mymemory---translation-memory.p.rapidapi.com",
            "x-rapidapi-key":
              "45a177f5c0msh64fa2c118add799p118a18jsn7e63bf635a62"
          }
        }
      );
      if (resDataAPI.ok) {
        const json = await resDataAPI.json();
        DataGraphAPI = json;
      } else {
        console.log("ERROR");
      }
      traducido = DataGraphAPI.responseData.translatedText;
      traducido = traducido.replace(" ", "");
      text = text.concat(traducido + " ");
    }
    var lines = text.split(/[,\. ]+/g),
      data = Highcharts.reduce(
        lines,
        function(arr, word) {
          var obj = Highcharts.find(arr, function(obj) {
            return obj.name === word;
          });
          if (obj) {
            obj.weight += 1;
          } else {
            obj = {
              name: word,
              weight: 1
            };
            arr.push(obj);
          }
          return arr;
        },
        []
      );

    Highcharts.chart("container", {
      accessibility: {
        screenReaderSection: {
          beforeChartFormat:
            "<h5>{chartTitle}</h5>" +
            "<div>{chartSubtitle}</div>" +
            "<div>{chartLongdesc}</div>" +
            "<div>{viewTableButton}</div>"
        }
      },
      series: [
        {
          type: "wordcloud",
          data: data,
          name: "Apariciones"
        }
      ],
      title: {
        text: "Países de los jugadores en inglés y traducidos al español"
      }
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js">

  </script>
  <script src="https://code.highcharts.com/modules/wordcloud.js">

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
        href="https://rapidapi.com/translated/api/mymemory-translation-memory"
        target="_blank">
        MyMemory - Translation Memory
      </a>. Gráfico que muestra los países de los jugadores en inglés y sus traducciones al español y las veces que aparecen.  <b>Es posible que los datos
      tarden unos segundos en cargar.</b>
    </p>
  </figure>

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
