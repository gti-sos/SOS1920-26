<script>
	import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
    
    async function loadGraph() {
        
        let MyData = [];
        let MyDataGraph = [];
        let BASE_API_URL = "/api/v3";
        
        const resData = await fetch(BASE_API_URL + "/global-coef")
        MyData = await resData.json();
        MyData.forEach( (x) => {
                MyDataGraph.push({name: x.team + " " + x.year, data: [parseFloat(x.fed), parseFloat(x.coefficient), parseInt(x.classification)], pointPlacement: 'on'});
            });
        
        Highcharts.chart('container', {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: ''
            },
            
            xAxis: {
                categories: [
                    'Fed',
                    'Coeficiente',
                    'Clasificación'
                ],
                plotBands: [{ // visualize the weekend
                    from: 4.5,
                    to: 6.5,
                    color: 'rgba(68, 170, 213, .2)'
                }]
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' '
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: MyDataGraph
        });
    }
    loadGraph();
    </script>
    
    <svelte:head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/highcharts-more.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
        
    </svelte:head>
    
    
    <main>
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
                Comparación completa de todos los equipos en sus respectivos años mediante el fed, el coeficiente y la clasificación.
            </p>
        </figure>
    
        <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>

    </main>
    <style>
        #container {
            height: 400px; 
        }
    
        .highcharts-figure, .highcharts-data-table table {
            min-width: 310px; 
            max-width: 800px;
            margin: 1em auto;
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