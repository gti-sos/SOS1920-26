const express = require("express");
const bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 80;

var coef = [
	{ 
		country: "spain",
		year: 2018,
		team: "real madrid",
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
		team: "atletico de madrid",
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



app.get(BASE_API_URL+"/coef", (req,res) =>{
	res.send(JSON.stringify(coef,null,2));
});

app.post(BASE_API_URL+"/coef",(req,res) =>{
	coef.push(req.body); 
	res.sendStatus(201,"CREATED");
});

app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");



