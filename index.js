const express = require("express");
const bodyParser = require("body-parser");
const dataStore = require("nedb");
const path = require("path");
const goalscorersAPI = require(path.join(__dirname, "goalscorersAPI"));

const BASE_API_URL = "/api/v1";
const port = process.env.PORT || 80;

//const dbFileName = path.join(__dirname, "goalscorers.db");

const app = express();
app.use(bodyParser.json());

/*const db = new dataStore({
				filename: dbFileName,
				autoload: true
	});
*/

app.use("/", express.static("./public"));

goalscorersAPI(app, path, BASE_API_URL, dataStore);

//----------------TRANSFERS----------------


var transfers = [
    { 
        country: "spain",
        year: 2019,
        team: "real-madrid",
        signing: 51,
        sale: 35,
        balance: -236.15
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
	


//LOADING INITIAL DATA

app.get(BASE_API_URL + "/transfers/loadInitialData", (req, res) => {

	transfers = [
    { 
        country: "spain",
        year: 2019,
        team: "real-madrid",
        signing: 51,
        sale: 35,
        balance: -236.15
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
	
	
		res.send(JSON.stringify(transfers,null,2));
		res.sendStatus(200);
});


// GET TRANSFERS

app.get(BASE_API_URL+"/transfers", (req,res) =>{
	res.send(JSON.stringify(transfers,null,2));
	console.log("Data sent:"+JSON.stringify(transfers,null,2));
});


// POST transfers

app.post(BASE_API_URL+"/transfers",(req,res) =>{
	
	var newTransfer = req.body;
	
	if((newTransfer == "") || (newTransfer.team == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		transfers.push(newTransfer); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE TRANSFERS

app.delete(BASE_API_URL + "/transfers", (req,res)=>{
	
	transfers = [];
	
	res.sendStatus(200);
});


//PUT TRANSFERS

app.put(BASE_API_URL + "/transfers/", (req, res) => {
    res.sendStatus(405);
});



//POST TRANSFERS/XXX

app.post(BASE_API_URL+"/transfers/:team",(req,res) => {
	res.sendStatus(405);
});



// GET TRANSFER/XXX

app.get(BASE_API_URL+"/transfers/:year/:team", (req,res)=>{
	
	var year = req.params.year;
	var team = req.params.team;
	
	var filteredtransfers = transfers.filter((c) => {
		return (c.year == year && c.team == team);
	});
	
	
	if(filteredtransfers.length >= 1){
		res.send(filteredtransfers[0]);
	}else{
		res.sendStatus(404,"TRANSFER NOT FOUND");
	}
});

// PUT TRANSFER/XXX

app.put(BASE_API_URL+"/transfers/:year/:team", (req, res) =>{
  
  var team = req.params.team;
  var year = req.params.year;
  var updateTransfer = req.body;
  
  filteredTransfer = transfers.filter((c) => {
    return (c.year == year && c.team ==team);
  });

  if(filteredTransfer.length == 0){
    res.sendStatus(404);
    return;
  }
  
  if(!updateTransfer.country || !updateTransfer.balance ||!updateTransfer.team || !updateTransfer.signing
     || !updateTransfer.sale || updateTransfer.year != year){
                console.log("PUT recurso encontrado. Se intenta actualizar con campos no validos 400");
                res.sendStatus(400);
    return;
  }
  
  transfers = transfers.map((c) => {
    if(c.year == updateTransfer.year){
      return updateTransfer;
    }else{
      return c;
    }
    
  });
  res.sendStatus(200);
});

// DELETE TRANSFER/XXX

app.delete(BASE_API_URL+"/transfers/:year/:team", (req,res)=>{
	
	var year = req.params.year;
	var team = req.params.team;
	
	var filteredtransfers = transfers.filter((c) => {
		return (c.year == year && c.team == team);
	});
	
	
	if(filteredtransfers.length < transfers.length){
		transfers = filteredtransfers;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"TRANSFER NOT FOUND");
	}
	
	
});


//------COEF--------------------------------------------------------------------------



var coef = [
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




//LOADINITIALDATA
app.get(BASE_API_URL + "/coef/loadInitialData", (req, res) => {

	coef = [
	{ country: "spain",
		year: 2018,
		team: "real-madrid",
		coefficient: 146.000,
		fed: 20.713,
		classification: 1
	}, { country: "germany",
		year: 2018,
		team: "bayern",
		coefficient: 128.000,
		fed: 14.385,
		classification: 3
	}, { country: "spain",
		year: 2016,
		team: "atletico-de-madrid",
		coefficient: 122.000,
		fed: 20.999,
		classification: 4
	}, { country: "italy",
		year: 2018,
		team: "juventus",
		coefficient: 124.000,
		fed: 14.945,
		classification: 5}, { country: "spain",
		year: 2018,
		team: "sevilla",
		coefficient: 104.000,
		fed: 20.713,
		classification: 7}];
	
	
		res.send(JSON.stringify(coef,null,2));
		res.sendStatus(200);
});





// GET coef

app.get(BASE_API_URL+"/coef", (req,res) =>{
	res.send(JSON.stringify(coef,null,2));
	console.log("Data sent:"+JSON.stringify(coef,null,2));
});


// POST coef

app.post(BASE_API_URL+"/coef",(req,res) =>{
	
	var newCoef = req.body;
	
	if((newCoef == "") || (newCoef.team == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		coef.push(newCoef); 	
		res.sendStatus(201,"CREATED");
	}
});

// DELETE coef
app.delete(BASE_API_URL + "/coef", (req,res)=>{
	
	coef = [];
	
	res.sendStatus(200);
});

// GET coef/team/year

app.get(BASE_API_URL+"/coef/:team/:year", (req,res)=>{
	
	var team = req.params.team;
	var year = req.params.year;
	
 filteredCoef = coef.filter((c) => {
    return (c.team == team && c.year ==year);
  });
	
	
	if(filteredCoef.length >= 1){
		res.send(filteredCoef[0]);
	}else{
		res.sendStatus(404,"COEF NOT FOUND");
	}
});

// PUT coef/team/year

app.put(BASE_API_URL+"/coef/:team/:year", (req, res) =>{
  
  var team = req.params.team;
  var year = req.params.year;
	var updateCoef = req.body;
  
  filteredCoef = coef.filter((c) => {
    return (c.team == team && c.year ==year);
  });

  if(filteredCoef.length == 0){
    res.sendStatus(404);
    return;
  }
  
  if(!updateCoef.country || !updateCoef.year ||!updateCoef.coefficient || !updateCoef.fed
     || !updateCoef.classification || updateCoef.team != team){
                console.log("COEF  FIND. NO FACT VALID 400");
                res.sendStatus(400);
    return;
  }
  
  coef = coef.map((c) => {
    if(c.team == updateCoef.team){
      return updateCoef;
    }else{
      return c;
    }
    
  });
  res.sendStatus(200);
});





// DELETE CONTACT/team/year

app.delete(BASE_API_URL+"/coef/:team/:year", (req,res)=>{
	
	var team = req.params.team;
	var year = req.params.year;
	
	var filteredCoef = coef.filter((c) => {
    return (c.team == team && c.year ==year);
 	 });
	
	
	if(filteredCoef.length < coef.length){
		coef = filteredCoef;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"COEF NOT FOUND");
	}
	
	
});

//POST error
app.post(BASE_API_URL + "/coef/:team/:year", (req, res) => {
    res.sendStatus(405);
});

//PUT error
app.put(BASE_API_URL + "/coef", (req, res) => {
    res.sendStatus(405);
});


//Búsqueda por todos los campos del recurso

app.get(BASE_API_URL+"/global-coef",(req, res) => {
 console.log("GET GLOBAL COEF");
 
 var request = {};
 if(req.query.country) request["country"] = req.query.country;
 if(req.query.year) request["year"] = parseFloat(req.query.year);
 if(req.query.team) request["team"] = parseFloat(req.query.team);
 if(req.query.coefficient) request["coefficient"] = parseInt(req.query.coefficient);
 if(req.query.fed) request["fed"] = parseFloat(req.query.fed);
 if(req.query.classification) request["classification"] = parseFloat(req.query.classification);
 
 const offset =  0;
 const limit = Number.MAX_SAFE_INTEGER;
 
 globalCoefDb.find(request,{}).skip(offset).limit(limit).exec((err, coef) => {
  //la query se pone entre llaves, para que devuelva todo se deja vacío si se pone name: "nono"  sólo devuelve los nono
  coef.forEach((c) => {
   delete c._id;
  });
  
  console.log("New GET_0.2  coef");
  
  res.send(JSON.stringify(coef,null,2));
  
  console.log("Data sent: "+JSON.stringify(coef,null,2));
 });
 
});







app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");