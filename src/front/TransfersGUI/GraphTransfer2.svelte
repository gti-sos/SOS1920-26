<script>
  import { pop } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  async function loadGraph() {
    let MyData = [];
    let MyDataGraphS = [];
    let MyDataGraphN = [];
    let MyDataGraphSA = [];
    let MyDataGraphB = [];
    let BASE_API_URL = "/api/v3";
    

    const resData = await fetch(BASE_API_URL + "/global-transfers");
    MyData = await resData.json();

    MyData.forEach((x) => {
    
      MyDataGraphN.push(x.year + " - " + x.team);
      MyDataGraphS.push(parseInt(x.signing));
      MyDataGraphSA.push(parseInt(x.sale));
      MyDataGraphB.push(parseFloat(x.balance));
    });

    function makeTrace(i) {
      if (i == 0) {
        return {
          x: MyDataGraphN,
          y: Array.apply(null, MyDataGraphS),
          line: {
            shape: "spline",
            color: "red",
          },
          visible: i === 0,
          name: "Fichajes",
        };
      } else if (i == 1) {
        return {
          x: MyDataGraphN,
          y: Array.apply(null, MyDataGraphSA),
          line: {
            shape: "spline",
            color: "red",
          },
          visible: i === 0,
          name: "Ventas",
        };
      } else if (i == 2) {
        return {
          x: MyDataGraphN,
          y: Array.apply(null, MyDataGraphB),
          line: {
            shape: "spline",
            color: "red",
          },
          visible: i === 0,
          name: "Balance",
        };
      }
    }
    Plotly.plot("graph", [0, 1, 2].map(makeTrace), {
      updatemenus: [
        {
          y: 1,
          yanchor: "top",
          buttons: [
            {
              method: "restyle",
              args: ["visible", [true, false, false, false]],
              label: "Fichajes",
            },
            {
              method: "restyle",
              args: ["visible", [false, true, false, false]],
              label: "Ventas",
            },
            {
              method: "restyle",
              args: ["visible", [false, false, true, false]],
              label: "Balance",
            },
          ],
        },
      ],
    });
  }
</script>

<svelte:head>
  <script
    src="https://cdn.plot.ly/plotly-latest.min.js"
    on:load="{loadGraph}"
  ></script>
</svelte:head>

<main>
  <h2 style="text-align: center;">
    <i class="fas fa-exchange-alt"></i> Número de fichajes / ventas / balance
    global totales
  </h2>

  <div id="graph"></div>
  <p>
    Gráfica completa sobre los datos del mercado
  </p>

  <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>

</main>
