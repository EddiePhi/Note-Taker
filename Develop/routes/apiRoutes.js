// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const db = require('../db/db.json');
const fs = require('fs')

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  // get/api/tables
  app.get('/api/notes', function (req, res) {
    res.json(db);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  // post/api/tables
  app.post('/api/notes', function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    db.push(req.body);
    res.json({ db });
  });

  // Referencing app.delete and fs.writeFile from LanChi Pham: https://github.com/lpham2525/notetaker/blob/master/server.js
  // Express Route Params: https://www.youtube.com/watch?v=MuMs1pLuT7I
  app.delete("/api/notes/:id", function (req, res) {

    // .splice() removes one instance of element at index "re.params.id"
    db.splice(req.params.id, 1);

    for (let i = req.params.id; i < db.length; i++) {
      db[i].id = `${i}`;
    }

    fs.writeFile('../db/db.json', JSON.stringify(db), {}, () => {
      res.send(db);
    });
  });

  

  };
      

  //   res.json({deleted: id});
  // });





  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

//   app.post('/api/clear', function (req, res) {
//     // Empty out the arrays of data
//     tableData.length = 0;
//     waitListData.length = 0;

//     res.json({ ok: true });
//   });
// };