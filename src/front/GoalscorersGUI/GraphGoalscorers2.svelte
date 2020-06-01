<script>
  import { pop } from "svelte-spa-router";
  import Button from "sveltestrap/src/Button.svelte";
  let BASE_API_URL = "/api/v3";
  
  function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
  }

  async function loadGraph() {
    let MyData = [];
    let MyNames = [];
    let MyGoals = [];
    let MyBackground = [];
    const resData = await fetch(BASE_API_URL + "/goalscorers");
    MyData = await resData.json();
    MyData.forEach(x => {
      MyNames.push(x.name);
      MyGoals.push(x.goals);
      MyBackground.push(random_bg_color());
    });
    var data = {
      datasets: [
        {
          data: MyGoals,
          backgroundColor: MyBackground
        }
      ],
      labels: MyNames
    };

    var ctx = document.getElementById("myChart").getContext("2d");
    var chart = new Chart(ctx, {
      data: data,
      type: "polarArea"
    });
  }
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0" on:load={loadGraph}>

  </script>
</svelte:head>
<main>
  <figure>
  <p align="center">
  Gráfico que muestra los goles marcados por los máximos goleadores.
  </p>
  </figure>
  <canvas id="myChart" />

  <Button outline color="secondary" on:click={pop}>
    <i class="fas fa-arrow-circle-left" />
    Atrás
  </Button>
</main>
