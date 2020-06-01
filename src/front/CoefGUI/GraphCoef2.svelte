

<html lang="EN">
    <div id="piechart"></div>
    
    </html>

<script>
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    async function drawChart() {

        const BASE_API_URL = "/api/v3/global-coef";

        const resData = await fetch(BASE_API_URL);
        let MyData = await resData.json();
        console.log(MyData)

        /* Getting the countries */
        let countries = Array.from(new Set(MyData.map((d) => { return d.country; })));
        /* Mapping the data in the right format */
       
        MyData = await MyData.map((d) => {
            return [d.country, d.coefficient, d.year];
        });

        let DataTypes = [["Pais", "coefficient", "Year"]]

        Array.prototype.push.apply(DataTypes, MyData)


        console.log(DataTypes)

        var data = google.visualization.arrayToDataTable(DataTypes);

        var options = {
            title: 'Matrimonios registrados a nivel global'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }
</script>
