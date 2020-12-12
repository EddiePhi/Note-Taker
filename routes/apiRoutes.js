// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const db = require('../db/db.json');
const fs = require('fs');
const shortId = require('shortid'); // Assitance from Tutor Mazin Abed

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/notes", function(req, res) {
    fs.readFile('db/db.json', function(err, data){
      if(err) throw err;
      let notes = JSON.parse(data);
      return res.json(notes);
    });
  });
  
  app.post("/api/notes", function (req, res) {
    //Should receive a new note to save on the request body, 
    fs.readFile('db/db.json', function(err, data){
      if(err) throw err;
      let notes = JSON.parse(data);
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: shortId.generate()
      };
    
      console.log(db)
      //add it to the `db.json` file, 
      notes.push(newNote);
      //and then return the new note to the client.
      fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), (err) => {
        if(err) throw err;
        res.send('200');
      })
    });
  });

  // Express Route Params: https://www.youtube.com/watch?v=MuMs1pLuT7I
  app.delete("/api/notes/:id", function (req, res) {
    //In order to delete a note, you'll need to read all notes from the `db.json` file, 
    fs.readFile('db/db.json', function(err, data){
      const deleteNotes = req.params.id;
      if(err) throw err;
      let notes = JSON.parse(data);
      //This means you'll need to find a way to give each note a unique `id` when it's saved.
      //remove the note with the given `id` property, 
      for (let i = 0; i < notes.length; i++) {
        if(notes[i].id === deleteNotes){
          notes.splice(i, 1);
        };
      };
      //and then rewrite the notes to the `db.json` file.
      fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), (err) => {
        if(err) throw err;
        res.send('200');
      });
    });
  });
};