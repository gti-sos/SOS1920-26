<script>
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    import { pop } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";

    async function drawChart() {

        const BASE_API_URL = "/api/v3/global-coef";

        const resData = await fetch(BASE_API_URL);
        let MyData = await resData.json();
        console.log(MyData)


        MyData = await MyData.map((d) => {
            return [d.team, d.fed, d.coefficient];
        });

        let DataTypes = [["Equipo", "Clasificación", "Coeficiente"]]

        Array.prototype.push.apply(DataTypes, MyData)


        console.log(DataTypes)

        var data = google.visualization.arrayToDataTable(DataTypes);

        var options = {
            title: 'Equipos y feds del top 10 en el ranking UEFA'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
</script>

<main>
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</main>

<html lang="EN">
<div id="piechart"></div>


</html>