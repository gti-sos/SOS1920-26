//------COEF--------------------------------------------------------------------------

module.exports = function (app) {
  console.log("Registering coef API....");
  const dataStore = require("nedb");
  const path = require("path");
  const dbFileName = path.join(__dirname, "./coef.db");
  const BASE_API_URL = "/api/v3";
  //const request = require('request');
	const express = require("express");

  const dbCoef = new dataStore({
    filename: dbFileName,
    autoload: true,
  });
  //------------------------------------------------------------------------

  var initialCoef = [
    {
      country: "spain",
      year: 2018,
      team: "real-madrid",
      coefficient: 146.0,
      fed: 20.713,
      classification: 1,
    },
    {
      country: "germany",
      year: 2018,
      team: "bayern",
      coefficient: 128.0,
      fed: 14.385,
      classification: 3,
    },
    {
      country: "spain",
      year: 2016,
      team: "atletico-de-madrid",
      coefficient: 122.0,
      fed: 20.999,
      classification: 4,
    },
    {
      country: "italy",
      year: 2018,
      team: "juventus",
      coefficient: 124.0,
      fed: 14.945,
      classification: 5,
    },
    {
      country: "spain",
      year: 2018,
      team: "sevilla",
      coefficient: 104.0,
      fed: 20.713,
      classification: 7,
    },
    {
      country: "france",
      year: 2017,
      team: "psg",
      coefficient: 109.0,
      fed: 11.283,
      classification: 7,
    },
  ];

  function deleteIDs(coef) {
    coef.forEach((m) => {
      delete m._id;
    });
  }


  //Configuracion para el PROXY con el grupo 10 
  var paths_10 = '/api/v3/global-marriages';          //Aqui seria donde esta ubicada nuestra API
  var apiServerHost_10 = 'http://sos1920-10.herokuapp.com';     //Aqui es a donde redirigimos 

  //Para que el PROXY redireccione
  app.use(paths_10, function (req, res) {
    var url = apiServerHost_10 + req.baseUrl + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
  });



  //Configuracion para el PROXY con el grupo 30 
  var paths_30 = '/api/v3/indice_de_masa_corporal';          //Aqui seria donde esta ubicada nuestra API
  var apiServerHost_30 = 'http://sos1920-30.herokuapp.com';     //Aqui es a donde redirigimos 

  //Para que el PROXY redireccione
  app.use(paths_30, function (req, res) {
    var url = apiServerHost_30 + req.baseUrl + req.url;
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
  });




  //------------------------------------------CORS------------------------------------------------------

  const URL_01 = "https://sos1920-01.herokuapp.com";
  app.use("/api/v2/emigrants-stats", function(req, res) {
      console.log("GET API ANTONIO");
      var url = URL_01 + req.baseUrl + req.url;
      console.log("URL_ANTONIO: "+url);
      console.log('piped: ' + req.baseUrl + req.url);
      req.pipe(request(url)).pipe(res);
  });
  app.use(express.static('.'));


  const URL_05 = "https://sos1920-05.herokuapp.com";
  app.use("/api/v1/books-exports", function(req, res) {
      console.log("GET API DIEGO");
      var url = URL_05 + req.baseUrl + req.url;
      console.log("URL_DIEGO: "+url);
      console.log('piped: ' + req.baseUrl + req.url);
      req.pipe(request(url)).pipe(res);
  });
  app.use(express.static('.'));



/*
  const URL_06 = "https://sos1920-06.herokuapp.com";
  app.use("/api/v2/accstats", function(req, res) {
      console.log("GET API JUAN");
      var url = URL_06 + req.baseUrl + req.url;
      console.log("URL_Leandro: "+url);
      console.log('piped: ' + req.baseUrl + req.url);
      req.pipe(request(url)).pipe(res);
  });
  app.use(express.static('.'));
*/

const URL_24 = "https://sos1920-24.herokuapp.com";
app.use("/api/v2/atc-stats", function(req, res) {
    console.log("GET API VICTOR");
    var url = URL_24 + req.baseUrl + req.url;
    console.log("URL_Victor: "+url);
    console.log('piped: ' + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
});
app.use(express.static('.'));



  
//-------------------------------------------------------------------------------------------------



  //LOADINITIALDATA coefBD-----------------------------------------------
  app.get(BASE_API_URL + "/global-coef/loadInitialData", (req, res) => {
    dbCoef.remove({}, { multi: true });
    console.log("New GET .../loadInitialData");
    dbCoef.insert(initialCoef);
    console.log("Initial coef loaded: " + JSON.stringify(initialCoef, null, 2));
    res.send(JSON.stringify(initialCoef, null, 2));
  });

  // POST GLOBAL-coef----------------------------------------------------

  app.post(BASE_API_URL + "/global-coef", (req, res) => {
    var newCoef = req.body;
    var team = req.body.team;
    var year = parseInt(req.body.year);

    dbCoef.find({ team: team, year: year }, (error, coef) => {
      if (coef.length != 0) {
        console.log("409. El objeto ya existe");
        res.sendStatus(409);
      } else if (
        newCoef == {} ||
        newCoef.country == null ||
        newCoef.year == null ||
        newCoef.team == null ||
        newCoef.coefficient == null ||
        newCoef.fed == null ||
        newCoef.classification == null
      ) {
        res.sendStatus(400, "BAD REQUEST");
      } else {
        dbCoef.insert(newCoef);

        res.sendStatus(201, "CREATED");
      }
    });
  });

  // DELETE global-coef-----------------------------------------------
  app.delete(BASE_API_URL + "/global-coef", (req, res) => {
    dbCoef.remove({}, { multi: true }, function (err, numRemoved) {
      if (numRemoved >= 1) {
        res.sendStatus(200, "OK");
      } else {
        res.sendStatus(404, "NOT FOUND");
      }
    });
  });

  //GET GLOBAL-coef/team/year----------------------------------------------

  app.get(BASE_API_URL + "/global-coef/:team/:year", (req, res) => {
    var team = req.params.team;
    var year = parseInt(req.params.year);

    dbCoef.find({ $and: [{ team: team }, { year: year }] }, (err, coef) => {
      console.log(coef);
      if (coef.length != 0) {
        deleteIDs(coef);
        res.send(JSON.stringify(coef[0], null, 2));
        console.log("Data sent: " + JSON.stringify(coef[0], null, 2));
      } else {
        res.sendStatus(404, "TEAM NOT FOUND");
      }
    });
  });

  // PUT global-coef/team/year--------------------------------------------------

  app.put(BASE_API_URL + "/global-coef/:team/:year", (req, res) => {
    var team = req.params.team;
    var year = parseInt(req.params.year);
    var updateCoef = req.body;

    dbCoef.update(
      { team: team, year: year },
      updateCoef,
      (error, numRemoved) => {
        // Checking if any data has been updated (numRemoved>=1)
        if (numRemoved == 0) {
          res.sendStatus(404, "NOT FOUND");
        } else {
          res.sendStatus(200, "OK");
        }
      }
    );
  });

  // DELETE global-coef/team/year------------------------------------------------

  app.delete(BASE_API_URL + "/global-coef/:team/:year", (req, res) => {
    var team = req.params.team;
    var year = parseInt(req.params.year);

    var query = { team: team, year: year };

    dbCoef.remove(query, { multi: true }, (error, numRemoved) => {
      if (numRemoved == 0) {
        res.sendStatus(404, "NOT FOUND");
      } else {
        res.sendStatus(200, "OK");
      }
    });
  });

  //POST error-----------------------------------------------------------
  app.post(BASE_API_URL + "/global-coef/:team/:year", (req, res) => {
    res.sendStatus(405);
  });

  //PUT error--------------------------------------------------------------
  app.put(BASE_API_URL + "/global-coef", (req, res) => {
    res.sendStatus(405);
  });

  //Búsqueda por todos los campos del recurso------------------------------

  app.get(BASE_API_URL + "/global-coef", (req, res) => {
    console.log("GET GLOBAL COEF");

    //if(req.query.country) request["country"] = req.query.country;
    if (req.query.year) req.query.year = parseInt(req.query.year);
    //if(req.query.team) request["team"] = req.query.team;
    if (req.query.coefficient)
      req.query.coefficient = parseFloat(req.query.coefficient);
    if (req.query.fed) req.query.fed = parseFloat(req.query.fed);
    if (req.query.classification)
      req.query.classification = parseInt(req.query.classification);

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
    dbCoef
      .find(parametros)
      .skip(offset)
      .limit(limit)
      .exec((err, coef) => {
        coef.forEach((c) => {
          delete c._id;
        });

        //.sort({team:1,year:-1})
        //console.log("New GET_0.2  coef");

        res.send(JSON.stringify(coef, null, 2));
        console.log("RESOURCES DISPLAYED");
        //console.log("Data sent: "+JSON.stringify(coef,null,2));
      });
  });
};
