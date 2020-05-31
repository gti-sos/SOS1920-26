<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>

<main>
    <h2 style="text-align: center;">Integracion de APIs</h2>
    <br><br>   

    <button type="button" class="btn btn-info" onclick="window.location.href='#/integrations/global-transfers'" style="margin-left: 12.5%; width: 25%;"> Mercado de Fichajes</button>
	<button type="button" class="btn btn-success" onclick="window.location.href='#/integrations/global-coef'" style="width: 25%;">Coeficiente UEFA</button>
	<button type="button" class="btn btn-danger" onclick="window.location.href='#/integrations/goalscorers'" style= "width: 25%;">Goleadores Champions League </button><br><br>

    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>

</main>