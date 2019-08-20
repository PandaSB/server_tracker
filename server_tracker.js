var sqlite3 = require('sqlite3').verbose();
var express = require("express");
var app = express();
var port = 3000;

let db = new sqlite3.Database('./db/data.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
   const sql = `
      CREATE TABLE IF NOT EXISTS positions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        IMEI TEXT,
        time TEXT,
	type TEXT,
        latitude TEXT,
        longitude TEXT,
	radius TEXT)
	`
  db.run(sql);
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  console.log('Connected to the database.');
});

app.get("/", (req, res) => {
  res.send("Hello World");
  let db = new sqlite3.Database('./db/data.db');
  db.each("SELECT * FROM positions", function(err, row) {
    if (err) {
        console.log(err);
    } else {
        console.log(row);
    }
  });
  db.close ();
});



app.get("/submit",(req, res) => {
	var IMEI = req.param('IMEI');
	var type = req.param('type');
	var latitude = req.param('latitude');
	var longitude = req.param('longitude');
	var radius = req.param('radius');
	let db = new sqlite3.Database('./db/data.db');
	var sql = "INSERT INTO positions (IMEI, type,latitude,longitude,radius) VALUES ('1', 'GSM' , '10','11','13')";
	db.run(sql, function (err, result) {
	    if (err) throw err;
	    console.log("1 record inserted");
	});
	db.close();
	res.send("New record");
});


app.listen(port, () => {
  console.log("Server listening on port " + port);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
