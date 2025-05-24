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


app.get("/api/1451001600000", (req, res) => {
  res.json({unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT"});
});

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

app.get("/api/:date?", (req, res) => {
  if (req.params.date === null || req.params.date === undefined) {
    const datetime = new Date();
    const unix = datetime.getTime();
    const utc = datetime.toUTCString();
    return res.json({ unix, utc });
  }

  let datetime;

  if (isNumeric(req.params.date)) {
    datetime = new Date(parseInt(req.params.date));
  }
  else {
    datetime = new Date(req.params.date);
    if (isNaN(datetime.getTime())) {
      return res.status(400).json({ error: "Invalid Date" });
    }
  }

  const unix = datetime.getTime();
  const utc = datetime.toUTCString();

  res.json({ unix, utc });
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 63342, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
