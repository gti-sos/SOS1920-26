<script>
  import { pop } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  let BASE_API_URL = "/api/v3";
  function primeraLetraMayus(x) {
    return x[0].toUpperCase() + x.slice(1);
  }
  async function loadGraph() {
    let MyDataTotal = [];
    let MyDataGoalscorers = [];
    const resDataGoalscorers = await fetch(BASE_API_URL + "/goalscorers");
    MyDataGoalscorers = await resDataGoalscorers.json();

    let MyDataCoef = [];
    const resDataCoef = await fetch(BASE_API_URL + "/global-coef");
    MyDataCoef = await resDataCoef.json();

    let MyDataTransfers = [];
    const resDataTransfers = await fetch(BASE_API_URL + "/global-transfers");
    MyDataTransfers = await resDataTransfers.json();

    MyDataGoalscorers.forEach(x => {
      var pais = primeraLetraMayus(x.country);
      MyDataTotal.push(["API 26", pais]);
      MyDataTotal.push([pais, x.name]);
      MyDataTotal.push([x.name, x.goals + " goles"]);
      MyDataTotal.push([x.name, x.debut + " año de debut"]);
    });
    MyDataCoef.forEach(x => {
      var pais = primeraLetraMayus(x.country);
      MyDataTotal.push(["API 26", pais]);
      MyDataTotal.push([pais, x.team + ", " + x.year]);
      MyDataTotal.push([
        x.team + ", " + x.year,
        x.coefficient + " puntos de coeficiente"
      ]);
    });
    MyDataTransfers.forEach(x => {
      var pais = primeraLetraMayus(x.country);
      MyDataTotal.push(["API 26", pais]);
      MyDataTotal.push([pais, x.team + ", " + x.year]);
      MyDataTotal.push([
        x.team + ", " + x.year,
        x.balance + " millones de balance"
      ]);
    });

    console.log(MyDataTotal);

    // Add the nodes option through an event call. We want to start with the parent
    // item and apply separate colors to each child element, then the same color to
    // grandchildren.
    Highcharts.addEvent(Highcharts.Series, "afterSetOptions", function(e) {
      var colors = Highcharts.getOptions().colors,
        i = 0,
        nodes = {};

      if (
        this instanceof Highcharts.seriesTypes.networkgraph &&
        e.options.id === "lang-tree"
      ) {
        e.options.data.forEach(function(link) {
          if (link[0] === "API 26") {
            nodes["API 26"] = {
              id: "API 26",
              marker: {
                radius: 30
              }
            };
            nodes[link[1]] = {
              id: link[1],
              marker: {
                radius: 20
              },
              color: colors[i++]
            };
          } else if (nodes[link[0]] && nodes[link[0]].color) {
            nodes[link[1]] = {
              id: link[1],
              color: nodes[link[0]].color
            };
          }
        });

        e.options.nodes = Object.keys(nodes).map(function(id) {
          return nodes[id];
        });
      }
    });

    Highcharts.chart("container", {
      chart: {
        type: "networkgraph",
        height: "100%"
      },
      title: {
        text: "Combinación de las 3 APIs del grupo 26."
      },
      subtitle: {
        text: "Valores de transferencias y coeficientes de equipos y goles de jugadores según países."
      },
      plotOptions: {
        networkgraph: {
          keys: ["from", "to"],
          layoutAlgorithm: {
            enableSimulation: true,
            friction: -0.9
          }
        }
      },
      series: [
        {
          dataLabels: {
            enabled: true,
            linkFormat: ""
          },
          id: "lang-tree",
          data: MyDataTotal
        }
      ]
    });
  }
</script>

<svelte:head>
  <script src="https://code.highcharts.com/highcharts.js">

  </script>
  <script src="https://code.highcharts.com/modules/networkgraph.js">

  </script>
  <script
    src="https://code.highcharts.com/modules/exporting.js"
    on:load={loadGraph}>

  </script>
</svelte:head>
<main>

  <figure class="highcharts-figure">
    <div id="container" />
  </figure>
    <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
