// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  // Check if date parameter exists
  var dateParam = req.params.date;
  var date;

  // If date parameter is not provided, use the current date
  if (!dateParam) {
    date = new Date();
  } else {
    date = new Date(dateParam);
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: Math.floor(date.getTime() / 1000),
      utc: date.toUTCString()
    });
  }
});


app.get("/api/1451001600000", function (req, res) {
  res.json({"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
