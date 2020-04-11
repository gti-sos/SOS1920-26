
//------COEF--------------------------------------------------------------------------

module.exports = function (app) {
    console.log("Registering coef API....");
    const dataStore = require ("nedb");
    const path = require ("path"); //para que podamos trabajar de manera standar con las direcciones (No haya problema entre Unix y Windows )

    const dbFileName =path.join(__dirname,"./coef.db");   //archivo donde almacenamos los datos que vamos a persistir
    const BASE_API_URL="/api/v1";   // ESta es la URL base

    const dbCoef = new dataStore({
        filename: dbFileName,
        autoload:true
    });
//---------------------------------------                        ------------------------------------------
	
var initialCoef = [
	{ 
		country: "spain",
		year: 2018,
		team: "real-madrid",
		coefficient: 146.000,
		fed: 20.713,
		classification: 1
	},
	{ 
		country: "germany",
		year: 2018,
		team: "bayern",
		coefficient: 128.000,
		fed: 14.385,
		classification: 3
	},
	{ 
		country: "spain",
		year: 2016,
		team: "atletico-de-madrid",
		coefficient: 122.000,
		fed: 20.999,
		classification: 4
	},
	{ 
		country: "italy",
		year: 2018,
		team: "juventus",
		coefficient: 124.000,
		fed: 14.945,
		classification: 5
	},
	{ 
		country: "spain",
		year: 2018,
		team: "sevilla",
		coefficient: 104.000,
		fed: 20.713,
		classification: 7
	}
];

	
    function deleteIDs (coef){
        coef.forEach( (m) => {
            delete m._id;
        });
    }




//LOADINITIALDATA coefBD
    app.get(BASE_API_URL + "/global-coef/loadInitialData", (req, res) => {
        console.log("New GET .../loadInitialData")
        dbCoef.insert(initialCoef);
        res.sendStatus(200);
        console.log("Initial coef loaded: " + JSON.stringify(initialCoef, null, 2));
    });
	

 //GET coef
    
    app.get(BASE_API_URL+"/global-coef",(req,res) =>{
        console.log("New GET... /global-coef");
    
        dbCoef.find({},(err,coef)=>{    // la variable coef tendra guardado lo que se ha encontrado en la consulta a la base de datos con los datos 
                                        // especificados en {}
            deleteIDs(coef);
            res.send(JSON.stringify(coef,null,2));
            console.log("Data sent: " + JSON.stringify(coef,null,2));
        });
    });

	
// POST GLOBAL-coef

	app.post(BASE_API_URL+"/global-coef", (req, res) => {
        var coef = req.body;

		if((coef == {}) 
			 || (coef.country == null) 
             || (coef.year == null) 
			 || (coef.team == null) 
			 || (coef.coefficient == null) 
             || (coef.classification == null)){	
			res.sendStatus(400,"BAD REQUEST");
		} else {
			dbCoef.insert(coef);
			
			res.sendStatus(201, "CREATED");
		}
	});	
	
	
	
// DELETE global-coef
app.delete(BASE_API_URL + "/global-coef", (req,res)=>{
		dbCoef.remove({}, { multi: true }, function (err, numRemoved) {
            if (numRemoved>=1) {
                res.sendStatus(200, "OK");
            }else{
                res.sendStatus(404, "NOT FOUND");
            }
          
        });
    });
	
	
//GET GLOBAL-coef/team/year

	app.get(BASE_API_URL+"/global-coef/:team/:year", (req,res)=>{
	
	var team = req.params.team;
	var year =  parseInt(req.params.year);
       
        dbCoef.find({$and: [{"team": team},{"year": year}]  },(err,coef)=>{
            console.log(coef);
            if (coef.length != 0) {
                deleteIDs(coef);
                res.send(JSON.stringify(coef[0],null,2));
                console.log("Data sent: " + JSON.stringify(coef[0],null,2));
            } else{
                res.sendStatus(404, "TEAM NOT FOUND");
            }
        })
	});
	


	
// PUT coef/team/year

app.put(BASE_API_URL+"/global-coef/:team/:year", (req, res) =>{
  
  	var team = req.params.team;
	var year =  parseInt(req.params.year);
	var updateCoef = req.body;
  

		dbCoef.update({team: team, year: year}, updateCoef, (error, numRemoved) => {
			// Checking if any data has been updated (numRemoved>=1)
			if (numRemoved == 0) {
				res.sendStatus(404, "NOT FOUND");
			} else {
				res.sendStatus(200, "OK");
			}
		});

	});





// DELETE coef/team/year

app.delete(BASE_API_URL+"/global-coef/:team/:year", (req,res)=>{
	
	var team = req.params.team;
	var year =  parseInt(req.params.year);
	
	var query = {team: team, year:year};
		
		dbCoef.remove(query, { multi: true }, (error, numRemoved) => {
			if (numRemoved == 0) {
				res.sendStatus(404, "NOT FOUND");
			} else {
				res.sendStatus(200, "OK");
			}
		}); 
	});
	
	
	
	
	
//POST error
app.post(BASE_API_URL + "/global-coef/:team/:year", (req, res) => {
    res.sendStatus(405);
});

//PUT error
app.put(BASE_API_URL + "/global-coef", (req, res) => {
    res.sendStatus(405);
});  


//Búsqueda por todos los campos del recurso

app.get(BASE_API_URL+"/global-coef",(req, res) => {
 console.log("GET GLOBAL COEF");
 
 var request = {};
 if(req.query.country) request["country"] = req.query.country;
 if(req.query.year) request["year"] = parseInt(req.query.year);
 if(req.query.team) request["team"] = req.query.team;
 if(req.query.coefficient) request["coefficient"] = parseFloat(req.query.coefficient);
 if(req.query.fed) request["fed"] = parseFloat(req.query.fed);
 if(req.query.classification) request["classification"] = parseInt(req.query.classification);
 
 const offset =  0;
 const limit = Number.MAX_SAFE_INTEGER;
 
 dbCoef.find(request,{}).skip(offset).limit(limit).exec((err, coef) => {
  //la query se pone entre llaves, para que devuelva todo se deja vacío si se pone name: "nono"  sólo devuelve los nono
  coef.forEach((c) => {
   delete c._id;
  });
  
  console.log("New GET_0.2  coef");
  
  res.send(JSON.stringify(coef,null,2));
  
  console.log("Data sent: "+JSON.stringify(coef,null,2));
 });
 
});
	
}