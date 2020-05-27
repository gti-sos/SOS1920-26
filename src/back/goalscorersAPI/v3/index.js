//-----------------GOALSCORERS-------------
module.exports = function(app) {
    console.log("Registering goalscorers API...");
    const dataStore = require("nedb");
    const path = require("path");
    const dbFileName = path.join(__dirname, "./goalscorers.db");
    const BASE_API_URL = "/api/v3";


    const db = new dataStore({
        filename: dbFileName,
        autoload: true
    });

    //-------------GOALSCORERS-------------
    var initialGoalscorers = [{
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
        },
        {
            name: "Raul",
            country: "Spain",
            debut: 1995,
            goals: 71,
            matches: 144,
            teams: 2
        },
        {
            name: "Lewandowski",
            country: "Poland",
            debut: 2011,
            goals: 64,
            matches: 86,
            teams: 2
        },
        {
            name: "vanNistelrooy",
            country: "Holland",
            debut: 1998,
            goals: 60,
            matches: 81,
            teams: 3
        },
        {
            name: "Shevchenko",
            country: "Ukraine",
            debut: 1993,
            goals: 59,
            matches: 116,
            teams: 3
        },
        {
            name: "Henry",
            country: "France",
            debut: 1993,
            goals: 51,
            matches: 115,
            teams: 3
        }
    ];

    function deleteIDs(goalscorers) {
        goalscorers.forEach((m) => {
            delete m._id;
        });
    }


    //LOADINITIALDATA GOALSCORERS
    app.get(BASE_API_URL + "/goalscorers/loadInitialData", (req, res) => {
        db.remove({},{multi:true});
        console.log("New GET .../loadInitialData")
        db.insert(initialGoalscorers);;
        console.log("Initial goalscorers loaded: " + JSON.stringify(initialGoalscorers, null, 2));
		res.send(JSON.stringify(initialGoalscorers,null,2));
    });

    //POST GOALSCORERS 
    app.post(BASE_API_URL + "/goalscorers", (req, res) => {
        var newGoalscorer = req.body;
        var newName = req.body.name;

        db.find({"name":newName},(error, goalscorer) =>{
            if(goalscorer.length!=0){
                console.log("Error 409. Ya existe un goleador con ese nombre");
                res.sendStatus(409);
            }else if((newGoalscorer == {}) ||
                (newGoalscorer.name == null) ||
                (newGoalscorer.country == null) ||
                (newGoalscorer.debut == null) ||
                (newGoalscorer.goals == null) ||
                (newGoalscorer.matches == null) ||
                (newGoalscorer.teams == null)){
                res.sendStatus(400);
            }else{
                console.log("Dato introducido correctamente");
                db.insert(newGoalscorer);
                res.sendStatus(201);
            }
        });
    });

    /*
    BÚSQUEDA POR RANGO DE GOLES, PREGUNTAR PARA EL SIGUIENTE ENTREGABLE
    //GET GOALSCORERS/GOALS
    app.get(BASE_API_URL + "/goalscorers?from=goalsMin&to=goalsMax", (req, res) => {

        var goalsMin = parseInt(req.params.goalsMin);
        var goalsMax = parseInt(req.params.goalsMax);
        console.log(goalsMin);
        db.find({
            $and: [{"goals": {$gte:goalsMin}},{"goals": {$lte:goalsMax}}]
        }, (err, goalscorers) => {
            console.log(goalscorers);
            if (goalscorers.length != 0) {
                deleteIDs(goalscorers);
                res.send(JSON.stringify(goalscorers, null, 2));
                console.log("Data sent: " + JSON.stringify(goalscorers[0], null, 2));
            } else {
                res.sendStatus(404);
            }
        })
    });
*/

    //GET GOALSCORERS
    app.get(BASE_API_URL + "/goalscorers", (req, res) => {
        console.log("NEW GET .../goalscorers");

        if (req.query.debut) req.query.debut = parseInt(req.query.debut);
        if (req.query.goals) req.query.goals = parseInt(req.query.goals);
        if (req.query.matches) req.query.matches = parseInt(req.query.matches);
        if (req.query.teams) req.query.teams = parseFloat(req.query.teams);

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
		
        db.find(parametros).skip(offset).limit(limit).exec((err, goalscorers) => {

            deleteIDs(goalscorers);
			
            res.send(JSON.stringify(goalscorers, null, 2));
            console.log("RESOURCES DISPLAYED");

        });
    });

    //PUT GOALSCORERS
    app.put(BASE_API_URL + "/goalscorers", (req, res) => {
        res.sendStatus(405);
    });


    //DELETE GOALSCORERS

    app.delete(BASE_API_URL + "/goalscorers", (req, res) => {
        db.remove({}, {
            multi: true
        }, function(err, numRemoved) {
            if (numRemoved >= 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }

        });
    });

    //POST GOALSCORERS/XXXXX
    app.post(BASE_API_URL + "/goalscorers/:name", (req, res) => {
        res.sendStatus(405);
    });

    //GET GOALSCORERS/XXXXX
    app.get(BASE_API_URL + "/goalscorers/:name", (req, res) => {

        var name = req.params.name;

        db.find({
            "name": name
        }, (err, goalscorers) => {
            console.log(goalscorers);
            if (goalscorers.length != 0) {
                deleteIDs(goalscorers);
                res.send(JSON.stringify(goalscorers[0], null, 2));
                console.log("Data sent: " + JSON.stringify(goalscorers[0], null, 2));
            } else {
                res.sendStatus(404);
            }
        })
    });



    //PUT GOALSCORERS/XXXXX
    app.put(BASE_API_URL + "/goalscorers/:name", (req, res) => {
        var name = req.params.name;
        var updateGoalscorer = req.body;
        db.update({
            name: name
        }, updateGoalscorer, (error, numRemoved) => {
            if (numRemoved == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        });
    });

    //DELETE GOALSCORERS/XXXXX
    app.delete(BASE_API_URL + "/goalscorers/:name", (req, res) => {

        var name = req.params.name;

        var query = {
            name: name
        };

        db.remove(query, {
            multi: true
        }, (error, numRemoved) => {
            if (numRemoved == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        });
    });


    //------------END GOALSCORERS----------
}