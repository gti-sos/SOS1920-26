<script>
    import { pop } from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>

<main>
    <h2 style="text-align: center;">Integracion de coef</h2>
    <h6 style="text-align: center;">La integración con el Grupo 10 se ha realizado con Proxy</h6>
    <br><br>
    <div class="row">
       
        <button type="button" class="btn btn-outline-info"
            onclick="window.location.href='#/integrations/global-coef/integrationsG1'"
            style="margin-left: 12.5%; width: 25%;"> Integración con Grupo 1</button>
       
        <button type="button" class="btn btn-outline-success"
            onclick="window.location.href='#/integrations/global-coef/integrationsG5'"
            style="margin-left: 0.5%; width: 25%;"> Integración con Grupo 5</button>
       
        <button type="button" class="btn btn-outline-danger"
            onclick="window.location.href='#/integrations/global-coef/integrationsG24'"
            style="margin-left: 0.5%; width: 25%;"> Integración con Grupo 24 </button><br><br>
    </div>
    <div class="row">
        <hr>
    </div>
    <div class="row">

        <button type="button" class="btn btn-danger"
            onclick="window.location.href='#/integrations/global-coef/integrationsG10'"
            style="margin-left: 12.5%; width: 25%;"> Integración con Grupo 10</button>
        <button type="button" class="btn btn-success"
            onclick="window.location.href='#/integrations/global-coef/integrationsG30'"
            style="margin-left: 0.5%; width: 25%;"> Integración con Grupo 30</button>

    </div>
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>

</main>