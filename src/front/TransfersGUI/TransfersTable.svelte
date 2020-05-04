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
		year: parseInt("") ,
		team: "",
		signing:"",
		sale:"",
		balance:""
	};


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





//Funcion que devuelve array con los años y los paises existentes para poder hacer un select y usarlo para buscar
	async function getYearsTeams() {
		const res = await fetch("/api/v1/global-transfers"); //Recogemos los datos de /api/v1/global-marriages

		if (res.ok) {
			const json = await res.json();
			
			years = json.map((d) => {   
					return d.year;    //Guardamos los años en un array
			});
			years = Array.from(new Set(years));      //Eliminamos años repetidos

			teams = json.map((d) => {
					return d.team;            //Guardamos los equipos 
			});
			teams = Array.from(new Set(teams));   //Eliminamos los duplicados

			console.log("Contados " + years.length + "años y " + teams.length + "años distintos.");

		} else {
			console.log("ERROR!");
		}
	}

	


	async function getTransfers() {

		console.log("Fetching transfers...");
		const res = await fetch("/api/v1/global-transfers?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages); 

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			transfers = json;
			console.log("Received " + transfers.length + " transfers.");

			if (transfers.length!=10){
				moreData=false
			} else{

						const next = await fetch("/api/v1/global-transfers?offset=" + numberElementsPages * (offset+1) + "&limit=" + numberElementsPages); 
						console.log("La variable NEXT tiene el estado: " + next.status)
						const jsonNext = await next.json();
						
						
						
						if (jsonNext.length == 0 || next.status==404) {  
							moreData = false;
						} 
						else {
							moreData = true;  //Vemos si quedan aun mas datos en la siguiente pagina
						}
					}
		} 
		else {
			console.log("ERROR!");
		}
	}

	async function insertTransfer() {

		console.log("Inserting transfer..." + JSON.stringify(newTransfer));

		if (newTransfer.year == ""
			|| newTransfer.year == null
			|| newTransfer.team == "" 
			|| newTransfer.team == null) {
			
			alert("Se debe incluir el año y el equipo vinculante obligatoriamente");

		} else {
				const res = await fetch("/api/v1/global-transfers", {
					method: "POST",
					body: JSON.stringify(newTransfer),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(function (res) {
					getTransfers();
				});
				
			}
	}


	async function deleteTransfer(year, team) {
		console.log("Deleting transfer..." + JSON.stringify(year)+ + JSON.stringify(team) );

		const res = await fetch("/api/v1/global-transfers/" + year+"/"+team, {
			method: "DELETE"
		}).then(function (res) {
			getTransfers();
			getYearsTeams();
		});
	}

	async function deleteGlobalTransfers() {
		console.log("Deleting all transfers data...");
		const res = await fetch("/api/v1/global-transfers/", {
			method: "DELETE"
		}).then(function (res) {
			getTransfers();
			getYearsTeams();
		});
	}


	async function search(year, team) {
		console.log("Searching data: " + year + " and " + team);

		/* Checking if the fields are empty */
		var url = "/api/v1/global-transfers";

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
			console.log("ERROR!");
		}
		
	}

	function addOffset (increment) {
		offset += increment;
		currentPage += increment;
		getTransfers();
	}



</script>

<main>

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
		

		<Table bordered>
			<thead>
				<tr>
					<th>Pais</th>
					<th>Año</th>
					<th>Equipo</th>
					<th>Fichajes</th>
					<th>Ventas</th>
					<th>Balance</th>
					<th>Actions</th>

				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value="{newTransfer.country}"></td>
					<td><input type="number" bind:value="{newTransfer.year}"></td>
					<td><input bind:value="{newTransfer.team}"></td>
					<td><input type="number" bind:value="{newTransfer.signing}"></td>
					<td><input type="number" bind:value="{newTransfer.sale}"></td>
					<td><input type="number" bind:value="{newTransfer.balance}"></td>
					<td> <Button outline  color="primary" on:click={insertTransfer}>Insertar</Button> </td>
				</tr>
				{#each transfers as transfer}
					<tr>
						<td>{transfer.country}</td>
						<td>
							<a href="#/global-transfers/{transfer.year}/{transfer.team}">{transfer.year}</a>
						</td>
						<td>{transfer.team}</td>
						<td>{transfer.signing}</td>
						<td>{transfer.sale}</td>
						<td>{transfer.balance}</td>
						<td><Button outline color="danger" on:click="{deleteTransfer(transfer.year,transfer.team)}">Delete</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
 
	<Pagination style="float:right;" ariaLabel="Cambiar de página">


		<PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/globalTransfersAPI" on:click="{() => addOffset(-1)}" />
		</PaginationItem>
		
		<!-- If we are not in the first page-->
		{#if currentPage != 1}
		<PaginationItem>
			<PaginationLink href="#/globalTransfersAPI" on:click="{() => addOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/globalTransfersAPI" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- If there are more elements-->
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

</main>