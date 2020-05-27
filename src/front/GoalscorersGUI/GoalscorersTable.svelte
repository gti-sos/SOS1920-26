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
	import Label from "sveltestrap/src/Label.svelte";
	import FormGroup from "sveltestrap/src/FormGroup.svelte";

	import { Pagination, PaginationItem, PaginationLink } from 'sveltestrap';

	let goalscorers = [];
	let newGoalscorer = {
		name: "",
		country: "",
		debut: parseInt(""),
		goals: "",
		matches: "",
		teams: ""
	};

	let BASE_API_URL = "/api/v3";
	let teams = [];
	let names = [];
	let valorInicial = "";

	let numberElementsPages = 10;
	let offset = 0;
	let currentPage = 1;
	let moreData = true;

	onMount(getGoalscorers);
	onMount(getNames);

	async function ReloadTable() {
		const res = await fetch(BASE_API_URL + "/goalscorers/loadInitialData");

		if (res.ok) {
			const initialGoalscorers = await res.json();
			console.log("Contados " + initialGoalscorers.length + " datos de goleadores.");
			ReloadTableAlert();
			getGoalscorers();
		} else {
			console.log("No se han cargado correctamente los datos iniciales")
		}
	}

	async function getNames(){
		const res = await fetch(BASE_API_URL + "/goalscorers"); 
		if (res.ok) {
			const json = await res.json();
			
			names = json.map((d) => {   
					return d.name;   
			});
			console.log("Contados " + names.length + " goles.");

		} else {
			console.log("Error");
		}
	}

	async function getGoalscorers() {

		console.log("Fetching goalscorers...");
		const res = await fetch(BASE_API_URL + "/goalscorers?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			goalscorers = json;
			console.log("Received " + goalscorers.length + " goalscorers.");

			if (goalscorers.length != 10) {
				moreData = false
			} else {

				const next = await fetch(BASE_API_URL + "/goalscorers?offset=" + numberElementsPages * (offset + 1) + "&limit=" + numberElementsPages);
				console.log("La variable NEXT tiene el estado: " + next.status)
				const jsonNext = await next.json();

				if (jsonNext.length == 0 || next.status == 404) {
					moreData = false;
				}
				else {
					moreData = true;
				}
			}
		}
		else {
			console.log("ERROR!");
		}
	}

	async function insertGoalscorer() {

		console.log("Inserting goalscorer..." + JSON.stringify(newGoalscorer));
			const res = await fetch(BASE_API_URL + "/goalscorers", {
				method: "POST",
				body: JSON.stringify(newGoalscorer),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				getGoalscorers();
					if (res.ok) {
					insertAlert();
					newGoalscorer.country = "";
					newGoalscorer.debut = "";
					newGoalscorer.goals = "";
					newGoalscorer.matches = "";
					newGoalscorer.name = "";
					newGoalscorer.teams = "";
					
				} else if(res.status == 400){
					errorAlert("Debe completar todos los campos.");
				}else if(res.status == 409){
					errorAlert("No se puede insertar el mismo nombre de un jugador dos veces. Si quiere, puede modificar el jugador con ese nombre.");
				}else{
					errorAlert("Error interno al intentar insertar un goleador.");
				}


			});
	}


	async function deleteGoalscorer(name) {
		console.log("Deleting goalscorer..." + JSON.stringify(name));

		const res = await fetch(BASE_API_URL + "/goalscorers/" + name, {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok){
				getGoalscorers();
				deleteAlert();
			}else if(res.status==404){
				errorAlert("El elemento que intentas borrar no existe");
			}else{
				errorAlert("Error al intentar borrar un elemento");
			}
		});
	}

	async function deleteGoalscorers() {
		console.log("Deleting all goalscorers data...");
		const res = await fetch(BASE_API_URL + "/goalscorers/", {
			method: "DELETE"
		}).then(function (res) {
			if(res.ok){
			getGoalscorers();
			deleteAllAlert();
			}else{
				errorAlert("Error al borrar todos los elementos");
			}
		});
	}


	async function search(name) {
		console.log("Searching data: " + name);

		var url = BASE_API_URL + "/goalscorers";

		if (name != "") {
			url = url + "?name=" + name;
		}

		const res = await fetch(url);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			goalscorers = json;

			console.log("Found " + goalscorers.length + " goalscorers stats.");
		} else {
			console.log("ERROR!");
		}

	}

	function addOffset(increment) {
		offset += increment;
		currentPage += increment;
		getGoalscorers();
	}

	function insertAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-success ";
		alert_element.innerHTML = "<strong> Dato insertado.</strong> Se ha insertado el dato correctamente";
		
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}
	
	function deleteAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-danger ";
		alert_element.innerHTML = "<strong> Dato borrado.</strong> Se ha borrado el dato correctamente";
		
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}

	function deleteAllAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-danger ";
		alert_element.innerHTML = "<strong> Datos borrados.</strong> Se han borrado todos los datos correctamente";
		
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}

	
	function ReloadTableAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-info ";
		alert_element.innerHTML = "<strong> Tabla Restaurada.</strong> Se han restaurado los datos";
		
		setTimeout(() => {
			clearAlert();
		}, 3000);
	}


	function errorAlert(error) {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-danger ";
		alert_element.innerHTML = "<strong> Error.</strong> Ha ocurrido un error: " + error;
		
		setTimeout(() => {
			clearAlert();
		}, 4000);
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
	{#await goalscorers}
		Loading goalscorers...
	{:then goalscorers}
	
	<FormGroup>
		<Label for="selectName"> Jugador que desea buscar </Label>
		<Input type="text" name="selectName" id="selectName" bind:value= "{valorInicial}" >
			{#each names as name}
			<option>{name}</option>
			{/each}
			<option>Escriba el jugador que desea buscar</option>
		</Input>
		<Button outline color="primary" onClick="window.location.reload();" > <i class="fas fa-search"></i> Mostrar todos los jugadores</Button>
		<Button outline color="secondary" on:click="{search(valorInicial)}" class="button-search"> <i class="fas fa-search"></i> Buscar jugador</Button>
	</FormGroup>

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
					<td><input bind:value="{newGoalscorer.name}"></td>
					<td><input bind:value="{newGoalscorer.country}"></td>
					<td><input type="number" bind:value="{newGoalscorer.debut}"></td>
					<td><input type="number" bind:value="{newGoalscorer.goals}"></td>
					<td><input type="number" bind:value="{newGoalscorer.matches}"></td>
					<td><input type="number" bind:value="{newGoalscorer.teams}"></td>
					<td> <Button outline  color="primary" on:click={insertGoalscorer}>Insertar</Button> </td>
				</tr>
				{#each goalscorers as goalscorer}
					<tr>
						<td>{goalscorer.name}</td>
						<td>{goalscorer.country}</td>
						<td>{goalscorer.debut}</td>
						<td>{goalscorer.goals}</td>
						<td>{goalscorer.matches}</td>
						<td>{goalscorer.teams}</td>
						<td><Button outline color="danger" on:click="{deleteGoalscorer(goalscorer.name)}" > <i class="fa fa-trash" aria-hidden="true"></i> Eliminar</Button></td>
						<td><Button outline color="info" href="#/goalscorers/{goalscorer.name}"> <i class="fa fa-edit" aria-hidden="true"></i> Editar</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
 
	<Pagination style="float:right;" ariaLabel="Cambiar de página">


		<PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/goalscorersAPI" on:click="{() => addOffset(-1)}" />
		</PaginationItem>
		
		{#if currentPage != 1}
		<PaginationItem>
			<PaginationLink href="#/goalscorersAPI" on:click="{() => addOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/goalscorersAPI" >{currentPage}</PaginationLink>
		</PaginationItem>

		{#if moreData}
		<PaginationItem >
			<PaginationLink href="#/goalscorersAPI" on:click="{() => addOffset(1)}">{currentPage + 1}</PaginationLink>
		</PaginationItem>
		{/if}

		<PaginationItem class="{moreData ? '' : 'disabled'}">
		  <PaginationLink next href="#/goalscorersAPI" on:click="{() => addOffset(1)}"/>
		</PaginationItem>

	</Pagination>

	<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
	<Button outline on:click={deleteGoalscorers} color="danger"> <i class="fa fa-trash" aria-hidden="true"></i> Borrar todo </Button>
	<Button outline color="primary" on:click="{ReloadTable}"> <i class="fa fa-refresh"></i> Cargar datos iniciales </Button>

</main>