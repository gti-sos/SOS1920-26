<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>

<main>
    <h2 style="text-align: center;"><i class="fa fa-video-camera" aria-hidden="true"></i> Video de API</h2>
    <br><br>   
<div class="row">
    <div class="card">
        <h4 class="card-title" style="text-align: center; color: grey; margin-top: 10px; margin-bottom: 10px;"> Mercado de fichajes </h4>
        <div class="embed-responsive embed-responsive-16by9">
        <iframe width="420" height="315"
    src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0">
    </iframe>
        </div>
    <h6 class = "card-body" style="color: grey; margin-top: 10px; margin-bottom: 10px;"> Explicación funcionamiento Transfer API </h6>
    
    </div>
    
</div>


<div class="row">
    <hr>
</div>

    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>

</main>