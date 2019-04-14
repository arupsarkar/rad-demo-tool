const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require('cors');
const path =require("path");
const app = express();
// Setup HTTP Server
const server = require('http').Server(app);
const port = process.env.PORT || 3003;



// const router = express.Router();
// Initialize session
app.use(session(
  {
    secret: 'S3CRE7-RAD-DEMO-TOOL',
    resave: true,
    saveUninitialized: true
  }
));
app.use(cors());
// Get our API routes
const api = require('./api');
// Set our api routes
app.use('/api', api);
// bodyParser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({extended: false})
);
app.use(express.static(__dirname + '/dist/rad-demo-tool'));
app.use('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/rad-demo-tool/index.html'));
});

server.listen(port, () => console.log(`API server running on localhost:${port}`));
