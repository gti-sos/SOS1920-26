module.exports = function(app, path, BASE_API_URL, dataStore) {
    console.log("Registering goalscorers API...");
    const dbFileName = path.join(__dirname, "goalscorers.db");
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


        if ((newGoalscorer == "") || newGoalscorer.name == null) {
            res.sendStatus(400, "BAD REQUEST");
        } else {
            topGoalscorers.push(newGoalscorer);
            res.sendStatus(201, "CREATED");
        }

    });

    //GET GOALSCORERS
    /*
    app.get(BASE_API_URL+"/goalscorers", (req,res) =>{
    	res.send(JSON.stringify(topGoalscorers,null,2));
    });
    */

    app.get(BASE_API_URL + "/goalscorers", (req, res) => {
        console.log("New GET .../goalscorers");

        db.find({}, (err, goalscorers) => {
            res.send(JSON.stringify(goalscorers, null, 2));
            console.log("Data sent: " + JSON.stringify(goalscorers, null, 2));
        })
    });

    //PUT GOALSCORERS
    app.put(BASE_API_URL + "/goalscorers", (req, res) => {
        res.sendStatus(405, "IT IS NOT ALLOWED");
    });


    //DELETE GOALSCORERS

    app.delete(BASE_API_URL + "/goalscorers", (req, res) => {
        var name = req.params.name;
        if (topGoalscorers.length > 0 && name == null) {
            topGoalscorers = [];
            res.sendStatus(200, "TOPGOALSCORERS DELETED");
        } else {
            res.sendStatus(404, "THERE IS NO TOPSCORER TO CLEAR");
        }
    });

    //POST GOALSCORERS/XXXXX
    app.post(BASE_API_URL + "/goalscorers/:name", (req, res) => {
        res.sendStatus(405, "IT IS NOT ALLOWED");
    });

    //GET GOALSCORERS/XXXXX
    app.get(BASE_API_URL + "/goalscorers/:name", (req, res) => {

        var name = req.params.name;

        var filteredScorers = topGoalscorers.filter((c) => {
            return (c.name == name);
        })

        if (filteredScorers.length >= 1) {
            res.send(filteredScorers[0]);
        } else {
            res.sendStatus(404, "GOALSCORER NOT FOUND");
        }
    });


    //PUT GOALSCORERS/XXXXX
    app.put(BASE_API_URL + "/goalscorers/:name", (req, res) => {
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

    //DELETE GOALSCORERS/XXXXX
    app.delete(BASE_API_URL + "/goalscorers/:name", (req, res) => {

        var name = req.params.name;

        var filteredScorers = topGoalscorers.filter((c) => {
            return (c.name != name);
        })

        if (filteredScorers.length < topGoalscorers.length) {
            topGoalscorers = filteredScorers;
            res.sendStatus(200, "GOALSCORER DELETED");
        } else {
            res.sendStatus(404, "GOALSCORER NOT FOUND");
        }
    });


    //------------END GOALSCORERS----------
}