<script>
    import {
        onMount
    } from "svelte";

    import {
        pop
    } from "svelte-spa-router";


    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Input from "sveltestrap/src/Input.svelte";


    export let params = {};
	let BASE_API_URL = "/api/v3";

    let coef = {};
    let updatedCountry = "XXXX";
    let updatedYear = 2000;
    let updatedTeam ="ZZZZ";
    let updatedCoefficient =140.000;
    let updatedFed =20.000;
    let updatedClassification= 1;
    let errorMsg = "";

    onMount(getCoef);

    async function getCoef() {

        console.log("Fetching coef...");
        const res = await fetch(BASE_API_URL + "/global-coef/" + params.team +"/"+params.year);
        
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            coef = json;
            updatedCountry = coef.country;
            updatedYear = coef.year;
            updatedTeam = coef.team;
            updatedCoefficient=coef.coefficient;
            updatedFed=coef.fed;
            updatedClassification=coef.classification;
            console.log("Received coef");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR" + errorMsg);
        }
    }


    async function updateCoef() {

        console.log("Updating coef..." + JSON.stringify(params.team));

        const res = await fetch(BASE_API_URL + "/global-coef/" + params.team +"/"+params.year, {
            method: "PUT",
            body: JSON.stringify({
                country: updatedCountry,
                year: parseInt(params.year),
                team: params.team,
                coefficient: updatedCoefficient,
                fed: updatedFed,
                classification: updatedClassification
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            
            if (res.ok) {
                getCoef();
            } else if (res.status == 404) {
                    errorAlert("Se ha intentado borrar un elemento inexistente.");
                } else {
                    errorAlert("");
                }
        });
    }
    function errorAlert(error) {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-danger ";
		alert_element.innerHTML = "<strong>ERROR</strong> Ha sucedido un error " + error;
		
		setTimeout(() => {
			clearAlert();
		}, 3000);
    }
    
    function updateAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 1%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-info ";
		alert_element.innerHTML = "<strong>Dato actualizado</strong> El dato ha sido actualizado";
		
		setTimeout(() => {
			clearAlert();
		}, 3000);
    }
    
    function clearAlert () {
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "display: none; ";
		alert_element.className = "alert alert-dismissible in";
		alert_element.innerHTML = "";
	}


    
</script>
<main>
    <div role="alert" id="div_alert" style="display: none;"></div>

    <h3>Editar Coef <strong>{params.team}</strong></h3>
    {#await coef}
        Loading coef...
    {:then coef}
        <Table bordered>
            <thead>
                <tr>
                    <th>País</th>
                    <th>Año</th>
                    <th>Equipo</th>
                    <th>Coeficiente</th>
                    <th>Fed</th>
                    <th>Clasificación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input bind:value="{updatedCountry}"></td>
                    <td>{updatedYear}</td>
                    <td>{updatedTeam}</td>
                    <td><input type="number" bind:value="{updatedCoefficient}"></td>
                    <td><input type="number" bind:value="{updatedFed}"></td>
                    <td><input type="number" bind:value="{updatedClassification}"></td>
                    <td> <Button outline  color="primary" on:click={updateCoef} on:click={updateAlert}> Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>