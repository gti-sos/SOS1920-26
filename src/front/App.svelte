<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	//import Integrations from './Integrations.svelte';
	//import Analytics from './Analytics.svelte';  
	import NotFound from './NotFound.svelte';
//API COEF-----------------------------------------------------------------
	import globalCoef from './CoefGUI/App.svelte.html';  
	import EditCoef from './CoefGUI/EditCoef.svelte.html';
	import GraphCoef from './CoefGUI/GraphCoef.svelte.html';
	import GraphCoef2 from './CoefGUI/GraphCoef2.svelte.html';
//API TRANSFERS------------------------------------------------------------
	import globalTransfers from './TransfersGUI/App.svelte.html'; 
	import EditTransfer from './TransfersGUI/EditTransfer.svelte.html';
	import GraphTransfer from './TransfersGUI/GraphTransfer.svelte.html';
	import GraphTransfer2 from './TransfersGUI/GraphTransfer2.svelte.html';
//API GOALSCORES-----------------------------------------------------------
	import goalscorers from './GoalscorersGUI/App.svelte';
	import EditGoalscorer from './GoalscorersGUI/EditGoalscorer.svelte';


	


	const routes = {
		"/": Home,
		//"/analytics": Analytics,
		//"/integrations": Integrations,


		"/global-coef/:team/:year": EditCoef,
		"/globalCoefAPI":globalCoef,
		"/global-coef/graph": GraphCoef,
		"/global-coef/graph2": GraphCoef2,


		"/global-transfers/:year/:team": EditTransfer,
		"/globaltransfersAPI":globalTransfers,
		
		"/goalscorers/:name":EditGoalscorer,
		"/goalscorersAPI":goalscorers,  


		"/global-transfers/graph": GraphTransfer,
		"/global-transfers/graph2": GraphTransfer2,



		"*": NotFound
	};

</script>

<main>
	<Router {routes} />
</main>