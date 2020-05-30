<script>
    import Button from "sveltestrap/src/Button.svelte";
    import  {pop} from "svelte-spa-router";
    
    const URL_BASE = "api/v3/global-transfers";
    

/* Las integraciones que se van a realizar son las siguientes:
    Grupo 08  ---> (Cors)      http://sos1920-08.herokuapp.com/api/v2/ucl_stats
    Grupo 09  ---> (Cors)      https://sos1920-09.herokuapp.com/api/v3/oil-coal-nuclear-energy-consumption-stats
    Grupo 10  ---> (Proxy)     https://sos1920-10.herokuapp.com/api/v2/global-divorces
    NO FURULA: Grupo 21  ---> (Cors)      https://sos1920-21.herokuapp.com/api/v2/driving-licenses
    Grupo 24  ---> (Proxy)     https://sos1920-24.herokuapp.com/api/v2/univregs-stats
*/
    async function loadGraph(){
    
    const resData = await fetch(URL_BASE);
    let MyData = await resData.json();
    
    let teams = Array.from(new Set(MyData.map((d) => {return d.team+" "+d.year;})));
    let country = Array.from(new Set(MyData.map((d) => {return d.country;})));
    let signing = Array.from(new Set(MyData.map((d) => {return d.signing;})));
    let sale = Array.from(new Set(MyData.map((d) => {return d.sale;})));
    let balance = Array.from(new Set(MyData.map((d) => {return d.balance;})));
    
     //Integracion con el grupo 08 por CORS
    const URL_BASE_grupo_08 = "/api/v2/ucl_stats";
    console.log("fetch a " + URL_BASE_grupo_08);
    const resData_08 = await fetch(URL_BASE_grupo_08);
    let MyData_08 = await resData_08.json();
    let transfer_08 = Array.from(new Set(MyData_08.map((d) => {return d.title;})));
    console.log("Estadísticas de UEFA CHAMPIONS LEAGUE :");
    console.log(transfer_08);

    //Integracion con el grupo 09 por CORS
    const URL_BASE_grupo_09 = "/api/v3/oil-coal-nuclear-energy-consumption-stats";
    const resData_09 = await fetch(URL_BASE_grupo_09);
    console.log("fetch a " + URL_BASE_grupo_09);
    let MyData_09 = await resData_09.json();
    let transfer_09 = Array.from(new Set(MyData_09.map((d) => {return d.oil-consumption;})));
    console.log("Datos consumo aceite:");
    console.log(transfer_09);

    //Integracion con el grupo 10 por proxy
    const URL_BASE_grupo_10 = "/api/v2/global-divorces";
    const resData_10 = await fetch(URL_BASE_grupo_10);
    console.log("fetch a " + URL_BASE_grupo_10);
    let MyData_10 = await resData_10.json();
    let avg_10 = Array.from(new Set(MyData_10.map((d) => {return d.crude_rate;})));
    console.log("Datos divorcios:");
    console.log(avg_10);
    
    /*
     //Integracion con el grupo 21 por CORS
    const URL_BASE_grupo_21 = "/api/v2/driving-licenses";
    console.log("fetch a " + URL_BASE_grupo_21);
    const resData_21 = await fetch(URL_BASE_grupo_21);
    let MyData_21 = await resData_21.json();
    let avg_21 = Array.from(new Set(MyData_21.map((d) => {return d.total_cars;})));
    console.log("Datos licencias conducción:");
    console.log(avg_21);
    */

    //Integracion con el grupo 24 por proxy
    const URL_BASE_grupo_24 = "/api/v2/univregs-stats";
    const resData_24 = await fetch(URL_BASE_grupo_24);
    console.log("fetch a " + URL_BASE_grupo_24);
    let MyData_24 = await resData_24.json();
    let avg_24 = Array.from(new Set(MyData_24.map((d) => {return d.univreg_gob;})));
    console.log("Datos libros exportados Diego:");
    console.log(avg_24);
    
    
    
    Highcharts.chart('container', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Datos del mercado de fichajes'
        },
        subtitle: {
            text: 'Fuente: <a href="https://www.transfermarkt.es/transfers/einnahmenausgaben/statistik/plus/0?ids=a&sa=&saison_id=2018&saison_id_bis=2019&land_id=&nat=&pos=&altersklasse=&w_s=&leihe=&intern=0"> TRANSFERMARKT</a>'
       
        },
        xAxis: {
            categories: teams,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Transacciones',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' Jugadores'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 350,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Fichajes',
            data: signing
        }, {
            name: 'Ventas',
            data: sale
        }]
    });
    }
    
    </script>
    
    <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js" defer></script>
        <script src="https://code.highcharts.com/modules/series-label.js"  defer></script>
        <script src="https://code.highcharts.com/modules/exporting.js"  defer></script>
        <script src="https://code.highcharts.com/modules/export-data.js"  defer></script>
        <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}" defer></script>
    </svelte:head>
    
    <main>
        <h2>Integraciones con SOS1920-26</h2>
        <Button color="info" on:click="{pop}">Atrás</Button>
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
                Gráfico con el número de transacciones de distintos equipos
            </p>
        </figure>
    </main>
    
    <style>
    .highcharts-figure, .highcharts-data-table table {
        min-width: 310px; 
        max-width: 1000px;
        margin: 1em auto;
    }
    
    #container {
        height: 1000px;
    }
    
    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #EBEBEB;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
    </style>