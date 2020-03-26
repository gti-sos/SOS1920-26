const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

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

const BASE_API_URL = "/api/v1";


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

// update coef/team/year

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


app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");




