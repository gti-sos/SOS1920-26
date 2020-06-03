<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>

<main>
    <h2 style="text-align: center;">Integracion de Transfers</h2>
    <h6 style="text-align: center;">La integración con el Grupo 24 se ha realizado con Proxy</h6>
    <br><br>   
<div class="row">
    <button type="button" class="btn btn-outline-info" onclick="window.location.href='#/integrations/global-transfers/integrationsG8'" style="margin-left: 12.5%; width: 25%;"> Integración con Grupo 8</button>
	<button type="button" class="btn btn-outline-success" onclick="window.location.href='#/integrations/global-transfers/integrationsG9'" style="margin-left: 0.5%; width: 25%;"> Integración con Grupo 9</button>
	<button type="button" class="btn btn-outline-danger" onclick="window.location.href='#/integrations/global-transfers/integrationsG10'" style= "margin-left: 0.5%; width: 25%;"> Integración con Grupo 10 </button><br><br>
</div>
<div class="row">
    <hr>
</div>
<div class="row">
  
    <button type="button" class="btn btn-danger" onclick="window.location.href='#/integrations/global-transfers/integrationsG21'" style="margin-left: 12.5%; width: 25%;"> Integración con Grupo 21</button>
    <button type="button" class="btn btn-success" onclick="window.location.href='#/integrations/global-transfers/integrationsG24'" style="margin-left: 0.5%; width: 25%;"> Integración con Grupo 24</button>
    <button type="button" class="btn btn-info" onclick="window.location.href='#/integrations/global-transfers/integrationsExt1'" style="margin-left: 0.5%; width: 25%;"> Integración API EXTERNA 1</button>

</div>
<div class="row">
    <hr>
</div>

<div class="row">
    <button type="button" class="btn btn-outline-info" onclick="window.location.href='#/integrations/global-transfers/integrationsExt2'" style="margin-left: 12.5%; width: 25%;"> Integración API EXTERNA 2</button>
</div>
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>

</main>