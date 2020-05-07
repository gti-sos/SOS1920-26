//----------------TRANSFERS----------------


module.exports = function (app) {
    console.log("Registering transfers API....");
    const dataStore = require ("nedb");
    const path = require ("path");
    const dbFileName =path.join(__dirname,"./transfers.db"); 
    const BASE_API_URL="/api/v1";   

    const dbTransfers = new dataStore({
        filename: dbFileName,
        autoload:true
    });
//------------------------------------------------------------------------




var initialTransfers = [
    { 
        country: "spain",
        year: 2019,
        team: "real-madrid",
        signing: 51,
        sale: 35,
        balance: -236.15
    },
    {
		country: "italy",
        year: 2019,
        team: "juventus",
        signing: 72,
        sale: 61,
        balance: -174.55	
	},

	{
		country: "spain",
        year: 2018,
        team: "fc-barcelona",
        signing: 39,
        sale: 32,
        balance: -137.05	
	},
	{
		country: "england",
        year: 2017,
        team: "manchester-city",
        signing: 68,
        sale: 56,
        balance: -404.3	
	},
	{
		country: "england",
        year: 2016,
        team: "manchester-city",
        signing: 62,
        sale: 47,
        balance: -318.91	
	},
	{
		country: "england",
        year: 2015,
        team: "manchester-united",
        signing: 50,
        sale: 52,
        balance: -200.02	
	}];
	


 function deleteIDs (transfers){
        transfers.forEach( (m) => {
            delete m._id;
        });
    }




//LOADINITIALDATA
    app.get(BASE_API_URL + "/global-transfers/loadInitialData", (req, res) => {
		dbTransfers.remove({})
        console.log("New GET .../loadInitialData")
        dbTransfers.insert(initialTransfers);
        console.log("Initial transfers loaded: " + JSON.stringify(initialTransfers, null, 2));
		res.send(JSON.stringify(initialTransfers,null,2));
    });



// POST GLOBAL transfers

app.post(BASE_API_URL+"/global-transfers",(req,res) =>{
	
	var transfers = req.body;
	
	if((transfers == {}) 
			 || (transfers.country == null) 
             || (transfers.year == null) 
			 || (transfers.team == null) 
			 || (transfers.signing == null) 
             || (transfers.sale == null)
	   		 || (transfers.balance == null)){	
			res.sendStatus(400,"BAD REQUEST");
		} else {
			dbTransfers.insert(transfers);
			
			res.sendStatus(201, "CREATED");
		}
	});	

// DELETE GLOBAL TRANSFERS

app.delete(BASE_API_URL + "/global-transfers", (req,res)=>{
		dbTransfers.remove({}, { multi: true }, function (err, numRemoved) {
            if (numRemoved>=1) {
                res.sendStatus(200, "OK");
            }else{
                res.sendStatus(404, "NOT FOUND");
            }
          
        });
    });


//PUT GLOBAL TRANSFERS

app.put(BASE_API_URL + "/global-transfers/", (req, res) => {
    res.sendStatus(405);
});



//POST GLOBAL TRANSFERS/XXX

app.post(BASE_API_URL+"/global-transfers/:year/:team",(req,res) => {
	res.sendStatus(405);
});



// GET GLOBAL TRANSFER/XXX

app.get(BASE_API_URL+"/global-transfers/:year/:team", (req,res)=>{
	
	var year = parseInt(req.params.year);
	var team = req.params.team;
	
	dbTransfers.find({$and: [{"year": year},{"team": team}]  },(err,transfers)=>{
            console.log(transfers);
            if (transfers.length != 0) {
                deleteIDs(transfers);
                res.send(JSON.stringify(transfers[0],null,2));
                console.log("Data sent: " + JSON.stringify(transfers[0],null,2));
            } else{
                res.sendStatus(404, "YEAR NOT FOUND");
            }
        })
	});

// PUT GLOBAL TRANSFER/XXX

app.put(BASE_API_URL+"/global-transfers/:year/:team", (req, res) =>{
  
  var team = req.params.team;
  var year = parseInt(req.params.year);
  var updateTransfers = req.body;
  
  dbTransfers.update({year: year, team: team}, updateTransfers, (error, numRemoved) => {
			if (numRemoved == 0) {
				res.sendStatus(404, "NOT FOUND");
			} else {
				res.sendStatus(200, "OK");
			}
		});

	});

// DELETE GLOBAL TRANSFER/XXX

app.delete(BASE_API_URL+"/global-transfers/:year/:team", (req,res)=>{
	
	var year = parseInt(req.params.year);
	var team = req.params.team;
	
	var query = {year:year, team: team};
		
		dbTransfers.remove(query, { multi: true }, (error, numRemoved) => {
			if (numRemoved == 0) {
				res.sendStatus(404, "NOT FOUND");
			} else {
				res.sendStatus(200, "OK");
			}
		}); 
	});

	
	
app.get(BASE_API_URL+"/global-transfers",(req, res) => {
 console.log("GET GLOBAL TRANSFERS");
 
 
 //if(req.query.country) request["country"] = req.query.country;
 if(req.query.year) req.query.year = parseInt(req.query.year);
 //if(req.query.team) request["team"] = req.query.team;
 if(req.query.signing) req.query.signing = parseInt(req.query.signing);
 if(req.query.sale) req.query.sale = parseInt(req.query.sale);
 if(req.query.balance) req.query.balance = parseFloat(req.query.balance);
 
 var parametros = req.query;
 console.log(parametros);
 let offset = null;
 let limit = null;

 
  if (req.query.offset) {
            offset = parseInt(req.query.offset);
            delete req.query.offset;
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
            delete req.query.limit;
        }  
  dbTransfers.find(parametros).skip(offset).limit(limit).exec((err, transfers) => {
  
     transfers.forEach((c) => {
      delete c._id;
     });
   
  
  res.send(JSON.stringify(transfers,null,2));
  console.log("RESOURCES DISPLAYED");

});
});

}
