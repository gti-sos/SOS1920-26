<script>
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';   
//API COEF-----------------------------------------------------------------
	import globalCoef from './CoefGUI/App.svelte';  
	import EditCoef from './CoefGUI/EditCoef.svelte';
	import GraphRoutes from './CoefGUI/GraphCoef.svelte';
//API TRANSFERS------------------------------------------------------------
	import globalTransfers from './TransfersGUI/App.svelte'; 
	import EditTransfer from './TransfersGUI/EditTransfer.svelte';
//API GOALSCORES-----------------------------------------------------------
	import goalscorers from './GoalscorersGUI/App.svelte';
	import EditGoalscorer from './GoalscorersGUI/EditGoalscorer.svelte';

	import NotFound from './NotFound.svelte';

	


	const routes = {
		"/": Home,
		"/global-coef/:team/:year": EditCoef,
		"/globalCoefAPI":globalCoef,

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