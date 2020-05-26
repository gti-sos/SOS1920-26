<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	//import Integrations from './Integrations.svelte';
	//import Analytics from './Analytics.svelte';  
	import NotFound from './NotFound.svelte';
//API COEF-----------------------------------------------------------------
	import globalCoef from './CoefGUI/App.svelte';  
	import EditCoef from './CoefGUI/EditCoef.svelte';
	import GraphCoef from './CoefGUI/GraphCoef.svelte';
//API TRANSFERS------------------------------------------------------------
	import globalTransfers from './TransfersGUI/App.svelte'; 
	import EditTransfer from './TransfersGUI/EditTransfer.svelte';
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
	//	"/global-coef/graph-v2": GraphCoefV2,


		"/global-transfers/:year/:team": EditTransfer,
		"/globaltransfersAPI":globalTransfers,
		
		"/goalscorers/:name":EditGoalscorer,
		"/goalscorersAPI":goalscorers,  
		"*": NotFound
	};

</script>

<main>
	<Router {routes} />
</main>