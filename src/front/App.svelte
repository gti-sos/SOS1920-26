<script>
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';   

	import globalCoef from './CoefGUI/App.svelte';  
	import EditCoef from './CoefGUI/EditCoef.svelte';

	import NotFound from './NotFound.svelte';

	


	const routes = {
		"/": Home,
		"/global-Coef/:country/:year": EditCoef,
		"/globalCoefAPI":globalCoef, 
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>