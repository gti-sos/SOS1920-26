<script>
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';   

	import globalCoef from './CoefGUI/App.svelte';  
	import EditCoef from './CoefGUI/EditCoef.svelte';

	import globalTransfers from './TransfersGUI/App.svelte'; 
	import EditTransfer from './TransfersGUI/EditTransfer.svelte';

	import NotFound from './NotFound.svelte';

	


	const routes = {
		"/": Home,
		"/global-coef/:team/:year": EditCoef,
		"/globalCoefAPI":globalCoef,
		"/global-transfers/:year/:team": EditTransfer,
		"/globaltransfersAPI":globalTransfers,  
		"*": NotFound
	};

</script>

<main>
	<Router {routes} />
</main>