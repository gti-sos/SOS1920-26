<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    //import { onMount } from "svelte";
    import Chart from "chart.js";
    //onMount(async () => { });

    async function renderChart() {

        const BASE_API_URL = "/api/v3/global-coef";
        const resData = await fetch(BASE_API_URL);
        let MyData = await resData.json();
        let MyNumeros = [];


        var ctx = document.getElementById("myChart").getContext("2d");
        let countries = Array.from(new Set(MyData.map((d) => { return d.country; })));
        /*MyData = MyData.map((d) => {
            return [countries.indexOf(d.country), d.year, d["coefficient"]];
        });*/
        MyData.forEach(x => {
            MyNumeros.push(x.coefficient);
        });



        var chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: countries,
                datasets: [
                    {
                        label: "Coeficientes por países",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(255, 99, 132)",
                        data:MyNumeros
                    }
                ]
            },
            options: {}
        });
    }

</script>
<button on:click={renderChart}>Visualizar</button>
<canvas id="myChart"></canvas>
<main> <button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </button></main>