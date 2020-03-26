const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

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
	

const BASE_API_URL = "/api/v1";


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
	
	if((newTransfer == "") || (newTransfer.year == null)){
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

app.post(BASE_API_URL+"/transfers/:year",(req,res) => {
	res.sendStatus(405);
});



// GET TRANSFER/XXX

app.get(BASE_API_URL+"/transfers/:year", (req,res)=>{
	
	var year = req.params.year;
	
	var filteredtransfers = transfers.filter((c) => {
		return (c.year == year);
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

app.delete(BASE_API_URL+"/transfers/:year", (req,res)=>{
	
	var year = req.params.year;
	
	var filteredtransfers = transfers.filter((c) => {
		return (c.year != year);
	});
	
	
	if(filteredtransfers.length < transfers.length){
		transfers = filteredtransfers;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"TRANSFER NOT FOUND");
	}
	
	
});

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");