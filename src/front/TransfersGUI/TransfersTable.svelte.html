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

	let transfers = [];
	let newTransfer = {
		country: "",
		year: parseInt(""),
		team: "",
		signing: "",
		sale: "",
		balance: ""
	};

	let BASE_API_URL = "/api/v3";
	let years = [];
	let teams = [];
	let currentYear = "-";
	let currentTeam = "-";

	let numberElementsPages = 10;
	let offset = 0;
	let currentPage = 1;
	let moreData = true;

	onMount(getTransfers);
	onMount(getYearsTeams);



	async function ReloadTable() {
		const res = await fetch(BASE_API_URL + "/global-transfers/loadInitialData")

		if (res.ok) {
			const initialTransfers = await res.json();
			console.log("Contados " + initialTransfers.length + " datos de transferencias de fichajes")
			getTransfers();
		} else {
			console.log("No se han cargado correctamente los datos inicales")
		}
	}

	async function getYearsTeams() {
		const res = await fetch(BASE_API_URL + "/global-transfers");

		if (res.ok) {
			const json = await res.json();

			years = json.map((d) => {
				return d.year;
			});
			years = Array.from(new Set(years));

			teams = json.map((d) => {
				return d.team;
			});
			teams = Array.from(new Set(teams));

			console.log("Contados " + years.length + "años y " + teams.length + "años distintos.");

		} else {
			console.log("Error");
		}
	}




	async function getTransfers() {

		console.log("Fetching transfers...");
		const res = await fetch(BASE_API_URL + "/global-transfers?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			transfers = json;
			console.log("Received " + transfers.length + " transfers.");

			if (transfers.length != 10) {
				moreData = false
			} else {

				const next = await fetch(BASE_API_URL + "/global-transfers?offset=" + numberElementsPages * (offset + 1) + "&limit=" + numberElementsPages);
				console.log("La variable NEXT tiene el estado: " + next.status)
				const jsonNext = await next.json();



				if (jsonNext.length == 0 || next.status == 404) {
					moreData = false;
				}
				else {
					moreData = true;  //Vemos si quedan aun mas datos en la siguiente pagina
				}
			}
		}
		else {
			console.log("Error");
		}
	}

	async function insertTransfer() {

		console.log("Inserting transfer..." + JSON.stringify(newTransfer));

		if (newTransfer.year == ""
			|| newTransfer.year == null
			|| newTransfer.team == ""
			|| newTransfer.team == null
			|| newTransfer.country == ""
			|| newTransfer.country == null
			|| newTransfer.signing == ""
			|| newTransfer.signing == null
			|| newTransfer.sale == ""
			|| newTransfer.sale == null
			|| newTransfer.balance == ""
			|| newTransfer.balance == null) {

			alert("No puede existir ningún campo vacío");

		} else if (hasNumber(newTransfer.country)) {
				alert("El país no puede contener valores numéricos");
		}
		else {
			const res = await fetch(BASE_API_URL + "/global-transfers", {
				method: "POST",
				body: JSON.stringify(newTransfer),
				headers: {
					"Content-Type": "application/json"
				}
			}).then(function (res) {
				if (res.ok) {
					getTransfers();
					insertAlert();
					newTransfer.country = "";
					newTransfer.year = "";
					newTransfer.team = "";
					newTransfer.signing = "";
					newTransfer.sale = "";
					newTransfer.balance = "";

				} else if(res.status == 400){
					errorAlert("Debe completar todos los campos");
				}else if(res.status == 409){
					errorAlert("No se puede insertar el mismo año y equipo dos veces");
				}else{
					errorAlert("Error interno al intentar insertar un dato");
				}


			});
		}
	}

	function hasNumber(myString) {
		return /\d/.test(myString);
	}


	async function deleteTransfer(year, team) {
		console.log("Deleting transfer..." + JSON.stringify(year) + + JSON.stringify(team));

		const res = await fetch(BASE_API_URL + "/global-transfers/" + year + "/" + team, {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok) {
				getTransfers();
				getYearsTeams();
				deleteAlert();

			} else if (res.status == 404) {
				errorAlert("El elemento que intentas borrar no existe");
			} else {
				errorAlert("Error al intentar borrar un elemento");
			}
		});
	}

	async function deleteGlobalTransfers() {
		console.log("Deleting all transfers data...");
		const res = await fetch(BASE_API_URL + "/global-transfers/", {
			method: "DELETE"
		}).then(function (res) {
			if (res.ok) {
				getTransfers();
				getYearsTeams();
				deleteAllAlert();
			} else {
				errorAlert("Error al borrar todos los elementos")
			}
		});
	}


	async function search(year, team) {
		console.log("Searching data: " + year + " and " + team);

		/* Checking if the fields are empty */
		var url = BASE_API_URL + "/global-transfers";

		if (year != "-" && team != "-") {
			url = url + "?year=" + year + "&team=" + team;
		} else if (year != "-" && team == "-") {
			url = url + "?year=" + year;
		} else if (year == "-" && team != "-") {
			url = url + "?team=" + team;
		}

		const res = await fetch(url);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			transfers = json;

			console.log("Found " + transfers.length + " global transfers stats.");
		} else {
			console.log("Error");
		}

	}

	function addOffset(increment) {
		offset += increment;
		currentPage += increment;
		getTransfers();
	}

	function insertAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-success ";
		alert_element.innerHTML = "<strong> Dato insertado</strong> Se ha insertado el dato correctamente";

		setTimeout(() => {
			clearAlert();
		}, 3000);
	}

	function deleteAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-danger ";
		alert_element.innerHTML = "<strong> Dato borrado</strong> Se ha borrado el dato correctamente";

		setTimeout(() => {
			clearAlert();
		}, 3000);
	}

	function deleteAllAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-danger ";
		alert_element.innerHTML = "<strong> Datos borrados</strong> Se han borrado todos los datos correctamente";

		setTimeout(() => {
			clearAlert();
		}, 3000);
	}


	function ReloadTableAlert() {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-info ";
		alert_element.innerHTML = "<strong> Tabla Restaurada</strong> Se han cargado los datos iniciales";

		setTimeout(() => {
			clearAlert();
		}, 3000);
	}


	function errorAlert(error) {
		clearAlert();
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "position: fixed; top: 0px; top: 2%; width: 90%;";
		alert_element.className = "alert alert-dismissible in alert-danger ";
		alert_element.innerHTML = "<strong> Error</strong> Ha ocurrido un error " + error;

		setTimeout(() => {
			clearAlert();
		}, 3000);
	}

	function clearAlert() {
		var alert_element = document.getElementById("div_alert");
		alert_element.style = "display: none; ";
		alert_element.className = "alert alert-dismissible in";
		alert_element.innerHTML = "";
	}




</script>

<main>
	<div role="alert" id="div_alert" style="display: none;">
	</div>
	{#await transfers}
		Loading transfers...
	{:then transfers}
				
		<FormGroup>
			<Label for="selectYear"> Año </Label>
			<Input type="select"  name="selectYear" id="selectYear" bind:value="{currentYear}">
				{#each years as year}
				<option>{year}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>

		<FormGroup> 
			<Label for="selectTeam"> Búsqueda por equipo </Label>
			<Input type="select" name="selectTeam" id="selectTeam" bind:value="{currentTeam}">
				{#each teams as team}
				<option>{team}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>

		<Button outline color="secondary" on:click="{search(currentYear, currentTeam)}" class="button-search" > <i class="fas fa-search"></i> Buscar </Button>
		<Button color="success" on:click="{ReloadTable}"  on:click={ReloadTableAlert}> <i class="fa fa-refresh" aria-hidden="true"></i> Carga Inicial API </Button>
		


		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Año</th>
					<th>Equipo</th>
					<th>Fichajes</th>
					<th>Ventas</th>
					<th>Balance</th>
					<th>Acciones</th>

				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input type="text" bind:value="{newTransfer.country}"></td>
					<td><input type="number" bind:value="{newTransfer.year}"></td>
					<td><input bind:value="{newTransfer.team}"></td>
					<td><input type="number" bind:value="{newTransfer.signing}"></td>
					<td><input type="number" bind:value="{newTransfer.sale}"></td>
					<td><input type="number" bind:value="{newTransfer.balance}"></td>
					<td> <Button outline  color="primary" on:click={insertTransfer}> <i class="fa fa-plus-circle" aria-hidden="true"></i> Insertar</Button> </td>
					
				</tr>
				{#each transfers as transfer}
					<tr>
						<td>{transfer.country}</td>
						<td>{transfer.year}</td>
						<td>{transfer.team}</td>
						<td>{transfer.signing}</td>
						<td>{transfer.sale}</td>
						<td>{transfer.balance}</td>
						<td><Button outline color="danger" on:click="{deleteTransfer(transfer.year,transfer.team)}"> <i class="fa fa-trash" aria-hidden="true"></i> Eliminar</Button></td>
						<td><Button outline color="info" href="#/global-transfers/{transfer.year}/{transfer.team}"> <i class="fa fa-edit" aria-hidden="true"></i> Editar</Button></td>
						
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
 
	<Pagination style="float:right;" ariaLabel="Cambiar de página">


		<PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/globalTransfersAPI" on:click="{() => addOffset(-1)}" />
		</PaginationItem>
		
		{#if currentPage != 1}
		<PaginationItem>
			<PaginationLink href="#/globalTransfersAPI" on:click="{() => addOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/globalTransfersAPI" >{currentPage}</PaginationLink>
		</PaginationItem>

		{#if moreData}
		<PaginationItem >
			<PaginationLink href="#/globalTransfersAPI" on:click="{() => addOffset(1)}">{currentPage + 1}</PaginationLink>
		</PaginationItem>
		{/if}

		<PaginationItem class="{moreData ? '' : 'disabled'}">
		  <PaginationLink next href="#/globalTransfersAPI" on:click="{() => addOffset(1)}"/>
		</PaginationItem>

	</Pagination>

	<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
	<Button outline on:click={deleteGlobalTransfers} color="danger"> <i class="fa fa-trash" aria-hidden="true"></i> Borrar todo </Button>
	<Button color="info" type="button" class="btn btn-primary"  onclick="window.location.href='#/global-transfers/graph'" style="margin-left: 20px;"> Gráfica Fichajes [Highchart]</Button>
	<Button color="info" type="button" class="btn btn-primary"  onclick="window.location.href='#/global-transfers/graph2'" style="margin-left: 20px;"> Gráfica Dinámica [Plotty]</Button>
</main>