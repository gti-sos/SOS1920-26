<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>

<main>
    <h2 style="text-align: center;"><i class="fa fa-video-camera" aria-hidden="true"></i> Video de API</h2>
    <br><br>   
    <div class="card-deck">
        <div class="card">
            <h4 class="card-title" style="text-align: center; color: grey; margin-top: 10px; margin-bottom: 10px;"> API Mercado de fichajes </h4>
            <div class="embed-responsive embed-responsive-16by9 video">
                <iframe title="video1" width="420" height="315" src="https://www.youtube.com/embed/QerpS9m8a9Q" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <h6 class = "card-body" style="color: grey; margin-top: 10px; margin-bottom: 10px;"> Explicación funcionamiento Transfer API </h6>
        </div>

        <div class="card">
            <h4 class="card-title" style="text-align: center; color: grey; margin-top: 10px; margin-bottom: 10px;"> API Coeficiente UEFA </h4>
            <div class="embed-responsive embed-responsive-16by9 video">
                <iframe title="video2" width="420" height="315" src="https://www.youtube.com/embed/2ZV7mNoiUxo" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <h6 class = "card-body" style="color: grey; margin-top: 10px; margin-bottom: 10px;"> Explicación funcionamiento COEF API </h6>
        </div>

        <div class="card">
            <h4 class="card-title" style="text-align: center; color: grey; margin-top: 10px; margin-bottom: 10px;"> API Goleadores </h4>
            <div class="embed-responsive embed-responsive-16by9 video">
                <iframe title="video3" width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <h6 class = "card-body" style="color: grey; margin-top: 10px; margin-bottom: 10px;"> Explicación funcionamiento GoalScorers API </h6>
        </div>


    <!--Aqui van los vuestros; dentro de card deck-->

</div>
<div class="row">
    <hr>
</div>

    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>

</main>