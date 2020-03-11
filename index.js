const express = require("express");

var app = express();
var relojs = require("relojs");  

var port = process.env.PORT || 80;

app.use("/", express.static("./public"));
app.get("/time", (request, response) => {
	response.send("<html>"+relojs.myTimer()+"</html>");
});

app.listen(port, ()=> {
	console.log("Server ready");
});

console.log("Starting server...");  

/*
const cool = require("cool-ascii-faces");
const express=require("express");
var app= express();
var port = process.env.PORT || 80;

app.use("/", express.static("./public"));
app.get("/cool", (request, response)=>{
	responde.send("<html>"+cool()+"</html>");
});
app.listen(port, ()=> {
	console.log("Server ready");
});

console.log("Starting server...");  */