//Referenceing code from Week 11 activity: Hot Restuarant [SOLVED]

// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

const express = require("express");
const path = require("path");
const fs = require('fs');
const db = require('./db/db.json');


// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// require("./routes/htmlRoutes")(app); // IGNORING FOR NOW
// HTML routes

app.get("/notes", function(req, res) {
  
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// If no matching route is found default to home
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


// require("./routes/apiRoutes")(app); // IGNORING FOR NOW
// API routes

app.get("/api/notes", function(req, res) {
  res.json(db);
});

app.post("/api/notes", function (req, res) {
  //Should receive a new note to save on the request body, 
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: `${db.length}`
  };

  console.log(db)
  //add it to the `db.json` file, 
  db.push(newNote);
  //and then return the new note to the client.
  res.send(db);
});

// Referencing app.delete and fs.writeFile from LanChi Pham: https://github.com/lpham2525/notetaker/blob/master/server.js
// Express Route Params: https://www.youtube.com/watch?v=MuMs1pLuT7I
app.delete("/api/notes/:id", function (req, res) {

//This means you'll need to find a way to give each note a unique `id` when it's saved.
for (let i = req.params.id; i < db.length; i++) {
  db[i].id = `${i}`;
}
 //In order to delete a note, you'll need to read all notes from the `db.json` file, 
 res.send(db);
 //remove the note with the given `id` property, 
 db.splice(req.params.id, 1);
 //and then rewrite the notes to the `db.json` file.
 fs.writeFile(db, res.send(db), {}, () => {
  console.log(db);
  });
  
});

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
