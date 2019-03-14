// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

var app = express();
var PORT = 3000;

// Database configuration
// Save the URL of our database as well as the name of our collection]
var app = express();
var databaseUrl = "mexicanCities";
var collections = ["Cities"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);

// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mexicanCities", { useNewUrlParser: true });
var jsonParser = bodyParser.json();
app.use(jsonParser);
// Routes
app.get("/", function(req, res) {
  // Create a new user using req.body
  console.log(cityUser);
});


// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function (error) {
  console.log("Database Error:", error);
});

// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/submit2", function (req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.Cities.find({}, function (err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found.map(Cities => {
        return { name: Cities.name };
      }));
      //location.reload();
    }
  });
});




// 2. At the "/all" path, display every entry in the animals collection
app.get("/all", function (req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.Cities.find({}, function (err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found.map(city => {
        return { id: city._id, name: city.name };

      }));

    }
  });
});
// 3. At the "/name" path, display every entry in the animals collection, sorted by name
app.get("/name", function (req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by name (1 means ascending order)
  db.Cities.find().sort({ name: 1 }, function (err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// 4. At the "/weight" path, display every entry in the animals collection, sorted by weight
app.get("/order", function (req, res) {
  // Query: In our database, go to the animals collection, then "find" everything,
  // but this time, sort it by weight (-1 means descending order)
  db.Cities.find().sort({ weight: -1 }, function (err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// Set the app to listen on port 3000
app.listen(PORT, function () {
  console.log("App running on port 3000!");
});

 //robo t3
