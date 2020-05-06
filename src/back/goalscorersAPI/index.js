//-----------------GOALSCORERS-------------
module.exports = function(app) {
    console.log("Registering goalscorers API...");
    const dataStore = require("nedb");
    const path = require("path");
    const dbFileName = path.join(__dirname, "./goalscorers.db");
    const BASE_API_URL = "/api/v1";


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
        }
    ];

    function deleteIDs(goalscorers) {
        goalscorers.forEach((m) => {
            delete m._id;
        });
    }


    //LOADINITIALDATA GOALSCORERS
    app.get(BASE_API_URL + "/goalscorers/loadInitialData", (req, res) => {
        console.log("New GET .../goalscorers/loadInitialData")

        db.insert(initialGoalscorers);
        res.sendStatus(200);

        console.log("Initial goalscorers loaded: " + JSON.stringify(initialGoalscorers, null, 2));
    });

    //POST GOALSCORERS 
    app.post(BASE_API_URL + "/goalscorers", (req, res) => {
        var newGoalscorer = req.body;

        if ((newGoalscorer == {}) ||
            (newGoalscorer.name == null) ||
            (newGoalscorer.country == null) ||
            (newGoalscorer.debut == null) ||
            (newGoalscorer.goals == null) ||
            (newGoalscorer.matches == null) ||
            (newGoalscorer.teams == null)) {
            res.sendStatus(400, "BAD REQUEST");
        } else {
            db.insert(newGoalscorer);

            res.sendStatus(201, "CREATED");
        }
    });

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