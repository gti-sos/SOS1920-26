const express = require("express");
const bodyParser = require("body-parser");
const dataStore = require("nedb");
const path = require("path");

const app = express();
app.use(bodyParser.json());

const BASE_API_URL = "/api/v1";
const port = process.env.PORT || 1500;

//----------------------------------coef
const coefAPI = require(path.join(__dirname, "./src/back/coefAPI"));
const dbCoef = path.join(__dirname,"./src/back/coefAPI/coef.db");
coefAPI(app);
//----------------------------------fin-coef

//----------------------------------transfers
const transfersAPI = require(path.join(__dirname, "./src/back/transfersAPI"));
const dbTransfers = path.join(__dirname,"./src/back/transfersAPI/transfers.db");
transfersAPI(app);
//----------------------------------transfers//

//----------------------------------goalscorers
const goalscorersAPI = require(path.join(__dirname, "./src/back/goalscorersAPI"));
const dbGoalscorers = path.join(__dirname,"./src/back/goalscorersAPI/goalscorers.db");
goalscorersAPI(app);
//----------------------------------goalscorers//

app.use("/", express.static("./public"));


app.listen(port, () => {
	console.log("Server ready on:" + port);
});

console.log("Starting server...");
