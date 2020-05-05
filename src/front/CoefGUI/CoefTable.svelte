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

//Variables para la paginacion y para la busqueda
	let countries = [];
	let years = [];
	let currentCountry = "-";
	let currentYear = "-";

	let numberElementsPages = 10;
	let offset = 0;
	let currentPage = 1; 
	let moreData = true; 

	onMount(getCoef);
	onMount(getCountriesYears);





//Funcion que devuelve array con los años y los paises existentes para poder hacer un select y usarlo para buscar
	async function getCountriesYears() {
		const res = await fetch("/api/v1/global-coef"); //Recogemos los datos de /api/v1/global-coef

		if (res.ok) {
			const json = await res.json();

			countries = json.map((d) => {
					return d.country;            
			});
			countries = Array.from(new Set(countries));   
			
			
			years = json.map((d) => {   
					return d.year;    
			});
			years = Array.from(new Set(years));      

			console.log("Contados " + countries.length + "paises y " + years.length + "años distintos.");

		} else {
			console.log("ERROR!");
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
			console.log("ERROR!");
		}
	}

	async function insertCoef() {

		console.log("Inserting coef..." + JSON.stringify(newCoef));

		if (newCoef.country == ""
			|| newCoef.country == null
			|| newCoef.year == "" 
			|| newCoef.year == null) {
			
			alert("Se debe incluir el nombre del país y el año obligatoriamente");

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


	//Borramos un pais en un año concreto
	async function deleteCoef(country,year) {
		console.log("Deleting coef..." + JSON.stringify(country)+ + JSON.stringify(year) );

		const res = await fetch("/api/v1/global-coef/" + country+"/"+year, {
			method: "DELETE"
		}).then(function (res) {
			getCoef();
			getCountriesYears();
		});
	}

	//Borramos todos los paises
	async function deleteGlobalCoef() {
		console.log("Deleting all coef data...");
		const res = await fetch("/api/v1/global-coef/", {
			method: "DELETE"
		}).then(function (res) {
			getCoef();
			getCountriesYears();
		});
	}


	async function search(country, year) {
		console.log("Searching data: " + country + " and " + year);

		
		var url = "/api/v1/global-coef";

		if (country != "-" && year != "-") {
			url = url + "?country=" + country + "&year=" + year; 
		} else if (country != "-" && year == "-") {
			url = url + "?country=" + country;
		} else if (country == "-" && year != "-") {
			url = url + "?year=" + year;
		}

		const res = await fetch(url);

		if (res.ok) {
			console.log("Ok:");
			const json = await res.json();
			coef = json;			

			console.log("Found " + coef.length + " global coef stats.");
		} else {
			console.log("ERROR!");
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
			<Label for="selectCountry"> Búsqueda por país </Label>
			<Input type="select" name="selectCountry" id="selectCountry" bind:value="{currentCountry}">
				{#each countries as country}
				<option>{country}</option>
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

		<Button outline color="secondary" on:click="{search(currentCountry, currentYear)}" class="button-search" > <i class="fas fa-search"></i> Buscar </Button>
		

		<Table bordered > <!--Administrador de Coef -->
			<thead>
				<tr>
					<th>Pais</th>
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
						<td>
							<a href="#/global-coef/{coef.country}/{coef.year}">{coef.country}</a>
						</td>
						<td>{coef.year}</td>
						<td>{coef.team}</td>
						<td>{coef.coefficient}</td>
						<td>{coef.fed}</td>
						<td>{coef.classification}</td>
						<td><Button outline color="danger" on:click="{deleteCoef(coef.country,coef.year)}">Delete</Button></td>
					</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
 
	<Pagination style="float:right;" ariaLabel="Cambiar de página">


		<PaginationItem class="{currentPage === 1 ? 'disabled' : ''}">
		  <PaginationLink previous href="#/globalCoefAPI" on:click="{() => addOffset(-1)}" />
		</PaginationItem>
		
		<!-- If we are not in the first page-->
		{#if currentPage != 1}
		<PaginationItem>
			<PaginationLink href="#/globalCoefAPI" on:click="{() => addOffset(-1)}" >{currentPage - 1}</PaginationLink>
		</PaginationItem>
		{/if}
		<PaginationItem active>
			<PaginationLink href="#/globalCoefAPI" >{currentPage}</PaginationLink>
		</PaginationItem>

		<!-- If there are more elements-->
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