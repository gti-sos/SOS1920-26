<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';
	import Integrations from './Integrations.svelte';
	//import Analytics from './Analytics.svelte';  
	import NotFound from './NotFound.svelte';
//API COEF-----------------------------------------------------------------
	import globalCoef from './CoefGUI/App.svelte';  
	import EditCoef from './CoefGUI/EditCoef.svelte';
	import GraphCoef from './CoefGUI/GraphCoef.svelte';
	import GraphCoef2 from './CoefGUI/GraphCoef2.svelte';
//API TRANSFERS------------------------------------------------------------
	import globalTransfers from './TransfersGUI/App.svelte'; 
	import EditTransfer from './TransfersGUI/EditTransfer.svelte';
	import GraphTransfer from './TransfersGUI/GraphTransfer.svelte';
	import GraphTransfer2 from './TransfersGUI/GraphTransfer2.svelte';
//API GOALSCORES-----------------------------------------------------------
	import goalscorers from './GoalscorersGUI/App.svelte';
	import EditGoalscorer from './GoalscorersGUI/EditGoalscorer.svelte';
	import GraphGoalscorers from './GoalscorersGUI/GraphGoalscorers.svelte';
	import GraphGoalscorers2 from './GoalscorersGUI/GraphGoalscorers2.svelte';


//INTEGRACIONES Coef
	import IntegrationsCoef from './CoefGUI/Integrations.svelte';
	import IntegrationsCoefG1 from './CoefGUI/Integrations1.svelte';
	import IntegrationsCoefG5 from './CoefGUI/Integrations2.svelte';
	import IntegrationsCoefG24 from './CoefGUI/Integrations3.svelte';
	import IntegrationsCoefG10 from './CoefGUI/Integrations4.svelte';
	import IntegrationsCoefG30 from './CoefGUI/Integrations5.svelte';

//INTEGRACIONES DIEGO
	import IntegrationsTransfer from './TransfersGUI/Integrations.svelte';
	import IntegrationsTransferG8 from './TransfersGUI/Integrations1.svelte';
	import IntegrationsTransferG9 from './TransfersGUI/Integrations2.svelte';
	import IntegrationsTransferG10 from './TransfersGUI/Integrations3.svelte';
	import IntegrationsTransferG21 from './TransfersGUI/Integrations4.svelte';
	import IntegrationsTransferG24 from './TransfersGUI/Integrations5.svelte';
	import IntegrationsTransferEXT1 from './TransfersGUI/IntegrationsExt1.svelte';

//INTEGRACIONES GOALSCORERS
	import IntegrationsGoalscorers from './GoalscorersGUI/Integrations.svelte';
	import IntegrationGoalscorersG22 from './GoalscorersGUI/IntegrationG22.svelte';
	import IntegrationGoalscorersG21 from './GoalscorersGUI/IntegrationG21.svelte';
	import IntegrationGoalscorersG12 from './GoalscorersGUI/IntegrationG12.svelte';
	import IntegrationGoalscorersG10 from './GoalscorersGUI/IntegrationG10.svelte';
//FIN INTEGRACIONES	


	const routes = {
		"/": Home,
		//"/analytics": Analytics,
		"/integrations": Integrations,


		"/global-coef/:team/:year": EditCoef,
		"/globalCoefAPI":globalCoef,
		"/global-coef/graph": GraphCoef,
		"/global-coef/graph2": GraphCoef2,


		"/global-transfers/:year/:team": EditTransfer,
		"/globaltransfersAPI":globalTransfers,
		
		"/goalscorers/:name":EditGoalscorer,
		"/goalscorersAPI":goalscorers,  
		"/goalscorers/graphs/graph1": GraphGoalscorers,
		"/goalscorers/graphs/graph2": GraphGoalscorers2,

		"/global-transfers/graph": GraphTransfer,
		"/global-transfers/graph2": GraphTransfer2,


		//INTEGRACIONES DIEGO
		
		"/integrations/global-transfers": IntegrationsTransfer,
		"/integrations/global-transfers/IntegrationsG8": IntegrationsTransferG8,
		"/integrations/global-transfers/IntegrationsG9": IntegrationsTransferG9,
		"/integrations/global-transfers/IntegrationsG10": IntegrationsTransferG10,
		"/integrations/global-transfers/IntegrationsG21": IntegrationsTransferG21,
		"/integrations/global-transfers/IntegrationsG24": IntegrationsTransferG24,
		"/integrations/global-transfers/IntegrationsExt1": IntegrationsTransferEXT1,

		
		//INTEGRACIONES Coef
		"/integrations/global-coef": IntegrationsCoef,
		"/integrations/global-coef/IntegrationsG1": IntegrationsCoefG1,
		"/integrations/global-coef/IntegrationsG5": IntegrationsCoefG5,
		"/integrations/global-coef/IntegrationsG24": IntegrationsCoefG24,
		"/integrations/global-coef/IntegrationsG10": IntegrationsCoefG10,
		"/integrations/global-coef/IntegrationsG30": IntegrationsCoefG30,

		//INTEGRACIONES GOALSCORERS
		"/integrations/goalscorers": IntegrationsGoalscorers,
		"/integrations/goalscorers/integrationG22": IntegrationGoalscorersG22,
		"/integrations/goalscorers/integrationG21": IntegrationGoalscorersG21,
		"/integrations/goalscorers/integrationG12": IntegrationGoalscorersG12,
		"/integrations/goalscorers/integrationG10": IntegrationGoalscorersG10,
		//FIN INTEGRACIONES




		"*": NotFound
	};

</script>

<main>
	<Router {routes} />
</main>