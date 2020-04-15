const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

const BASE_API_URL = "/api/v1";
const port = process.env.PORT || 80;

//----------------------------------coef
const coefAPI = require(path.join(__dirname, "coefAPI"));
const dbCoef = path.join(__dirname,"coefAPI/coef.db");
coefAPI(app);
//----------------------------------fin-coef

//----------------------------------transfers
const transfersAPI = require(path.join(__dirname, "transfersAPI"));
const dbTransfers = path.join(__dirname,"transfersAPI/transfers.db");
transfersAPI(app);
//----------------------------------transfers//

<<<<<<< HEAD
//-----------------------------------goalscorersAPI
const goalscorersAPI = require(path.join(__dirname, "goalscorersAPI"));
goalscorersAPI(app);
//----------------------------------end-goalscorers

app.use("/", express.static("./public"));

=======
//const dbFileName = path.join(__dirname, "goalscorers.db");

/*const db = new dataStore({
				filename: dbFileName,
				autoload: true
	});
*/


app.use("/", express.static("./public"));

goalscorersAPI(app, path, BASE_API_URL, dataStore);





>>>>>>> 14d226b4c39d0e6237706e93a0676418bedf6f57
app.listen(port, () => {
	console.log("Server ready");
});

console.log("Starting server...");
