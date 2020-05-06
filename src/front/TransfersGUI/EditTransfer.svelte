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
    let transfer = {};
    let updatedCountry = "XXXX";
    let updatedYear = 12345;
    let updatedTeam = "SevillaFC";
    let updatedSigning = 17;
    let updatedSale = 32;
    let updatedBalance = +108.2;
    let errorMsg = "";

    onMount(getTransfer);

    async function getTransfer() {

        console.log("Fetching transfer...");
        const res = await fetch("/api/v1/global-transfers/" + params.year +"/"+params.team);
        
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            transfer = json;
            updatedCountry = transfer.country;
            updatedYear = transfer.year;
            updatedTeam = transfer.team;
            updatedSigning = transfer.signing;
            updatedSale = transfer.sale;
            updatedBalance = transfer.balance;

            console.log("Received transfer");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }


    async function updateTransfer() {

        console.log("Updating transfer..." + JSON.stringify(params.year));

        const res = await fetch("/api/v1/global-transfers/" + params.year +"/"+params.team, {
            method: "PUT",
            body: JSON.stringify({
                country: updatedCountry,
                year: parseInt(params.year),
                team: params.team,
                signing: updatedSigning,
                sale: updatedSale,
                balance: updatedBalance
            }),

            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            if (res.ok) {
                getTransfer();
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
		alert_element.innerHTML = "<strong>Dato actualizado</strong> Se ha actualziado el dato correctamente";
		
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
    <h3>Editar Transfer <strong>{params.year}</strong></h3>
    {#await transfer}
        Cargando transfers...
    {:then transfer}
        <Table bordered>
            <thead>
                <tr>
                    <th>Pais</th>
                    <th>Año</th>
                    <th>Equipo</th>
                    <th>Fichajes</th>
                    <th>Ventas</th>
                    <th>Balance Final</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input bind:value="{updatedCountry}"></td>
                    <td>{updatedYear}</td>
                    <td>{updatedTeam}</td>
                    <td><input type="number" bind:value="{updatedSigning}"></td>
                    <td><input type="number" bind:value="{updatedSale}"></td>
                    <td><input type="number" bind:value="{updatedBalance}"></td>
                    <td> <Button outline  color="primary" on:click={updateTransfer} on:click={updateAlert}>Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {/await}
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Atrás</Button>
</main>