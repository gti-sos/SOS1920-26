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

	let coef = [];
	let newCoef = {
		country: "",
		year: parseInt("") ,
		team: "",
		coefficient:"",
		fed:"",
		classification:""
	};

//Variables para paginacion y busqueda
	let teams = [];
	let years = [];
	let currentTeam = "-";
	let currentYear = "-";

	let numberElementsPages = 10;
	let offset = 0;
	let currentPage = 1; 
	let moreData = true; 

	onMount(getCoef);
	onMount(getTeamsYears);





//Funcion que devuelve array con los equipos y años
	async function getTeamsYears() {
		const res = await fetch("/api/v1/global-coef");

		if (res.ok) {
			const json = await res.json();

			teams = json.map((d) => {
					return d.team;            
			});
			teams = Array.from(new Set(teams));   
			
			
			years = json.map((d) => {   
					return d.year;    
			});
			years = Array.from(new Set(years));      

			console.log("Contados " + teams.length + "equipos y " + years.length + "años distintos.");

		} else {
			console.log("ERROR");
		}
	}

	


	async function getCoef() {

		console.log("Fetching coef...");
		const res = await fetch("/api/v1/global-coef?offset=" + numberElementsPages * offset + "&limit=" + numberElementsPages); 

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			coef = json;
			console.log("Received " + coef.length + " coef.");

			if (coef.length!=10){
				moreData=false
			} else{

						const next = await fetch("/api/v1/global-coef?offset=" + numberElementsPages * (offset+1) + "&limit=" + numberElementsPages); 
						console.log("La variable NEXT tiene el estado: " + next.status)
						const jsonNext = await next.json();
						
						
						
						if (jsonNext.length == 0 || next.status==404) {  
							moreData = false;
						} 
						else {
							moreData = true;  
						}
					}
		} 
		else {
			console.log("ERROR");
		}
	}

	async function insertCoef() {

		console.log("Inserting coef..." + JSON.stringify(newCoef));

		if (newCoef.team == ""
			|| newCoef.team == null
			|| newCoef.year == "" 
			|| newCoef.year == null) {
			
			alert("Se debe incluir el nombre del equipo y año obligatoriamente");

		} else {
				const res = await fetch("/api/v1/global-coef", {
					method: "POST",
					body: JSON.stringify(newCoef),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(function (res) {
					getCoef();
				});
			}
	}


//Borrar un equipo en un año 
	async function deleteCoef(team,year) {
		console.log("Deleting coef..." + JSON.stringify(team)+ + JSON.stringify(year) );

		const res = await fetch("/api/v1/global-coef/" + team+"/"+year, {
			method: "DELETE"
		}).then(function (res) {
			getCoef();
			getTeamsYears();
		});
	}

//Borrar todos los equipos
	async function deleteGlobalCoef() {
		console.log("Deleting all coef data...");
		const res = await fetch("/api/v1/global-coef/", {
			method: "DELETE"
		}).then(function (res) {
			getCoef();
			getTeamsYears();
		});
	}


	async function search(team, year) {
		console.log("Searching data: " + team + " and " + year);

		
		var url = "/api/v1/global-coef";

		if (team != "-" && year != "-") {
			url = url + "?team=" + team + "&year=" + year; 
		} else if (team != "-" && year == "-") {
			url = url + "?team=" + team;
		} else if (team == "-" && year != "-") {
			url = url + "?year=" + year;
		}

		const res = await fetch(url);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			coef = json;			

			console.log("Found " + coef.length + " global coef stats.");
		} else {
			console.log("ERROR");
		}
		
	}

	function addOffset (increment) {
		offset += increment;
		currentPage += increment;
		getCoef();
	}



</script>

<main>

	{#await coef}
		Loading coef...
	{:then coef}

		<FormGroup> 
			<Label for="selectTeam"> Búsqueda por equipo </Label>
			<Input type="select" name="selectTeam" id="selectTeam" bind:value="{currentTeam}">
				{#each teams as team}
				<option>{team}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>
				
		<FormGroup>
			<Label for="selectYear"> Año </Label>
			<Input type="select"  name="selectYear" id="selectYear" bind:value="{currentYear}">
				{#each years as year}
				<option>{year}</option>
				{/each}
				<option>-</option>
			</Input>
		</FormGroup>

		<Button outline color="secondary" on:click="{search(currentTeam, currentYear)}" class="button-search" > <i class="fas fa-search"></i> Buscar </Button>
		

		<Table bordered > 
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
					<td><input bind:value="{newCoef.country}"></td>
					<td><input type="number" bind:value="{newCoef.year}"></td>
					<td><input bind:value="{newCoef.team}"></td>
					<td><input type="number" bind:value="{newCoef.coefficient}"></td>
					<td><input type="number" bind:value="{newCoef.fed}"></td>
					<td><input type="number" bind:value="{newCoef.classification}"></td>
					<td> <Button outline  color="primary" on:click={insertCoef}>Insertar</Button> </td>
				</tr>
				{#each coef as coef}
					<tr>
						<td>{coef.team}</td>
						<td>{coef.year}</td>
						<td>
							<a href="#/global-coef/{coef.team}/{coef.year}">{coef.team}</a>
						</td>
						<td>{coef.coefficient}</td>
						<td>{coef.fed}</td>
						<td>{coef.classification}</td>
						<td><Button outline color="danger" on:click="{deleteCoef(coef.team,coef.year)}">Eliminar</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
 
	<Pagination style="float:right;" ariaLabel="Cambiar de página">


		<PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/globalCoefAPI" on:click="{() => addOffset(-1)}" />
		</PaginationItem>
		
		
		{#if currentPage != 1}
		<PaginationItem>
			<PaginationLink href="#/globalCoefAPI" on:click="{() => addOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/globalCoefAPI" >{currentPage}</PaginationLink>
		</PaginationItem>

		
		{#if moreData}
		<PaginationItem >
			<PaginationLink href="#/globalCoefAPI" on:click="{() => addOffset(1)}">{currentPage + 1}</PaginationLink>
		</PaginationItem>
		{/if}

		<PaginationItem class="{moreData ? '' : 'disabled'}">
		  <PaginationLink next href="#/globalCoefAPI" on:click="{() => addOffset(1)}"/>
		</PaginationItem>

	</Pagination>

	<Button outline color="secondary" on:click="{pop}"> <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
	<Button outline on:click={deleteGlobalCoef} color="danger"> <i class="fa fa-trash" aria-hidden="true"></i> Borrar todo </Button>

</main>