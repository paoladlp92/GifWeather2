var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var mongojs = require("mongojs");

var PORT = 3000;

//which app is this anyways?

// Requiring the `User` model for accessing the `users` collection
var Entry = require("./userModel.js");

// Initialize Express
var app = express();
var databaseUrl = "userdb";
var collections = ["entries"];
var db = mongojs(databaseUrl, collections);

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/userdb", { useNewUrlParser: true });
var jsonParser = bodyParser.json();
app.use(jsonParser);
// Routes
app.get("/", function(req, res) {
  // Create a new user using req.body
  console.log(dbUser);
});

// Route to post our form submission to mongoDB via mongoose

app.post("/submit", function(req, res) {
  // Create a new user using req.body
  console.log(req.body)
  Entry.create(req.body)
  //se puede llamar como sea, lo q se llamo en base de datos
    .then(function(dbEntry) {
      //displayt
      //res.json(dbEntry)
      console.log("all good" + dbEntry);
      location.reload();
    })
    .catch(function(err) {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

app.get("/submit2", function (req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.entries.find({}, function (err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found.map(entries => {
        return { id: entries._id, entry: entries.entry };
      }));
      //location.reload();
    }
  });
});

app.get("/entries", function(req, res) {
  Entry.find({}, function(err, entries) {
    if(err) throw err;
    console.log("getting entries");
    res.json(entries);
  });
})

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});