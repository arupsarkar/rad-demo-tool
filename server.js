const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require('cors');
const path =require("path");
const port = process.env.PORT || 3003;

const db = require('./queries');
// Setup HTTP Server
const app = express();
const router = express.Router();
// Initialize session
app.use(session(
  {
    secret: 'S3CRE7-RAD-DEMO-TOOL',
    resave: true,
    saveUninitialized: true
  }
));
app.use(cors());
// app.options('*', cors());
// bodyParser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({extended: false})
);
app.use(express.static(__dirname + '/dist/rad-demo-tool'));
app.use('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/rad-demo-tool/index.html'));
});
//router call -START

// route middleware that will happen on every request
router.use(function(req, res, next) {
  // log each request to the console
  console.log(req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});

router.get('/api', (req, res, next) => {
  res.status(200).send({"data " : "hello world !!!"});
});

router.get('/leads', db.getLeads);
router.get('/leads/:id', db.getLeadById);
router.post('/leads', db.createLead);
router.put('/leads/:id', db.updateLead);
router.delete('/leads/:id', db.deleteLead);

app.use('/', router);
//router call -END
app.listen(port, function (req, res) {
  console.log('RAD Demo tool node server running on port ' + port);
});
