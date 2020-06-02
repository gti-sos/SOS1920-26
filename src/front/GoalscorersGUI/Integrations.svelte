<script>
    import {pop} from "svelte-spa-router";
    import Button from "sveltestrap/src/Button.svelte";
</script>

<main>
    <h2 style="text-align: center;">Integraciones de Goalscorers</h2>
    <br><br>   
    <h3 style="text-align: center;">Integraciones de SOS</h3> 
    <div align="center">
    <button type="button" class="btn btn-outline-info" onclick="window.location.href='#/integrations/goalscorers/integrationG10'" style= "width: 20%;"> Integración con Grupo 10 </button>
    <button type="button" class="btn btn-outline-info" onclick="window.location.href='#/integrations/goalscorers/integrationG12'" style= "width: 20%;"> Integración con Grupo 12 </button>
    <button type="button" class="btn btn-outline-info" onclick="window.location.href='#/integrations/goalscorers/integrationG21'" style="width: 20%;"> Integración con Grupo 21</button>
    <button type="button" class="btn btn-outline-info" onclick="window.location.href='#/integrations/goalscorers/integrationG22'" style="width: 20%;"> Integración con Grupo 22</button>    
    </div>
    <h3 style="text-align: center;">Integraciones externas</h3> 
    <div align="center">
    <button type="button" class="btn btn-outline-info" onclick="window.location.href='#/integrations/goalscorers/integrationNBA'" style= "width: 20%;"> Integración con API-NBA </button>
    </div>
    <br><br>

    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>

</main>