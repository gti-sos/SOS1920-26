const express = require("express");
const bodyParser = require("body-parser");
const dataStore = require("nedb");
const path = require("path");
const cors =require("cors");
const app = express();
const port = process.env.PORT || 1500;

app.use(bodyParser.json());
app.use(cors())

//----------------------------------coef
const coefAPIv1 = require(path.join(__dirname, "./src/back/coefAPI/v1"));
const coefAPIv2 = require(path.join(__dirname, "./src/back/coefAPI/v2"));
const coefAPIv3 = require(path.join(__dirname, "./src/back/coefAPI/v3"));
coefAPIv1(app);
coefAPIv2(app);
coefAPIv3(app);
//----------------------------------fin-coef

//----------------------------------transfers
const transfersAPIv1 = require(path.join(__dirname, "./src/back/transfersAPI/v1"));
const transfersAPIv2 = require(path.join(__dirname, "./src/back/transfersAPI/v2"));
const transfersAPIv3 = require(path.join(__dirname, "./src/back/transfersAPI/v3"));
transfersAPIv1(app);
transfersAPIv2(app);
transfersAPIv3(app);
//----------------------------------transfers//

//----------------------------------goalscorers
const goalscorersAPIv1 = require(path.join(__dirname, "./src/back/goalscorersAPI/v1"));
const goalscorersAPIv2 = require(path.join(__dirname, "./src/back/goalscorersAPI/v2"));
const goalscorersAPIv3 = require(path.join(__dirname, "./src/back/goalscorersAPI/v3"));
goalscorersAPIv1(app);
goalscorersAPIv2(app);
goalscorersAPIv3(app);
//----------------------------------goalscorers/

app.use("/", express.static("./public"));


app.listen(port, () => {
	console.log("Server ready on:" + port);
});

console.log("Starting server...");
