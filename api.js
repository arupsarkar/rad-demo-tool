const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());
router.use(logErrors);
router.use(clientErrorHandler);
router.use(errorHandler);

// Error handlers
function logErrors (err, req, res, next) {
  console.error(err.stack);
  next(err)
}
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err)
  }
}

function errorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', { error: err })
}

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

const db = require('./queries');

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

//router calls for contacts - START
router.get('/contacts', db.getContacts);
// router.get('/contacts/:id', db.getContactById);
router.post('/contacts', db.createContact);
router.put('/contacts/:id', db.updateContact);
router.delete('/contacts/:id', db.deleteContact);
//router calls for contacts - END

//router calls for leads - START
router.get('/leads', db.getLeads);
router.get('/leads/:id', db.getLeadById);
router.post('/leads', db.createLead);
router.put('/leads/:id', db.updateLead);
router.delete('/leads/:id', db.deleteLead);
//router calls for leads - END
module.exports = router;

