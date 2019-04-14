const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require('cors');
const path =require("path");
const port = process.env.PORT || 3003;

const db = require('./queries');
// Setup HTTP Server
const app = express();
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
  bodyParser.urlencoded({extended: true})
);
// app.use(express.static(__dirname + '/dist/rad-demo-tool'));
// app.use('/*', function(req,res) {
//   res.sendFile(path.join(__dirname+'/dist/rad-demo-tool/index.html'));
// });
//router call -START
app.get('/api', (req, res, next) => {
  res.status(200).send({"data " : "hello world !!!"});
});

app.get('/leads', db.getLeads);
app.get('/leads/:id', db.getLeadById);
app.post('/leads', db.createLead);
app.put('/leads/:id', db.updateLead);
app.delete('/leads/:id', db.deleteLead);

//router call -END
app.listen(port, function (req, res) {
  console.log('RAD Demo tool node server running on port ' + port);
});
