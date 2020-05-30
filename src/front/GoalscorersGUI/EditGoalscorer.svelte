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
    let goalscorer = {};
    let updatedName;
    let updatedDebut;
    let updatedCountry;
    let updatedGoals;
    let updatedMatches;
    let updatedTeams;
    let errorMsg;

    onMount(getGoalscorer);

    async function getGoalscorer() {

        console.log("Fetching goalscorer...");
        const res = await fetch(BASE_API_URL + "/goalscorers/" + params.name);
        
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            goalscorer = json;
            updatedName = goalscorer.name;
            updatedDebut = goalscorer.debut;
            updatedCountry = goalscorer.country;
            updatedGoals = goalscorer.goals;
            updatedMatches = goalscorer.matches;
            updatedTeams = goalscorer.teams;

            console.log("Goalscorer received");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("Error" + errorMsg);
        }
    }


    async function updateGoalscorer() {

        console.log("Updating goalscorer..." + JSON.stringify(params.name));

        const res = await fetch(BASE_API_URL + "/goalscorers/" + params.name, {
            method: "PUT",
            body: JSON.stringify({
                name: params.name,
                debut: parseInt(updatedDebut),
                country: updatedCountry,
                goals: updatedGoals,
                matches: updatedMatches,
                teams: updatedTeams
            }),

            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if (res.ok) {
                getGoalscorer();
                updateAlert();
            } else if (res.status == 404) {
                    errorAlert("Se ha intentado actualizar un elemento inexistente.");
                } else {
                    errorAlert("");
                }
        });
    }

    function errorAlert(error) {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-danger ";
		alert_element.innerHTML = "<strong>Error</strong> Ha ocurrido un error " + error;
		
		setTimeout(() => {
			clearAlert();
		}, 3000);
    }
    
    function updateAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-info ";
		alert_element.innerHTML = "<strong>Dato actualizado.</strong> Se ha actualizado el dato correctamente";
		
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
    <div role="alert" id="div_alert" style="display: none;">
	</div>
    <h3>Editar goleador <strong>{params.name}</strong></h3>
    {#await goalscorer}
        Cargando goalscorers...
    {:then goalscorer}
        <Table bordered>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>País</th>
                    <th>Debut</th>
                    <th>Goles</th>
                    <th>Partidos</th>
                    <th>Equipos</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedName}</td>
                    <td>{updatedCountry}</td>
                    <td>{updatedDebut}</td>
                    <td><input type="number" bind:value="{updatedGoals}"></td>
                    <td><input type="number" bind:value="{updatedMatches}"></td>
                    <td><input type="number" bind:value="{updatedTeams}"></td>
                    <td> <Button outline  color="primary" on:click={updateGoalscorer}> <i class="fa fa-refresh" aria-hidden="true"></i> Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás</Button>
</main>