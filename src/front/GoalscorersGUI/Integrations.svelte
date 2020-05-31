<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>

<main>
    <h2 style="text-align: center;">Integraciones de Goalscorers</h2>
    <br><br>   
    <h3 style="text-align: center;">Integraciones de SOS</h3> 
    <button type="button" class="btn btn-outline-info" onclick="window.location.href='#/integrations/global-transfers/integrationsG8'" style="margin-left: 12.5%; width: 25%;"> Integración con Grupo 8</button>
	<button type="button" class="btn btn-outline-success" onclick="window.location.href='#/integrations/global-transfers/integrationsG9'" style="width: 25%;"> Integración con Grupo 9</button>
	<button type="button" class="btn btn-outline-danger" onclick="window.location.href='#/integrations/global-transfers/integrationsG10'" style= "width: 25%;"> Integración con Grupo 10 </button><br><br>

    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>

</main>