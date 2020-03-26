const express = require("express");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 80;

const BASE_API_URL = "/api/v1";

app.use("/", express.static("./public"));

//-------------TOP-GOALSCORERS-------------
var topGoalscorers = [];
//LOADINITIALDATA TOP-GOALSCORERS
app.get(BASE_API_URL + "/top-goalscorers/loadInitialData", (req, res) => {

    topGoalscorers = [{ 
		name: "Cristiano",
		country: "Portugal",
		debut: 2002,
		goals: 128,
		matches: 167,
		teams: 3
	},
	{ 
		name: "Messi",
		country: "Argentina",
		debut: 2004,
		goals: 114,
		matches: 136,
		teams: 1
	},
	{ 
		name: "Benzema",
		country: "France",
		debut: 2005,
		goals: 64,
		matches: 115,
		teams: 2
	}];

    res.sendStatus(200, "INITIAL DATA LOADED");
});

//POST TOP-GOALSCORERS
app.post(BASE_API_URL+"/top-goalscorers",(req,res) =>{
	var newGoalscorer = req.body;
	
	
	if((newGoalscorer == "") || newGoalscorer.name == null){
		res.sendStatus(400,"BAD REQUEST");
	}else{
		topGoalscorers.push(newGoalscorer);
		res.sendStatus(201,"CREATED");
	}
		
});

//GET TOP-GOALSCORERS
app.get(BASE_API_URL+"/top-goalscorers", (req,res) =>{
	res.send(JSON.stringify(topGoalscorers,null,2));
});

//PUT TOP-GOALSCORERS
app.put(BASE_API_URL+"/top-goalscorers", (req,res) =>{
	res.sendStatus(405, "IT IS NOT ALLOWED");
});


//DELETE TOP-GOALSCORERS

app.delete(BASE_API_URL+"/top-goalscorers", (req,res)=>{
	var name = req.params.name;
	if(topGoalscorers.length > 0 && name==null){
		topGoalscorers = [];
		res.sendStatus(200, "TOPGOALSCORERS DELETED");
	}else{
		res.sendStatus(404, "THERE IS NO TOPSCORER TO CLEAR");
	}
});

//POST TOP-TOPGOALSCORERS/XXXXX
app.post(BASE_API_URL+"/top-goalscorers/:name", (req,res) =>{
	res.sendStatus(405, "IT IS NOT ALLOWED");
});

//GET TOP-GOALSCORERS/XXXXX
app.get(BASE_API_URL+"/top-goalscorers/:name", (req,res)=>{
	
	var name = req.params.name;
	
	var filteredScorers = topGoalscorers.filter((c) =>{
		return (c.name == name);
	})
	
	if(filteredScorers.length >=1){
		res.send(filteredScorers[0]);
	}else{
		res.sendStatus(404, "GOALSCORER NOT FOUND");
	}
});


//PUT TOP-GOALSCORERS/XXXXX
app.put(BASE_API_URL+"/top-goalscorers/:name", (req, res) => {
	var name = req.params.name;
	var updateGoalscorer = req.body;
	
	filteredGoalscorer = topGoalscorers.filter((c) => {
        return (c.name == name);
    });
	
	if (filteredGoalscorer.length == 0) {
        res.sendStatus(404, "GOALSCORER NOT FOUND");
        return;
    }
	
	if (!updateGoalscorer.name || !updateGoalscorer.country || !updateGoalscorer.debut || !updateGoalscorer.matches ||
        !updateGoalscorer.goals || !updateGoalscorer.teams) {
        res.sendStatus(400, "NOT VALID FIELDS");
        return;
    }
	
	topGoalscorers = topGoalscorers.map((c) => {
        if (c.name == updateGoalscorer.name) {
            return updateGoalscorer;
        } else {
            return c;
        }

    });
    res.sendStatus(200, "GOALSCORER UPDATED");
	
});
	
//DELETE TOP-GOALSCORERS/XXXXX
app.delete(BASE_API_URL+"/top-goalscorers/:name", (req,res)=>{
	
	var name = req.params.name;
	
	var filteredScorers = topGoalscorers.filter((c) =>{
		return (c.name != name);
	})
	
	if(filteredScorers.length < topGoalscorers.length){
		topGoalscorers = filteredScorers;
		res.sendStatus(200, "GOALSCORER DELETED");
	}else{
		res.sendStatus(404, "GOALSCORER NOT FOUND");
	}
});


//------------END-TOP-GOALSCORERS----------

app.listen(port, ()=> {
	console.log("Server ready");
});

console.log("Starting server...");